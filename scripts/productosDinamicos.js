//Formulario Productos - página agregar productos - 

//Declaramos las variables 
const formAgregarProductos = document.querySelector("#formAgregarProductos"); 
const nombreCurso = document.querySelector("#nombreCurso"); 
const instructorCurso = document.querySelector("#instructorCurso");
const precioAnteriorCurso = document.querySelector("#precioAnteriorCurso");
const precioActualCurso = document.querySelector("#precioActualCurso");
const idCurso = document.querySelector("#idCurso"); 
//const imagenCurso = document.querySelector("#imagenCurso");


//Arreglo Productos (donde se van a ir empujando cada vez que se llene el formulario) 
//let productos = [];
let productos = JSON.parse(localStorage.getItem("productos")) || [];



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

    const nombre = nombreCurso.value.trim();
    const instructor = instructorCurso.value.trim();
    const precioAnterior = Number(precioAnteriorCurso.value.trim());
    const precioActual = Number(precioActualCurso.value.trim());
    const id = idCurso.value.trim();
    //const imagen = imagenCurso.value.trim();

    if (nombre && instructor && !isNaN(precioAnterior) && !isNaN(precioActual) && id) {
        mostrarMensajeEnvioCorrecto();
        const nuevoProducto = new Producto(nombre, instructor, precioAnterior, precioActual, id);
        productos = [...productos, nuevoProducto];
        localStorage.setItem("productos", JSON.stringify(productos));
        limpiarCamposFormulario();
    } else {
        mostrarMensajeError();
    }
}

/*
****************************************
******MENSAJE DE ERROR Y CHECK**********
****************************************
*/

function mostrarMensajeError(){
    Swal.fire({
        title: `Los campos no pueden estar vacíos`, // Usar toFixed(2) para mostrar dos decimales
        text: `Llena los datos :)`,
        icon: 'error'
    });
}

function mostrarMensajeEnvioCorrecto(){
    Swal.fire({
        title: `Producto añadido correctamente`, // Usar toFixed(2) para mostrar dos decimales
        /* text: `Nos comunicaremos contigo a la brevedad`, */
        icon: 'success'
    });
}

//Limpiar campos del formulario 
function limpiarCamposFormulario() {
    nombreCurso.value = "";
    instructorCurso.value = "";
    precioAnteriorCurso.value = "";
    precioActualCurso.value = "";
    idCurso.value = ""; 
}

//Creamos prototipo Producto 

//Función constructora
function Producto(name, teacher, beforePrice, afterPrice, id) {
    this.name = name;
    this.teacher = teacher;
    this.beforePrice = beforePrice;
    this.afterPrice = afterPrice; 
    this.id = id; 
}


/* // Form Value 
function crearLista(nombre, instructor, precioAntes, precioActual, imagen, id) {
    // Crear nueva instancia de Producto
    const nuevoProducto = new Producto(nombre, instructor, precioAntes, precioActual, imagen, id);

    // Empujar los datos al arreglo
    //productos.push(nuevoProducto);
    productos = [...productos, nuevoProducto];
    console.log(productos);

    // Guardar en localStorage
    localStorage.setItem('productos', JSON.stringify(productos));
}
 */

