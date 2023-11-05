/* Enlazamos las variables*/
//Formulario de Registro 
const fomRegister = document.querySelector("#fomRegister"); 
const inptEmailRegister = document.querySelector("#inptEmailRegister");
const pswdRegister = document.querySelector("#pswdRegister");
const alerta = document.querySelector(".alerta");
const datos = document.querySelector(".datos"); 

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
            /* alerta.textContent = "Este correo electrónico ya está registrado";
            alerta.style.color = "red";
            alerta.style.border = "3px solid red"; */
            Swal.fire({
                title: `¡No hemos podido registrarte`,
                text: `Verifica los datos ingresados`,
                icon: 'error',
            });

        } else {
            //Almacenar cada usuario en una lista con el spreed operator
            listaUsuarios = [...listaUsuarios, user];         
            localStorage.setItem(user.email,user.password);
            /* alerta.textContent = "Gracias te has registrado correctamente";
            alerta.style.color = "#15bd3f";
            alerta.style.border = "3px solid #15bd3f"; */
            
            Swal.fire({
                title: `¡Te has registrado correctamente. Email: ${emailValueForm}. Password: ${passwordValueForm}.`,
                text: `Guarda tus datos en un lugar seguro.`,
                icon: 'success',
            });
            
           /*  datos.textContent = `
            Email: ${emailValueForm}. 

            Password: ${passwordValueForm}. 

            No olvides guardarlos en un lugar seguro.`;
            */
            datos.style.color = "#262026";
            datos.style.border = "3px solid #262026";

            // Limpiar los datos del formulario
            inptEmailRegister.value = '';
            pswdRegister.value = '';

            // Configurar un temporizador para ocultar la alerta después de 3 segundos
            setTimeout(function () {
                alerta.style.display = 'none';
            }, 3000);

            // Configurar un temporizador para ocultar los datos después de 5 segundos
            setTimeout(function () {
                datos.style.display = 'none';
            }, 6000);
            
        }
       
    }
}





//localStorage.removeItem("usuario");
//localStorage.removeItem("password");
//localStorage.clear(); //Todo lo elimina
//admin@mitienda.com editor@mitienda.com