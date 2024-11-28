let pagina = 1; // Variable para rastrear la página actual de resultados

// Referencias a los botones de navegación en el DOM
const btnAnterior = document.getElementById('btnAnterior'); // Botón para ir a la página anterior
const btnSiguiente = document.getElementById('btnSiguiente'); // Botón para ir a la página siguiente

// Evento para el botón "Siguiente"
btnSiguiente.addEventListener('click', () => {
    if (pagina < 1000) { //no superar las 1000 páginas
    pagina += 1; // Incrementar página
    cargarPeliculas(); // Actualizar las pelis
    }
});

// boton de anterior
btnAnterior.addEventListener('click', () => {
    if (pagina > 1) { // no ir despues de la pagina 1
        pagina -= 1; // Decrementar la página
        cargarPeliculas(); // Actualizar las pelís
    }
});


const cargarPeliculas = async () => {
    try {
        // fetch realiza una solicitud a la API con idioma 
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${pagina}`);
        
        console.log(respuesta); // arrojamos "respuesta"

        //si la respuesta es exitosa:
        if (respuesta.status === 200) {
           
            const datos = await respuesta.json();

            let peliculas = ''; 

           
            datos.results.forEach(pelicula => {
                peliculas += `
                    <div class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}"> <!-- Imagen del cartel -->
                        <h3 class="titulo">${pelicula.title}</h3> <!-- Título de la película -->
                    </div>
                `;
            });

         
            document.getElementById('contenedor').innerHTML = peliculas;

        } else if (respuesta.status === 401) {
            // error de autenticacion
            console.log('error en la llave');
        } else if (respuesta.status === 404) {
            // sin resultados
            console.log('Pelicula no encontrada');
        } else {
            // Otros errores no manejados específicamente
            console.log('Error desconocido');
        }

    } catch (error) {
        // try catch de captura
        console.log(error); // Mostrar el error 
    }
}


cargarPeliculas();
