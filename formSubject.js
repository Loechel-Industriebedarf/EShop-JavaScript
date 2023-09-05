/************************************************************************************************************************************************
Betreff in Formular lesen
************************************************************************************************************************************************/
try{
	if(window.location.href.includes("nordwestcallback")){ 
		var queryString = window.location.search;
		var urlParams = new URLSearchParams(queryString);
		var subject = urlParams.get('subject')
		console.log(subject);


		var elem = document.getElementById('subject');
		$("#subject").addClass("has-value");
		elem["firstChild"].value = subject;
	} 
}
catch(e){
	
}