const errores = document.querySelector('.errores');

export function mostrarError(mensaje) {
    errores.classList.add('error');
    errores.innerHTML = mensaje;
    setTimeout(() => {
        errores.classList.remove('error');
        errores.innerHTML = '';
    }, 3000)
}

export function validaciones(ciudad, pais) {
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

export function kelvinAcentigrado(temperatura) {
    return Math.trunc(temperatura - 273.15);
}