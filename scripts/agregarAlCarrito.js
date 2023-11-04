/*VARIABLES*/
const btnAgregarCarrito = document.querySelectorAll(".agregar-carrito"); 
const numeritoContador = document.querySelector(".contador"); 
console.log(numeritoContador);
eventsToCart(); 

/*EVENTOS*/
function eventsToCart(){
    //console.log(btnAgregarCarrito);
    //Cuando son varios botones se agrega: 
    //Esto se hace porque cuando seleccionas diferentes elementos con la misma clase se hace un arreglo NodeList y hay que recorrerlo
    for(const btn of btnAgregarCarrito){
        btn.addEventListener("click", agregarAlCarrito); 
    }
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
           // gravity: "top", // `top` or `bottom`
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
    
    console.log("Producto agregado al carrito");
}

function sumarContador() {
    let suma = Number(numeritoContador.textContent) || 0; // Obtén el valor actual del contador y conviértelo a un número
    suma += 1;
    return suma;
}
