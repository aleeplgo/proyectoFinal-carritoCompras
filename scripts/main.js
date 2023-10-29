//Enlazamos las variables a su selector 

//Carrito
const carrito = document.querySelector("#carrito"); 

//Lista carrito es la tabla del dropdown
const listaCarrito = document.querySelector("#lista-carrito"); 

//Botón de vaciar carrito dentro del dropdown
const vaciarCarrito = document.querySelector("#vaciarCarrito"); 

// Contenedor con todas las cards de cursos
const listaCursos = document.querySelector("#lista-cursos");

let articulosEnCarrito = []; 

//Generar una función global para cargar los event listeners

cargarEventListeners(); 

function cargarEventListeners(){

}
