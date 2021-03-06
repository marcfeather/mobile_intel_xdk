/*
    Verifica se o usuario esta logado
    @return True => Caso o usuario esteja logado
    @return False => Caso contrario
    @note => Utilizacao nao recomendada nas seguintes paginas: #car_list, #car_list_view, #login
*/
function verifica_login() {
    if (localStorage.getItem("username") !== null) {
        return true;
    } else {
        return false;
    }
}

/*jshint browser:true */
/*global $ */(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
     /* button  #btn_login */
    $(document).on("click", "#btn_login", function(evt)
    {
        
		var login_dados = {
			"login": document.getElementById("txt_login").value,
			"password": document.getElementById("txt_password").value, /** Será convertido em md5 dentro do php (Temporariamente, pensar em outra forma de criptografia). **/
        };
        
        if (login_dados.login === null || login_dados.login === "")
        {
            navigator.notification.alert("Digite o login.","Alerta");
            return;
        }
        
        if (login_dados.password === null || login_dados.password === "")
        {
            navigator.notification.alert("Digite a senha.","Alerta");
            return;
        }
        
        /* Quando passar para o mobile ou publicar, mudar o nome abaixo "localhost" para o IP do servidor onde irá ficar os arquivos php */
        var _url = "http://localhost/mobile_intel_xdk/login_mobile.php?get_rows=json&login="+login_dados.login+"&password="+login_dados.password;
	
        var xhr = new XMLHttpRequest();
        xhr.open("GET", _url, false);
        xhr.onload = function(){
        
        if(xhr.status == 200)
        {
            var json_string = xhr.responseText;
            
            if (json_string == '{"result":[]}') {
                navigator.notification.alert("Login e/ou senha incorretos.","Alerta");
                return;
            }
            
            var json = JSON.parse(json_string);
            
            var login_session = {
					"name": json.result[0][1],
					"email": json.result[0][2],
					"login": json.result[0][3],
            };
            
            // Seta o localstorage para esse login
            localStorage.setItem('username',login_session.name);
            localStorage.setItem('login',login_session.login);
            localStorage.setItem('email',login_session.email);
            localStorage.setItem('password',login_dados.password);
            
            //navigator.notification.alert("Bem vindo, "+localStorage.getItem('username')+"!","Alerta");
            
            // Redireciona para a pagina de lista
            window.location.href = "car_list.html";
            
        }
        else if(xhr.status == 404)
        {
            navigator.notification.alert("Web Service Não Existe.", "Erro");
        }
        else
        {
            navigator.notification.alert("Erro desconhecido durante a comunicação com o servidor.", "Erro");
        }
        };
        xhr.send();
    });
    
    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
