function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function goBack() {
  window.history.back();
}

function checkSession(tipo) {
  try{
    if (getCookie("tipo") != tipo) {

      var re = /^https?:\/\/[^/]+/i;
      window.location.href = re.exec(window.location.href)[0]+"/login";
     // window.location.href =window.location.href +"login";
    }
  }
  catch(err){
    var re = /^https?:\/\/[^/]+/i;
    window.location.href = re.exec(window.location.href)[0]+"/login";
  }
  
  

}

function checkSessionActive(tipo) {
  try{
    if (getCookie("tipo") == "") {

      var re = /^https?:\/\/[^/]+/i;
      window.location.href = re.exec(window.location.href)[0]+"/login";
     // window.location.href =window.location.href +"login";
    }
  }
  catch(err){
    var re = /^https?:\/\/[^/]+/i;
    window.location.href = re.exec(window.location.href)[0]+"/login";
  }
  
  

}

function deleteCookie(name) {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
  checkSessionActive("");
};

function logoutCookie(){
deleteCookie("tipo");
deleteCookie("username");
}

function cargarDatosUsuario(id){

document.getElementById(id).innerHTML="Usuario: "+getCookie("username") +"/ Tipo:"+ getCookie("tipo");

}