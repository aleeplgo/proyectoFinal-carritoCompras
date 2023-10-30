//Formulario de Inicio de sesión
const fomLogin = document.querySelector("#fomLogin"); 
const inptEmailLogin = document.querySelector("#inptEmailLogin"); 
const pswdLogin = document.querySelector("#pswdLogin");
const alerta = document.querySelector(".alerta"); 

//Events Listeners

//Mandar a llamar las funciones
eventListeners(); 

function eventListeners(){
    fomLogin.addEventListener("submit",verificarCredenciales);
}


//Funciones 
function verificarCredenciales(e){
    e.preventDefault(); 

    //Traemos los valores de cadad input
    const email = inptEmailLogin.value.trim(); 
    const pswd = pswdLogin.value.trim(); 

    //Validamos que el usuario y contraseña sea el mismo que está guardado en el localStorage
    //console.log(localStorage.getItem(email));
    const verificarPswd = localStorage.getItem(email);

    if (verificarPswd === pswd) {
        // Las credenciales son correctas
        alerta.textContent = "Gracias has iniciado sesión correctamente";
        alerta.style.color = "#15bd3f";
        alerta.style.border = "3px solid #15bd3f";
        redireccionar(); 
        return true;
    } else {
        // Las credenciales son incorrectas
        alerta.textContent = "Las credenciales son incorrectas";
        alerta.style.color = "red";
        alerta.style.border = "3px solid red";
        return false;
    }
}


function redireccionar(){
    localStorage.setItem('usuarioAutenticado', 'true');
    window.location.href = "agregarProductos.html";
}