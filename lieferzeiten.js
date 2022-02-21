/************************************************************************************************************************************************
Lieferzeiten Anzeige
************************************************************************************************************************************************/

try{
	//Lieferzeiten nur bei Artikeln anzeigen (haben product/view in der URL)
	if(window.location.href.indexOf("product/view") >= 0){
		var lieferzeiten = document.getElementsByClassName("legal"); //HTML der Lieferzeiten Klasse auslesen
		var lieferhtml = lieferzeiten[1]['outerHTML']; //HTML "reduzieren"; Unnötige Informationen des Objekts entfernen
		var lieferindex = lieferhtml.indexOf("Die Lieferung erfolgt innerhalb"); //Nach "Die Lieferung erfolgt innerhalb" suchen, um alles vor diesem String abzuschneiden
		var lieferzeitentext_temp = lieferhtml.substring(lieferindex, lieferindex+100); //Alles vor "Die Lieferung erfolgt innerhalb" abschneiden
		var lieferindex = lieferzeitentext_temp.indexOf("<br>"); //Nach dem <br> suchen, um alles danach abzuschneiden
		var lieferzeitentext = lieferzeitentext_temp.substring(0, lieferindex); //Vom neuen String alles nach dem <br> abschneiden, dass nur noch der String übrig bleibt, den wir benötigen
		var lieferzeitentext_full = lieferzeitentext; //Lieferzeitentext ohne verminderte Lieferzeit
		
		//Lieferzeit vermindern, wenn in Gießen auf Lager
		if (document.querySelector('.is-in-stock') !== null && $( ".is-in-stock" ).text().indexOf("Gießen") >= 0){
		   lieferzeitentext = lieferzeitentext.replace(/[0-9]+/g, "3"); //Wenn die Ware auf Lager ist, wird die Lieferzeit auf 3 Tage gesetzt
		} 
		
		//Lieferzeit vermindern, wenn in Sulingen auf Lager
		if (document.querySelector('.is-in-stock') !== null && $( ".is-in-stock" ).text().indexOf("Sulingen") >= 0){
		   lieferzeitentext = lieferzeitentext.replace(/[0-9]+/g, "2"); //Wenn die Ware auf Lager ist, wird die Lieferzeit auf 2 Tage gesetzt
		} 
		
		//Lieferzeit anzeigen
		if(window.location.pathname !== "/"){
			$( ".is-in-stock" ).append( "<p>"+lieferzeitentext+"</p>" ); //Die Lieferzeiten an die Klasse anhängen
			$( ".is-not-available").append( "<p>Derzeit nicht verfügbar. Bestellware! "+lieferzeitentext_full+"</p>" ); //Die Lieferzeiten an die Klasse anhängen
		}
	}	
}
catch(e){
}

/*Testartikel
Auf Lager Löchel (SOLL: "Die Lieferung erfolgt innerhalb von 2 Tagen"):
https://www.loechel-industriebedarf.de/LOeCHEL_Industriebedarf_Qualitaets_Etiketten_Entferner_500_ml-19282887.html

Auf Lager NW (SOLL: "Die Lieferung erfolgt innerhalb von 3 Tagen"):
https://www.loechel-industriebedarf.de/Schutzbrille_Daylight_One_EN_166_Buegel_klar_Scheibe_klar_Polycarbonat_PROMAT-1917165.html

Ausverkauft Löchel (SOLL: "Derzeit nicht verfügbar. Bestellware! Die Lieferung erfolgt innerhalb von XX Tagen."):
https://www.loechel-industriebedarf.de/Makita_DHR400ZKU_Akku_Bohrhammer_fuer_SDS_MAX_2x18_V_mit_Bluetooth_ohne_Akku_oh-11436941.html

Auf Lager NW & auf Lager Löchel (SOLL: "Die Lieferung erfolgt innerhalb von 2 Tagen"): 
https://www.loechel-industriebedarf.de/Schlauchschelle_8_12_mm_W1_Bandbreite_9_mm_Beutel_PROMAT-11662844.html

Auf Lager Hersteller (SOLL: "Die Lieferung erfolgt innerhalb von 7 Tagen"):
https://www.loechel-industriebedarf.de/KS_TOOLS_1502233_Spezial_Loesewerkzeug_fuer_HENN_Schellen-18420329.html

Ausverkauft Hersteller (SOLL: "Derzeit nicht verfügbar. Bestellware! Die Lieferung erfolgt innerhalb von XX Tagen."):
https://www.loechel-industriebedarf.de/KS_TOOLS_1502295_Bremskolben_Adapter_Satz_3_tlg_-18420330.html
*/