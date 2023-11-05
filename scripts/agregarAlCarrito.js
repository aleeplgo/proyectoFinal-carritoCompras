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


eventsToCart(); 

/*
********************************
********************************
********************************
EVENTOS
********************************
********************************
********************************
*/


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
********************************
********************************
********************************
FUNCTION AGREGAR AL CARRITO EN BASE AL EVENTO DEL BOTÓN
********************************
********************************
********************************
*/


function agregarAlCarrito(e){
    e.preventDefault(); 
        //console.log("1 ", e.target.parentElement);//Aquí me muestra la card
        //console.log("2 ", e.target.parentElement.parentElement); //Aquí me muestra la columna


        if(btnAgregarCarrito){

        //Guardamos en una variable el curso que está seleccionando
        const cursoSeleccionado = e.target.parentElement;
        //console.log(cursoSeleccionado);
        leerDatosCardCurso(cursoSeleccionado);

        //Librería de notificaciones 
        Toastify({
            text: "Producto Agregado",
            duration: 3000,
            //destination: "carrito.html",
            newWindow: true,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "var(--green)",
              color: "var(--white)"
            },
            onClick: function(){} // Callback after click
          }).showToast();

            // Hacer el incremento del contador
            numeritoContador.classList.remove("inactive");
            numeritoContador.classList.add("active"); 
            let contador = sumarContador();
            numeritoContador.textContent = contador;


    } 
    
}

function sumarContador() {
    let suma = Number(numeritoContador.textContent) || 0; // Obtén el valor actual del contador y conviértelo a un número
    //console.log(suma);
    suma += 1;
    return suma;
}

/*
********************************
********************************
********************************
LEE EL CONTENIDO DE LA CARD DEL CURSO
********************************
********************************
********************************
*/


//Lee el contenido de la card del curso
function leerDatosCardCurso(curso){
    //Crear un objeto con el contenido del curso actual 
    const infoCurso = {
        id: curso.querySelector(".agregar-carrito").getAttribute("data-id"),
        imagen: curso.querySelector("img").src, //Extraemos el atributo src de la imagen 
        titulo: curso.querySelector(".titulo-curso").textContent, 
        profesor: curso.querySelector(".profesor-curso").textContent,
        precioAnterior: curso.querySelector(".precio-anterior").textContent,
        precioActual: curso.querySelector(".precio-actual").textContent,
        cantidad: 1
    }

    //Agrega elementos al arreglo de carrito con el spread operator
    articulosCarrito = [...articulosCarrito, infoCurso]; 

    //Mandar a llamar la función de mostrar en el carrito
    dropdownCarritoHTML();

}

/*
********************************
********************************
********************************
MUESTRA EL CARRITO DE COMPRAS
********************************
********************************
********************************
*/


//Muestra el carrito de compras 
function dropdownCarritoHTML() {
    //Limpiar el tbody
    limpiarHTMLDropdown();

    // Crear un objeto para rastrear los productos acumulados
    const productosAcumulados = {};

    // Recorre el carrito y acumula los productos
    articulosCarrito.forEach(function (curso) {
        // Si el producto ya está en productosAcumulados, acumula la cantidad y el precio
        if (productosAcumulados[curso.id]) {
            productosAcumulados[curso.id].cantidad += curso.cantidad;
            productosAcumulados[curso.id].precioTotal += curso.precioActual * curso.cantidad;
        } else {
            // Si el producto no está en productosAcumulados, agrega el producto
            productosAcumulados[curso.id] = {
                ...curso,
                precioTotal: curso.precioActual * curso.cantidad
            };
        }
    });

    // Genera el HTML con los productos acumulados
    Object.values(productosAcumulados).forEach(function (producto) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${producto.titulo}</td>
            <td>${producto.cantidad}</td>  
            <td>$${producto.precioTotal}</td>
            <td><a href="#" class="borrar-curso" data-id="${producto.id}"> X </a></td>
        `;

        // Agrega el html en el tbody
        tbodyProductosCarrito.appendChild(row);
    });
}

/*
********************************
********************************
********************************
ELIMINAR PRODUCTOS DEL CARRITO
********************************
********************************
********************************
*/

function resetearCarrito(e){
    e.preventDefault(); 
    numeritoContador.textContent=0; 
    limpiarHTMLDropdown(); 

    //Vaciar el arreglo de Artículos Carrito
    articulosCarrito = [];
    return; 
}



//ELimina los cursos del Dropdown Carrito
function limpiarHTMLDropdown(){
    //Forma lenta
    //tbodyProductosCarrito.innerHTML = ""; 

    //Mejor borrar con while
    while(tbodyProductosCarrito.firstChild){
        tbodyProductosCarrito.removeChild(tbodyProductosCarrito.firstChild);
    }
}


//Eliminar curso del dropdown carrito 
function eliminarCursoCarrito(e){
    e.preventDefault(); 
    //console.log(e.target.classList);
    //console.log("desde borrar carrito ");
    if(e.target.classList.contains("borrar-curso")){
       const cursoID= e.target.getAttribute("data-id");
       //Elimina del arreglo por el data-id
       articulosCarrito = articulosCarrito.filter(curso =>curso.id !== cursoID); 
       console.log(articulosCarrito);

       //Iterar sobre el carrito y mostrar su html 
       dropdownCarritoHTML(); 
    } 
}


/*
********************************
********************************
********************************
PAGAR PRODUCTOS
********************************
********************************
********************************
*/

//Pagar productos
/* function pagarProductos(e){
    e.preventDefault(); 
    if(articulosCarrito.length > 0){
        const cursos = articulosCarrito[0]; 
        const tituloCurso = cursos.titulo; 
        const precioCurso = cursos.precioActual; 
        Swal.fire({
            title: `${tituloCurso}`,
            text: `¡Tu pago de $${precioCurso} ha sido procesado!`,
            icon: 'success',
          });  
    } else {
        Swal.fire({
            title: `No pudimos procesar tu pago`,
            text: `¡Ooops, selecciona al menos un curso!`,
            icon: 'error',
          });  
    }

   
} */

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
