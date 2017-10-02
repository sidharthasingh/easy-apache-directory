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
			for(i=0;i<rows.length;i++)
			{
				obj = {};
				temp = $.parseHTML(rows[0][0].innerHTML);
				obj.src = temp[0].src;
				obj.href = $.parseHTML(temp[1].innerHTML)[0].href;
				obj.src = obj.src.replace(window.location.origin,"");
				obj.href = obj.href.replace(window.location.origin,"");
				dat.push(obj);
			}
			console.log(dat);
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