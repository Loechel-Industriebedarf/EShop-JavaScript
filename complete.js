/************************************************************************************************************************************************
Lieferzeiten Anzeige
************************************************************************************************************************************************/

try{
	//Lieferzeiten nur bei Artikeln anzeigen (haben .html in der URL)
	if(window.location.href.indexOf("-") >= 1){
		var lieferzeiten = document.getElementsByClassName("legal"); //HTML der Lieferzeiten Klasse auslesen
		var lieferhtml = lieferzeiten[1]['outerHTML']; //HTML "reduzieren"; Unnötige Informationen des Objekts entfernen
		var lieferindex = lieferhtml.indexOf("Die Lieferung erfolgt innerhalb"); //Nach "Die Lieferung erfolgt innerhalb" suchen, um alles vor diesem String abzuschneiden
		var lieferzeitentext_temp = lieferhtml.substring(lieferindex, lieferindex+100); //Alles vor "Die Lieferung erfolgt innerhalb" abschneiden
		var lieferindex = lieferzeitentext_temp.indexOf("<br>"); //Nach dem <br> suchen, um alles danach abzuschneiden
		var lieferzeitentext = lieferzeitentext_temp.substring(0, lieferindex); //Vom neuen String alles nach dem <br> abschneiden, dass nur noch der String übrig bleibt, den wir benötigen
		var lieferzeitentext_full = lieferzeitentext;
		
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











/************************************************************************************************************************************************
Support für <BR>, <B> etc.
************************************************************************************************************************************************/
try{
if(document.getElementsByClassName('nw_product-detail__abstract')[0].innerHTML.includes("&lt;")){
	document.getElementsByClassName('nw_product-detail__abstract')[0].innerHTML = document.getElementsByClassName('nw_product-detail__abstract')[0].innerHTML.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
document.getElementsByClassName('nw_product-detail__detail-box')[0].innerHTML = document.getElementsByClassName('nw_product-detail__detail-box')[0].innerHTML.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
}
}
catch(e){
}





/************************************************************************************************************************************************
Tausche fehlendes Bild durch Logo
************************************************************************************************************************************************/
try{
//Repeat the function every second, because it can only trigger, if the logo was already loaded...
const interval = setInterval(function() {
   var oldSrc = '/static/com.nordwest.theme.2017/nordwest/frontend/images/productMime/big.jpg';
var newSrc = 'https://www.loechel-industriebedarf.de/upload/shoppictures_95/tinymce/icons/logo_klein.png';
$('img[src="' + oldSrc + '"]').attr('src', newSrc);

 }, 1000);
}
catch(e){
}


/************************************************************************************************************************************************
Registrierung für Bestandskunden => Registrierung
************************************************************************************************************************************************/
try{
$('.nw_page-title').html($('.nw_page-title').html().replace('für Bestandskunden', ''));
}
catch(e){
}


/************************************************************************************************************************************************
Meldung bei Kauf auf Rechnung
************************************************************************************************************************************************/
try{
$('.nw_checkout-option__label').each(function() {
	var text = $(this).text();
	$(this).text(text.replace('Kauf auf Rechnung', 'Kauf auf Rechnung - Nur für Schulen, Behörden, Vereine und im Handelsregister eingetragene Unternehmen nach positiver Bonitätsprüfung. Wir behalten uns vor, die Zahlungsart gegebenenfalls abzuändern.')); 
});
}
catch(e){
}


/************************************************************************************************************************************************
Markenwelten
************************************************************************************************************************************************/
if(window.location.href == "https://www.loechel-industriebedarf.de/nwsearch/execute?query=brennenstuhl"){ 
window.location.replace("https://www.loechel-industriebedarf.de/brennenstuhl-markenwelt");
} 
if(decodeURI(window.location.href).toLowerCase().includes("löchel")){ 
window.location.replace("https://www.loechel-industriebedarf.de/eigenmarke");
} 


/************************************************************************************************************************************************
Sidebar wegklicken
************************************************************************************************************************************************/
function disableLOESidebar(){
$('.loe_sidebar').hide();
}


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