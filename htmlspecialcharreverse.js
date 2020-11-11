/************************************************************************************************************************************************
Support für <BR>, <B> etc.
************************************************************************************************************************************************/
if(document.getElementsByClassName('nw_product-detail__abstract')[0].innerHTML.includes("&lt;")){
	document.getElementsByClassName('nw_product-detail__abstract')[0].innerHTML = document.getElementsByClassName('nw_product-detail__abstract')[0].innerHTML.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
	document.getElementsByClassName('nw_product-detail__detail-box')[0].innerHTML = document.getElementsByClassName('nw_product-detail__detail-box')[0].innerHTML.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
}
