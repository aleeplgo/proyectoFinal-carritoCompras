//Formulario Productos - página agregar productos - 

//Declaramos las variables 
const formAgregarProductos = document.querySelector("#formAgregarProductos"); 
const nombreCurso = document.querySelector("#nombreCurso"); 
const instructorCurso = document.querySelector("#instructorCurso");
const precioAnteriorCurso = document.querySelector("#precioAnteriorCurso");
const precioActualCurso = document.querySelector("#precioActualCurso");
const imagenCurso = document.querySelector("#imagenCurso");


//Events Listeners
//Mandar a llamar las funciones
eventListenersProductosDinamicos(); 

function eventListenersProductosDinamicos(){
    formAgregarProductos.addEventListener("submit",agregarProductosATienda);
}


//Funciones 

function agregarProductosATienda(e){
    e.preventDefault(); 
    console.log("Agregando Productos...");

}