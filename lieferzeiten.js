var lieferzeiten = document.getElementsByClassName("legal"); //Read HTML of the class
var lieferhtml = lieferzeiten[1]['outerHTML']; //"Reduce" HTML; Remove unneccessary information of it
var lieferindex = lieferhtml.indexOf("Die Lieferung erfolgt innerhalb"); //Search for "Die Lieferung erfolgt innerhalb", to cut everything before this string later
var lieferzeitentext_temp = lieferhtml.substring(lieferindex, lieferindex+100); //Cut everything before "Die Lieferung erfolgt innerhalb" 
var lieferindex = lieferzeitentext_temp.indexOf("<br>"); //Search for <br>, to cut everything after it
var lieferzeitentext = lieferzeitentext_temp.substring(0, lieferindex); //Cut everything after <br> in the new string, so we only get the string we actually need
$( ".nw_delivery-status" ).append( "<p>"+lieferzeitentext+"</p>" ); //Attach the shipping times to another class