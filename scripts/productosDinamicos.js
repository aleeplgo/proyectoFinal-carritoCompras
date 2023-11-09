//Formulario Productos - página agregar productos - 

//Declaramos las variables 
const formAgregarProductos = document.querySelector("#formAgregarProductos"); 
const nombreCurso = document.querySelector("#nombreCurso"); 
const instructorCurso = document.querySelector("#instructorCurso");
const precioAnteriorCurso = document.querySelector("#precioAnteriorCurso");
const precioActualCurso = document.querySelector("#precioActualCurso");
const imagenCurso = document.querySelector("#imagenCurso");


//Arreglo Productos (donde se van a ir empujando cada vez que se llene el formulario) 
let productos = [];


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

    if (nombreCurso.value.trim() !== "" &&  instructorCurso.value.trim() !== "" && Number(precioAnteriorCurso.value.trim()) !== "" && Number(precioActualCurso.value.trim()) !== "" && imagenCurso.value) {
        mostrarMensajeEnvioCorrecto();
        crearLista(nombreCurso.value.trim(), instructorCurso.value.trim(), Number(precioAnteriorCurso.value.trim()), Number(precioActualCurso.value.trim()), imagenCurso.value);
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
    imagenCurso.src = ""; 
    nombreCurso.value = "";
    instructorCurso.value = "";
    precioAnteriorCurso.value = "";
    precioActualCurso.value = "";
}

//Creamos prototipo Producto 

//Función constructora
function Producto(name, teacher, beforePrice, afterPrice, image) {
    this.name = name;
    this.teacher = teacher;
    this.beforePrice = beforePrice;
    this.afterPrice = afterPrice; 
    this.image = image; 
}


// Form Value 
function crearLista(nombre, instructor, precioAntes, precioActual, imagen) {
    // Crear nueva instancia de Producto
    const nuevoProducto = new Producto(nombre, instructor, precioAntes, precioActual, imagen);

    // Empujar los datos al arreglo
    productos.push(nuevoProducto);
    //console.log(productos);

    // Guardar en localStorage
    localStorage.setItem('productos', JSON.stringify(productos));
}

/*
****************************************
********RECUPERAR DATOS DEL STORAGE JSON A UN OBJETO **********
****************************************
*/

// Recuperar datos del localStorage cuando la página se carga
window.onload = function () {
    const datosJSON = localStorage.getItem("productos");
    const datos = JSON.parse(datosJSON) || [];
    productos = datos;
    console.log(productos);
};

