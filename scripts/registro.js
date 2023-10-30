/* Enlazamos las variables*/
const fomRegister = document.querySelector("#fomRegister"); 
const inptEmailRegister = document.querySelector("#inptEmailRegister");
const pswdRegister = document.querySelector("#pswdRegister");
const alerta = document.querySelector(".alerta"); 

//Almacenar cada usuario en una lista
let listaUsuarios = []; 

//Events Listeners

//Mandar a llamar las funciones
eventListeners(); 

function eventListeners(){
    fomRegister.addEventListener("submit",crearUsuario);
}

//Funciones
function crearUsuario(e){
    e.preventDefault(); 

    //Guardamos en variables los valores de cada input del formulario de registro
    const emailValueForm = inptEmailRegister.value.trim().toLowerCase();
    const passwordValueForm =  pswdRegister.value.trim();

    //Creamos función constructora (Prototipo de usuarios) 
    function registroUsuarios(email, password){   
        this.email = email; 
        this.password = password; 
    }

    //Almacenar cada value del form dentro de los usuarios 
    const user = new registroUsuarios(emailValueForm,passwordValueForm);

    
    if(user.password == "" && user.email==""){
        alerta.textContent = "Los campos no pueden quedar vacíos";
        alerta.style.color = "red";
        alerta.style.border = "3px solid red";
    } else {
        //Validar que no sean los mismos usuarios y correo electrónico
        if (localStorage.getItem(emailValueForm) !== null) {
            alerta.textContent = "Este correo electrónico ya está registrado";
            alerta.style.color = "red";
            alerta.style.border = "3px solid red";

        } else {
            //Almacenar cada usuario en una lista con el spreed operator
            listaUsuarios = [...listaUsuarios, user];         
            localStorage.setItem(user.email,user.password);
            alerta.textContent = "Gracias te has registrado correctamente";
            alerta.style.color = "#15bd3f";
            alerta.style.border = "3px solid #15bd3f";

            // Limpiar los datos del formulario
            inptEmailRegister.value = '';
            pswdRegister.value = '';

            // Configurar un temporizador para ocultar la alerta después de 3 segundos
            setTimeout(function () {
                alerta.style.display = 'none';
            }, 3000);
                }
       
    }
}





//localStorage.removeItem("usuario");
//localStorage.removeItem("password");
//localStorage.clear(); //Todo lo elimina