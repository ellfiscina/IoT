<?php

$fname = "test.txt";
$file = fopen($fname, 'w');
$x = $_GET('index')
fwrite($file, $x);
fclose($file);

header("location:./");
?>