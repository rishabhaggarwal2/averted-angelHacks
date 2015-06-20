<?php 
	require("mysql.class.php");

	$input = $_GET['input'];//debug
	//$input = $_POST['input'];//production
	global $o;
	$o = new MySQL();
	switch ($input) {
		case 'variable':
			# code...
			break;
		default:
			# code...
			break;
	}
?>