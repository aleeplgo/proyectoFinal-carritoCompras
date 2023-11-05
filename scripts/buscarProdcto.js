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
    console.log(inptSearch.value.trim());
    if(inptSearch.value !== ""){
        Swal.fire({
            title: `${inptSearch.value.trim()}`,
            text: `¡Está disponible en el catálogo!`,
            icon: 'success',
          }); 
          limpiarInput(); 
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops... Algo salió mal',
            text: 'Recuerda que no puedes dejar campos vacíos para poder implementar la búsqueda',
            footer: '<a href="">¿Por qué tengo este problema?</a>'
        })
    }
}


function limpiarInput(){
    inptSearch.value=""; 
}