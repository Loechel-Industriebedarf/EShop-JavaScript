try{
$('.nw_checkout-option__label').each(function() {
	var text = $(this).text();
	$(this).text(text.replace('Kauf auf Rechnung', 'Kauf auf Rechnung - Nur für Schulen, Behörden, Vereine und im Handelsregister eingetragene Unternehmen nach positiver Bonitätsprüfung. Wir behalten uns vor, die Zahlungsart gegebenenfalls abzuändern.')); 
});
}
catch(e){
}