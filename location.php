<?php 
	require("mysql.class.php");

	// $input = $_GET['input'];//debug
	$input = $_POST['input'];//production
	global $o;
	$o = new MySQL();
	// print_r($results);
	switch ($input) {
		case 'getmapdata':
			sendMapData($o);
			break;
		case 'setlocation':
			$name = $_GET['name'];
			$lat = $_GET['lat'];
			$long = $_GET['long'];
			saveMapData($o, $name, $lat, $long);
			break;
		default:
			# code...
			break;
	}

	function sendMapData($o){

		$o->Select("locations", array('name', 'lat', 'long', 'date'));
		$results = $o->ArrayResults();
		json_encode($results);
		echo json_encode($results);
	}

	function saveMapData($o, $name, $lat, $long){
		$o->Insert("locations", array('name' => $name, 'lat' => $lat, 'long' => $long));
	}
?>