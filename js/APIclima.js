import { kelvinAcentigrado } from "./funciones.js";
//Se declara resultado para poder mostrar los datos en la pagina
const resultado = document.querySelector('.resultado');


//--Trabajando con la API--//
export function obtenerApi(ciudad, pais) {

    const apiId = 'f66e9c7e8af016d5b1e40650dc51de05';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiId}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {

            if (datos.cod === "404") {
                let html = '<p class="resultado__texto">Debe escribir su ciudad y seleccionar su país</p>'
                resultado.innerHTML = html;
                console.log(datos);
                mostrarError('Ciudad no encontrada');
                return;
            }
            mostrarDatos(datos);
        })
}

function mostrarDatos(datos) {
    const { name, main: { temp, temp_max, temp_min } } = datos;

    let html = ` <p class="resultado__ciudad">${name}</p>
    <p class="resultado__temperatura">${kelvinAcentigrado(temp)}°C</p>
    <p class="resultado__maxima">Max: ${kelvinAcentigrado(temp_max)}°C</p>
    <p class="resultado__minima">Min: ${kelvinAcentigrado(temp_min)}°C</p>`

    resultado.innerHTML = html;
}