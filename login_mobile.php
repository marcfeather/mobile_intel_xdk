<?php

if(isset($_GET["get_rows"]) && $_GET["get_rows"] == "json")
{
    
    if(isset($_GET["login"]) && isset($_GET["password"]))
    {
		$login = '"'.$_GET["login"].'"';
		$password = '"'.md5($_GET["password"]).'"'; /* Temporário, depois mudar para outra forma de criptografia */
		
		/* Temporário, depois mudar para PDO */
        $link = mysqli_connect("localhost", "root", "", "mobile_project");

        if (mysqli_connect_errno()) {
            echo mysqli_connect_error();
            header("HTTP/1.0 500 Internal Server Error");
            exit();
        }

		/* Temporário, depois mudar para PDO */
        $query = "SELECT * FROM users where login = ".$login." and password = ".$password;

        $jsonData = array();

        if ($result = mysqli_query($link, $query)) {

            while ($row = mysqli_fetch_row($result)) {
                $jsonData[] = $row;
            }

            mysqli_free_result($result);

            echo "{\"result\":". json_encode($jsonData) . "}";
        }
        else {

            echo "{\"result\":". json_encode($jsonData) . "}";
        }

        mysqli_close($link);
    }
    else
    {
        header("HTTP/1.0 404 Not Found");
    }
}
else
{
    header("HTTP/1.0 404 Not Found");
}


?>