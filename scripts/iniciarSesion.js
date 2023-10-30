/* Enlazamos las variables*/
const fomLogin = document.querySelector("#fomLogin"); 
const inptEmailLogin = document.querySelector("#inptEmailLogin"); 
const pswdLogin = document.querySelector("#pswdLogin");

//Events Listener
//Mandar a llamar las funciones
eventListeners(); 

function eventListeners(){
    fomLogin.addEventListener("submit",IniciarSesion);
}


//Funciones 
function IniciarSesion(e){
    e.preventDefault(); 
    console.log("Hola");
}