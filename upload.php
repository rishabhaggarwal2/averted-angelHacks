<?php
if(isset($_FILES["userfile"]["type"]))
{
$validextensions = array("jpeg", "jpg", "png");
$temporary = explode(".", $_FILES["userfile"]["name"]);
$file_extension = end($temporary);
if ((($_FILES["userfile"]["type"] == "image/png") || ($_FILES["userfile"]["type"] == "image/jpg") || ($_FILES["userfile"]["type"] == "image/jpeg")
) && ($_FILES["userfile"]["size"] < 100000)//Approx. 100kb files can be uploaded.
&& in_array($file_extension, $validextensions)) {
if ($_FILES["userfile"]["error"] > 0)
{
echo "Return Code: " . $_FILES["userfile"]["error"] . "<br/><br/>";
}
else
{
if (file_exists("uploads/" . $_FILES["userfile"]["name"])) {
echo $_FILES["userfile"]["name"] . " <span id='invalid'><b>already exists.</b></span> ";
}
else
{
$sourcePath = $_FILES['userfile']['tmp_name']; // Storing source path of the userfile in a variable
$targetPath = "uploads/".$_FILES['userfile']['name']; // Target path where userfile is to be stored
move_uploaded_file($sourcePath,$targetPath) ; // Moving Uploaded userfile
echo "<span id='success'>Image Uploaded Successfully...!!</span><br/>";
echo "<br/><b>File Name:</b> " . $_FILES["userfile"]["name"] . "<br>";
echo "<b>Type:</b> " . $_FILES["userfile"]["type"] . "<br>";
echo "<b>Size:</b> " . ($_FILES["userfile"]["size"] / 1024) . " kB<br>";
echo "<b>Temp userfile:</b> " . $_FILES["userfile"]["tmp_name"] . "<br>";
}
}
}
else
{
echo "<span id='invalid'>***Invalid userfile Size or Type***<span>";
}
}
?>