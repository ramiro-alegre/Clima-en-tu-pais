import { obtenerCodigos } from './APIbanderas.js';
import { mostrarError, validaciones } from './funciones.js';
import { obtenerApi } from './APIclima.js'

//Variables 
const formulario = document.querySelector('#formulario');
//Se declara resultado para poder utilizar la animación de carga
const resultado = document.querySelector('.resultado');

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
    }

}