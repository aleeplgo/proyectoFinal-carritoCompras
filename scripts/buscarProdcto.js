const formularioBuscador = document.querySelector("#formularioBuscador"); 
const inptSearch = document.querySelector("#inptSearch"); 
const btnSearch = document.querySelector("#btnSearch"); 

//Eventos
eventsFormSearch();
function eventsFormSearch(){
    formularioBuscador.addEventListener("submit", buscarProducto); 
}


function buscarProducto(e){
    e.preventDefault(); 
    const searchTerm = inptSearch.value.trim().toUpperCase();
    if(searchTerm !== ""){
        const productosEnLocalStorage = JSON.parse(localStorage.getItem('productos')) || [];
        const resultado = productosEnLocalStorage.filter(producto => producto.name.toUpperCase().includes(searchTerm));
        if(resultado.length > 0){
            Swal.fire({
                title: `${searchTerm}`,
                text: `¡Está disponible en el catálogo!`,
                icon: 'success',
            }); 
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Producto no encontrado',
                text: 'El producto que estás buscando no está en el catálogo',
            });
        }
        limpiarInput(); 
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops... Algo salió mal',
            text: 'Recuerda que no puedes dejar campos vacíos para poder implementar la búsqueda',
/*             footer: '<a href="">¿Por qué tengo este problema?</a>'
 */        });
    }
}

function limpiarInput(){
    inptSearch.value = ""; 
}