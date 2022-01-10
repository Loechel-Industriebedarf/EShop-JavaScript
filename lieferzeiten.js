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
		var lieferzeitentext_full = lieferzeitentext;
		//Nachricht anzeigen, wenn Produkt nicht verfügbar
		if (document.querySelector('.is-not-available') !== null && document.querySelector('.is-in-stock') == null){
			lieferzeitentext = "Derzeit nicht verfügbar. Bestellware! " + lieferzeitentext;
		}
		//Lieferzeit vermindern, wenn in Sulingen auf Lager
		if (document.querySelector('.is-not-available') !== null && $( ".is-in-stock" ).text().indexOf("Sulingen") >= 0){
		   lieferzeitentext = lieferzeitentext.replace(/[0-9]+/g, "2"); //Wenn die Ware auf Lager ist, wird die Lieferzeit auf 3 Tage gesetzt
		} 
		//Lieferzeit vermindern, wenn in Gießen auf Lager
		if (document.querySelector('.is-not-available') !== null && $( ".is-in-stock" ).text().indexOf("Gießen") >= 0){
		   lieferzeitentext = lieferzeitentext.replace(/[0-9]+/g, "3"); //Wenn die Ware auf Lager ist, wird die Lieferzeit auf 3 Tage gesetzt
		} 
		//Lieferzeit anzeigen
		if(window.location.pathname !== "/"){
			$( ".is-in-stock" ).append( "<p>"+lieferzeitentext+"</p>" ); //Die Lieferzeiten an die Klasse anhängen
			$( ".is-not-available").append( "<p>"+lieferzeitentext_full+"</p>" ); //Die Lieferzeiten an die Klasse anhängen
		}
	}	
}
catch(e){
}
