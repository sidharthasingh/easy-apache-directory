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

$(".header").click(home);
paraString = window.location.search; 

if(paraString=="")
	loadForm();

function formSubmit(){
	link = $("#hyperlink")[0].value;
	if(link.indexOf("http") == -1)
		link = "http://"+link;
	console.log(link);
	$.ajax({
    url: link,

    dataType: "jsonp",
    success: function( response ) {
        console.log( response ); // server response
    }

	});
	return false;
}