

<?php

function verifyCaptcha($val){
	//
	// A very simple PHP example that sends a HTTP POST to a remote site
	//
	$secret = "";

	$ch = curl_init();

	curl_setopt($ch, CURLOPT_URL,"https://www.google.com/recaptcha/api/siteverify");
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS,
				"secret=" . $secret . "&response=" . $val);

	// In real life you should use something like:
	// curl_setopt($ch, CURLOPT_POSTFIELDS, 
	//          http_build_query(array('postvar1' => 'value1')));

	// Receive server response ...
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	$server_output = curl_exec($ch);

	curl_close($ch);

	// Further processing ...
	//echo $server_output;
	$arr = json_decode($server_output, true);

	return $arr["success"]
}


?>

