/************************************************************************************************************************************************
Tausche fehlendes Bild durch Logo
************************************************************************************************************************************************/

//Repeat the function every second, because it can only trigger, if the logo was already loaded...
const interval = setInterval(function() {
   var oldSrc = '/static/com.nordwest.theme.2017/nordwest/frontend/images/productMime/big.jpg';
var newSrc = 'https://www.loechel-industriebedarf.de/upload/shoppictures_95/tinymce/icons/logo_klein.png';
$('img[src="' + oldSrc + '"]').attr('src', newSrc);

 }, 1000);