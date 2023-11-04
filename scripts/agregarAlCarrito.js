/*VARIABLES*/
const btnAgregarCarrito = document.querySelectorAll(".agregar-carrito"); 
const numeritoContador = document.querySelector(".contador"); 
const btnVaciarCarrito = document.querySelector("#vaciarCarrito"); 
const cardProduct = document.querySelector(".card"); 
const listaCarrito = document.querySelector("#lista-carrito");
console.log(cardProduct);
console.log(listaCarrito);

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

    if(btnAgregarCarrito){

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
    let borrar = numeritoContador.textContent=0; 
    return borrar; 
}
