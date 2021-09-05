import { obtenerCodigos } from './API.js';

//Variables 
const resultado = document.querySelector('.resultado');
const formulario = document.querySelector('#formulario');
const errores = document.querySelector('.errores');

//Eventos
eventListeners()

function eventListeners() {
    document.addEventListener('DOMContentLoaded', obtenerCodigos);
    formulario.addEventListener('submit', validarFormulario);
}

function validarFormulario(e) {
    e.preventDefault();
    let paisSeleccionado = '';
    const ciudad = document.querySelector('#ciudad');
    const paises = document.querySelectorAll('#flag').forEach(pais => {
        if (pais.checked) {
            paisSeleccionado = pais.dataset.code;
        }
    });

    //validaciones

    const validar = validaciones(ciudad.value, paisSeleccionado);
    if (validar) {
        //Este html es para el cargador
        let html = `<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`
        resultado.innerHTML = html;
        obtenerApi(ciudad.value, paisSeleccionado);
    } else {
        console.log('Algo paso');
    }

}

function mostrarError(mensaje) {
    errores.classList.add('error');
    errores.innerHTML = mensaje;
    setTimeout(() => {
        errores.classList.remove('error');
        errores.innerHTML = '';
    }, 3000)
}

function validaciones(ciudad, pais) {
    //const soloLetras = new RegExp('^[A-Z]+$', 'i');
    const existe = document.querySelector('.error');
    if (!existe) {
        if (ciudad === '' && pais === '') {
            mostrarError('Debe ingresar una ciudad y seleccionar un país');
            return false;
        }
        if (ciudad === '') {
            mostrarError('Debe ingresar una ciudad valida');
            return false;
        }
        /* if (!soloLetras.test(ciudad)) {
             mostrarError('Ciudad solo acepta letras');
             return false;
         }*/
        if (Number(ciudad)) {
            mostrarError('No debe ingresar numeros en la ciudad');
            return false;
        }
        if (pais === '') {
            mostrarError('Debe seleccionar un país');
            return false;
        }
        return true;
    }
}

//--Trabajando con la API--//
function obtenerApi(ciudad, pais) {

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

function kelvinAcentigrado(temperatura) {
    return Math.trunc(temperatura - 273.15);
}