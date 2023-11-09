/*VARIABLES*/
const carrito = document.querySelector("#carrito"); 
const btnAgregarCarrito = document.querySelectorAll(".agregar-carrito"); 
const numeritoContador = document.querySelector(".contador"); 
const btnVaciarCarrito = document.querySelector("#vaciarCarrito"); 
//Arreglo vacío del carrito
let articulosCarrito = [];
const listaCarrito = document.querySelector("#lista-carrito");
const tbodyProductosCarrito = document.querySelector(".tbodyProductosCarrito"); 
const borrarCursoCarrito = document.querySelector(".borrar-curso");
const pagarAhora = document.querySelector("#pagarAhora"); 
let listaProductos = [];

eventsToCart(); 

/*EVENTOS*/


/*EVENTOS*/
function eventsToCart(){
    //console.log(btnAgregarCarrito);
    //Cuando son varios botones se agrega: 
    //Esto se hace porque cuando seleccionas diferentes elementos con la misma clase se hace un arreglo NodeList y hay que recorrerlo
  for(const btn of btnAgregarCarrito){
        btn.addEventListener("click", agregarAlCarrito); 
    }


    //Evento click para ejecutar la función de vaciar el carrito 
    btnVaciarCarrito.addEventListener("click",resetearCarrito); 

    //Eliminar curso del carrito 
    carrito.addEventListener("click", eliminarCursoCarrito); 

    //Botón pagar ahora
    pagarAhora.addEventListener("click", pagarProductos); 
}

/*
FUNCTION AGREGAR AL CARRITO EN BASE AL EVENTO DEL BOTÓN
*/


/* AGREGAR AL CARRITO */
function agregarAlCarrito(e) {
    e.preventDefault();
    const cursoSeleccionado = e.target.parentElement;
    console.log(cursoSeleccionado);
    leerDatosCardCurso(cursoSeleccionado);
    mostrarNotificacion("Producto Agregado");
    actualizarContadorCarrito();
}

function mostrarNotificacion(mensaje) {
    Toastify({
        text: mensaje,
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "right",
        style: {
            background: "var(--green)",
            color: "var(--white)"
        }
    }).showToast();
}

function actualizarContadorCarrito() {
    numeritoContador.classList.remove("inactive");
    numeritoContador.classList.add("active");
    let contador = sumarContador();
    numeritoContador.textContent = contador;
}


function sumarContador() {
    let suma = Number(numeritoContador.textContent) || 0; // Obtén el valor actual del contador y conviértelo a un número
    //console.log(suma);
    suma += 1;
    return suma;
}

/* LEER DATOS DE LA CARD DEL CURSO */
function leerDatosCardCurso(curso) {
    const cardCurso = curso.closest('.card'); // Encuentra el contenedor .card más cercano
    const cursoId = cardCurso.querySelector(".agregar-carrito").getAttribute("data-id");
    const cursoEncontrado = listaProductos.find(course => course.id === cursoId);

    if (cursoEncontrado) {
        const infoCurso = {
            id: cursoEncontrado.id,
            imagen: cursoEncontrado.image,
            titulo: cursoEncontrado.name,
            profesor: cursoEncontrado.teacher,
            precioAnterior: cursoEncontrado.beforePrice,
            precioActual: cursoEncontrado.afterPrice,
            cantidad: 1
        };

        articulosCarrito.push(infoCurso);
        dropdownCarritoHTML();
        guardarEnLocalStorage();
    }
}


/*
MUESTRA EL CARRITO DE COMPRAS
*/


//Muestra el carrito de compras 
function dropdownCarritoHTML() {
    limpiarHTMLDropdown();

    const productosAcumulados = {};

    articulosCarrito.forEach(function (curso) {
        if (productosAcumulados[curso.id]) {
            productosAcumulados[curso.id].cantidad += curso.cantidad;
            productosAcumulados[curso.id].precioTotal += curso.precioActual * curso.cantidad;
        } else {
            productosAcumulados[curso.id] = {
                ...curso,
                precioTotal: curso.precioActual * curso.cantidad
            };
        }
    });

    Object.values(productosAcumulados).forEach(function (producto) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${producto.titulo}</td>
            <td>${producto.cantidad}</td>
            <td>$${producto.precioTotal}</td>
            <td><a href="#" class="borrar-curso" data-id="${producto.id}">X</a></td>
        `;

        tbodyProductosCarrito.appendChild(row);
    });
}

function guardarEnLocalStorage() {
    localStorage.setItem("articulosCarrito", JSON.stringify(articulosCarrito));
}

/* ELIMINAR PRODUCTOS DEL CARRITO */
function resetearCarrito(e) {
    e.preventDefault();
    numeritoContador.textContent = 0;
    limpiarHTMLDropdown();
    articulosCarrito = [];
    guardarEnLocalStorage();
}



//ELimina los cursos del Dropdown Carrito
function limpiarHTMLDropdown() {
    while (tbodyProductosCarrito.firstChild) {
        tbodyProductosCarrito.removeChild(tbodyProductosCarrito.firstChild);
    }
}


//Eliminar curso del dropdown carrito 
function eliminarCursoCarrito(e) {
    e.preventDefault();
    if (e.target.classList.contains("borrar-curso")) {
        const cursoID = e.target.getAttribute("data-id");
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoID);
        dropdownCarritoHTML();
        guardarEnLocalStorage();
    }
}


/* PAGAR PRODUCTOS */

// Pagar productos
function pagarProductos(e) {
    e.preventDefault(); 

    if (articulosCarrito.length > 0) {
        // Calcular el total del precio de todos los cursos en el carrito
        const totalPrecio = articulosCarrito.reduce((total, curso) => {
            return total + (curso.precioActual * curso.cantidad);
        }, 0);

        Swal.fire({
            title: `¡Tu pago de $${totalPrecio.toFixed(2)} ha sido procesado!`, // Usar toFixed(2) para mostrar dos decimales
            text: `¡Gracias por tu compra!`,
            icon: 'success',
        });
       const vaciarCarritoDespuesDePagar = ()=>{
        numeritoContador.textContent=0; 
        limpiarHTMLDropdown(); 
    
        //Vaciar el arreglo de Artículos Carrito
        articulosCarrito = [];
       }
       vaciarCarritoDespuesDePagar(); 
    } else {
        Swal.fire({
            title: `No pudimos procesar tu pago`,
            text: `¡Ooops, selecciona al menos un curso!`,
            icon: 'error',
        });
    }
}
/* RECUPERAR DATOS DEL STORAGE JSON A UN OBJETO */
window.onload = function () {
    const datosJSON = localStorage.getItem("productos");
    const datos = JSON.parse(datosJSON) || [];
    listaProductos = datos;
    llenarHTMLConProductos();
};

function llenarHTMLConProductos() {
    const listaCursos = document.querySelector("#lista-cursos");
    listaCursos.innerHTML = "";

    listaProductos.forEach(course => {
        const columna = document.createElement("div");
        columna.className = "column";

        const card = document.createElement("div");
        card.className = "card";

        const tituloCurso = document.createElement("h2");
        tituloCurso.className = "titulo-curso";
        tituloCurso.textContent = course.name;

        const profesorCurso = document.createElement("p");
        profesorCurso.className = "profesor-curso";
        profesorCurso.textContent = course.teacher;

        const reseñas = document.createElement("p");
        reseñas.className = "reseñas";
        // Añadir estrellas aquí si es necesario

        const precioAnterior = document.createElement("p");
        precioAnterior.className = "precio-anterior";
        precioAnterior.textContent = course.beforePrice;

        const precioActual = document.createElement("p");
        precioActual.className = "precio-actual";
        precioActual.textContent = course.afterPrice;

        const botonAgregarCarrito = document.createElement("button");
        botonAgregarCarrito.className = "agregar-carrito btn-purple";
        botonAgregarCarrito.setAttribute("data-id", course.id);
        botonAgregarCarrito.textContent = "Agregar al carrito";

        card.appendChild(tituloCurso);
        card.appendChild(profesorCurso);
        card.appendChild(reseñas);
        const divPrecio = document.createElement("div");
        divPrecio.className = "precio";
        divPrecio.appendChild(precioAnterior);
        divPrecio.appendChild(precioActual);
        card.appendChild(divPrecio);
        card.appendChild(botonAgregarCarrito);

        columna.appendChild(card);
        listaCursos.appendChild(columna);
    });
}


