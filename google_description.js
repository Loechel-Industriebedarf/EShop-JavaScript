newDescription = $( ".nw_product-detail__price-gross" ).text()+" | Auf Lager | "+  $( ".nw_product-detail__item-number" ).text() + " | " + $( ".nw_product-detail__description" ).text();
$('meta[name="description"]').attr("content", newDescription);


var newTitle= $('meta[name=title]').attr("content");
newTitle= newTitle + " preiswert online kaufen";
$('meta[name="title"]').attr("content", newTitle);
