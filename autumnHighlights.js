try{
	//Execute only, when page is fully loaded
	window.addEventListener('load', function () {
		alert("loaded!");
		var articleNumber = 4;
		var loadingIcon = 'loading.svg';
		var replaceMeUrl = '#replaceme';
		//List of articles, that should be inserted
		var articles = [ '3000265385', '4000347507', '4000351238', '4000351990' ];	
		
		//Replace all loading icons with real pictures
		for(var i = 0; i < articleNumber; i++){
			//Replace image
			$('img[src="' + loadingIcon + '"]').first().attr('src', "social-media/A_" + articles[i] + ".jpg");
			//Replace link
			$('a[href="' + replaceMeUrl + '"]').first().attr('href', "findologicsearch/execute?query=" + articles[i]);	
		}
	});
}
catch(e){
	console.log(e);
}