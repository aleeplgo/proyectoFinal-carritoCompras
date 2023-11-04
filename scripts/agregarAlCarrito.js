/*VARIABLES*/
const btnAgregarCarrito = document.querySelectorAll(".agregar-carrito"); 
const numeritoContador = document.querySelector(".contador"); 
const btnVaciarCarrito = document.querySelector("#vaciarCarrito"); 
//Arreglo vacío del carrito
let articulosCarrito = [];
const listaCarrito = document.querySelector("#lista-carrito");
const tbodyProductosCarrito = document.querySelector(".tbodyProductosCarrito"); 

eventsToCart(); 

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
}


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


function resetearCarrito(e){
    e.preventDefault(); 
    numeritoContador.textContent=0; 
    limpiarHTMLDropdown(); 

    //Vaciar el arreglo de Artículos Carrito
    articulosCarrito = [];
    return; 
}


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

        `;
        // Agrega el html en el tbody
        tbodyProductosCarrito.appendChild(row);
    });
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

