//LLamamos al botón
const btnTranslate = document.querySelector("#btnTranslate");

//Evento
btnTranslate.addEventListener("click", async () => {
    const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';

    // Texto de la página
    const todoElTexto = document.body.textContent;

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': 'c5e6cadc16msh3f7d3981b9def34p1ace02jsn51cb288975a3',
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        },
        body: new URLSearchParams({
            q: todoElTexto,
            target: 'es',
            source: 'en'
        })
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
});
