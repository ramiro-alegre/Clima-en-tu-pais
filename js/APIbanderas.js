//--Api para obtener las imagenes de las banderas--//
const url = 'https://flagcdn.com/es/codes.json';

export const obtenerCodigos = async() => {
    try {
        const resultado = await fetch(url);
        const respuesta = await resultado.json();
        dibujarBanderas(respuesta);
    } catch (error) {
        throw error;
    }

}

const dibujarBanderas = (codigos) => {
    const banderas = document.querySelector('.banderas');
    for (let i in codigos) {
        const imagen = document.createElement('img');
        const input = document.createElement('input');

        //Atributos de los input
        input.type = 'radio';
        input.name = 'bandera';
        input.id = 'flag';
        input.dataset.code = i;

        //Atributos de las imagenes
        imagen.src = `https://flagcdn.com/60x45/${i}.png`;
        imagen.srcset = `https://flagcdn.com/120x90/${i}.png 2x, https://flagcdn.com/180x135/${i}.png 3x`;
        imagen.width = 60;
        imagen.height = 45;
        imagen.classList.add('bandera');
        imagen.alt = codigos[i];
        imagen.title = codigos[i];
        imagen.onclick = () => input.checked = true;


        banderas.appendChild(imagen);
        banderas.appendChild(input);
    }



}