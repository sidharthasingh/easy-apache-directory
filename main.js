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
}

function formSubmit(){
	link = $("#hyperlink")[0].value;
	if(link.indexOf("http") == -1)
		link = "http://"+link;
	console.log(link);
	window.location = window.location.origin+"/?"+link;
	return false;
}