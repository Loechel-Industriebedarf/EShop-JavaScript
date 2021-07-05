/************************************************************************************************************************************************
Lieferzeiten Anzeige
************************************************************************************************************************************************/

try{
	//Lieferzeiten nur bei Artikeln anzeigen (haben .html in der URL)
	if(window.location.href.indexOf("html") >= 0){
		var lieferzeiten = document.getElementsByClassName("legal"); //HTML der Lieferzeiten Klasse auslesen
		var lieferhtml = lieferzeiten[1]['outerHTML']; //HTML "reduzieren"; Unnötige Informationen des Objekts entfernen
		var lieferindex = lieferhtml.indexOf("Die Lieferung erfolgt innerhalb"); //Nach "Die Lieferung erfolgt innerhalb" suchen, um alles vor diesem String abzuschneiden
		var lieferzeitentext_temp = lieferhtml.substring(lieferindex, lieferindex+100); //Alles vor "Die Lieferung erfolgt innerhalb" abschneiden
		var lieferindex = lieferzeitentext_temp.indexOf("<br>"); //Nach dem <br> suchen, um alles danach abzuschneiden
		var lieferzeitentext = lieferzeitentext_temp.substring(0, lieferindex); //Vom neuen String alles nach dem <br> abschneiden, dass nur noch der String übrig bleibt, den wir benötigen
		if (document.querySelector('.is-in-stock') !== null && $( ".is-in-stock" ).first().text().indexOf("Sulingen") >= 0){
		   lieferzeitentext = lieferzeitentext.replace(/[0-9]+/g, "3"); //Wenn die Ware auf Lager ist, wird die Lieferzeit auf 3 Tage gesetzt
		} 
		else if(document.querySelector('.is-in-stock') !== null){
			lieferzeitentext = lieferzeitentext.replace(/[0-9]+/g, "5"); //Wenn die Ware bei NW auf Lager ist, wird die Lieferzeit auf 5 Tage gesetzt
		}
		if(window.location.pathname !== "/"){
			$( ".nw_delivery-status" ).append( "<p>"+lieferzeitentext+"</p>" ); //Die Lieferzeiten an die Klasse anhängen
		}
	}	
}
catch(e){
}
