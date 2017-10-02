function loadForm()
{
	$.get("form.html")
		.done((data) => {
				$("#view").html(data);
			});
}

function home(){
	window.location = "/";
}

// Go to home by clicking on header
$(".header").click(home);

// GET parameters
paraString = window.location.search; 

if(paraString=="")
	loadForm();
else
{
	if(paraString[0]=="?")
		paraString=paraString.substr(1);

	j=-1;
	for(i=paraString.indexOf("://")+3;i<paraString.length;i++)
		if(paraString[i] == "/")
		{
			j=i;
			break;
		}
	if(j!=-1)
		url = paraString.substr(0,j);
	else
		url = paraString;

	$.get(paraString)
		.done((data) => {
			bi = data.indexOf("<body>");
			bci = data.indexOf("</body>");
			data = data.substr(bi+6,bci-bi-7);
			bi = data.indexOf("<address>");
			x = data = data.substr(0,bi);
			$("#invisible-table").html(data);
			x = $("#invisible-table table tr");
			rows = [];
			for(i=2;i<x.length;i++)
			{
				rows.push($.parseHTML(x[i].innerHTML.replace("<td>","<div>")
													.replace("<th>","<div>")
													.replace("</td>","</div>")
													.replace("</th>","</span>")));
			}
			// Now we have got an array of rows where row[i] has 4 'td' (columns)
			dat = [];
			for(i=0;i<rows.length-1;i++)
			{
				obj = {};
				temp = $.parseHTML(rows[i][0].innerHTML);
				obj.src = temp[0].src;
				tempParse = $.parseHTML(temp[1].innerHTML)[0]; 
				obj.href = tempParse.href;
				obj.text = tempParse.innerText.replace("/","");
				src = obj.src = obj.src.replace(window.location.origin,"");
				href = obj.href = obj.href.replace(window.location.origin,"");
				if(paraString[paraString.length-1] == "/")
					paraString = paraString.substr(0,paraString.length-1);
				if(src.indexOf("back.gif")!=-1)
				{
					href =  "javascript:window.history.back()";
				}
				else if(src.indexOf("folder.gif")==-1)
				{
					href = paraString+href;
				}
				else
				{
					href = window.location.origin+"/?"+paraString+href;
				}
				obj.src = url+src;
				obj.href = href;
				dat.push(obj);

			}
			console.log(dat);
			table ="";
			for(i=0;i<dat.length;i++)
			{
				temp = i%2;
				obj = dat[i];
				table+="<div class='file-folder"+temp+"' onclick='openFolder(this)'><img src='"+obj.src+"'><a class='list' href='"+obj.href+"'>"+obj.text+"</a></div>\n";
			}
			$("#view").html(table);
		});
}

function formSubmit(){
	link = $("#hyperlink")[0].value;
	if(link.indexOf("http") == -1)
		link = "http://"+link;
	console.log(link);
	window.location = window.location.origin+"/?"+link;
	return false;
}

x="";
function openFolder(abc)
{
	window.location = $.parseHTML(abc.innerHTML)[1].href;
}