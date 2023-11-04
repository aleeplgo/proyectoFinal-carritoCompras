//Formulario de Agregar Productos
const seccionAgregarProductos = document.querySelector("body"); 
const textoBanner = document.querySelector(".textoBanner"); 
const btnCerrarSesion = document.querySelector("#btnCerrarSesion"); 

//Si no estás loggeado la página redire a Iniciar sesión
if (localStorage.getItem('usuarioAutenticado') !== 'true') {
    seccionAgregarProductos.parentNode.removeChild(seccionAgregarProductos);
    window.location.href = "iniciarSesion.html";
} else {
    //Cambiar mensaje del Banner si el usuario está loggeado
    textoBanner.textContent = "Llena el formulario y actualiza tu catálogo";
}


//Events Listeners
//Mandar a llamar las funciones
eventListeners(); 

function eventListeners(){
    btnCerrarSesion.addEventListener("click", LogOut); 
}


//Funciones 


function LogOut(){
    // Para cerrar la sesión (eliminar la clave específica del localStorage)
    if (localStorage.getItem('usuarioAutenticado') !== 'true') {
        window.location.href = "iniciarSesion.html";

    } else {
        localStorage.removeItem("usuarioAutenticado")
        window.location.href = "iniciarSesion.html";
    }
}