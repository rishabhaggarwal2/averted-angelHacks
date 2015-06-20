<?php 
	require("mysql.class.php");

	// $input = $_GET['input'];//debug
	//foreach($_POST as $key => $value){//production
	foreach ($_GET as $key => $value) {//debug
		$input[$key] = $value;
	}
	//$input = $_POST['input'];//production
	global $o;
	$o = new MySQL();
	switch ($input['input']) {
		case 'getpersons':
			// $name = $input['name'];
			$loc = $input['loc'];
			getInfo($o, $loc);
			break;
		case 'setpersons':
			$name = $input['name'];
			$loc = $input['loc'];
			$status = $input['status'];
			$uploaddir = '/uploads/';
			$i = rand(1,100);
			$filename = md5(basename($_FILES['userfile']['name']).$i);
			$uploadfile = $uploaddir.$filename;
			move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile);
			$phone = $input['phone'];
			setInfo($o, $name, $loc, $status, $filename, $phone);
			break;

		case 'update':
			$id = $input['id'];
			$status = $input['status'];
			$updateInfo($o, $id, $status);
			break;
		default:
			# code...
			break;   
	}

	function getInfo($o, $loc){
		$o->Select("locations", array("id"), array("name" => $loc));
		$id = $o->ArrayResult();
		$o->Select("persons", "*", array("loc_id" => $id))
		$result = $o->ArrayResults();
		json_encode($result);
		echo json_encode($result);
	}

	function setInfo($o, $name, $loc, $status, $filename, $phone){
		$o->Select("locations", array("id"), array("name" => $loc));
		$id = $o->ArrayResult();
		$o->Insert("persons", array("name"=>$name, "loc_id" => $id, "status" => $status, "image_name" => $filename, "phone" => $phone));
	}

	function updateInfo($o, $id, $status){
		$o->update("persons", array("status" => $status), array("id" = > $id));
	}
?>