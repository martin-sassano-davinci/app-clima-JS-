const form = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');
const container = document.querySelector('.container');

window.addEventListener('load', ()=>{
    form.addEventListener('submit', buscarClima);
})

function buscarClima(e) {
    e.preventDefault();

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === '' || pais === '') {
        mostrarError('Todos los campos son obligatorios');
    }
    consultarApi(ciudad, pais);
}

function consultarApi(ciudad, pais) {
    const apiKey = '56c8ceab81061b372c52b2544de29000';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;
    spinner();
    fetch(apiUrl)
    .then((resultado)=> resultado.json())
    .then((datos)=> {
    if (datos.cod === '404') {
        mostrarError('Ciudad no encontrada');
        console.log(datos);
    } else {
        console.log(datos);
        mostrarClima(datos);
    }
    });
}

function mostrarClima(datos) {
    const { name, main: { temp, temp_max, temp_min } } = datos;

    const pais = document.querySelector('#pais').value;

    limpiarHTML();
    const celcius = kelvinACelcius(temp);
    const maxima = kelvinACelcius(temp_max);
    const minima = kelvinACelcius(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.classList.add('font-bold', 'text-2xl');
    nombreCiudad.textContent = `Clima en ${name}, ${pais} `;
    const tempActual = document.createElement('p');
    tempActual.classList.add('font-bold', 'text-6xl');
    tempActual.innerHTML = `${celcius} &#8451`;

    const tempMax = document.createElement('p');
    tempMax.classList.add('text-xl');
    tempMax.innerHTML = `Max: ${maxima} &#8451`;

    const tempMin = document.createElement('p');
    tempMin.classList.add('text-xl');
    tempMin.innerHTML = `Min: ${minima} &#8451`;

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(tempActual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);

    resultado.appendChild(resultadoDiv);
}

const kelvinACelcius = grados => parseInt(grados - 273.15);

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}
function spinner() {
    limpiarHTML();
    
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle')
    divSpinner.innerHTML = `
    
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
  
    `;
    resultado.appendChild(divSpinner);
}
function mostrarError(mensaje) {

    const alerta = document.querySelector('.bg-red-100');
    

    if (!alerta) {

        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
        <strong class='font-bold'>Error!</strong>
        <span class='block'>${mensaje}</span>
        `;
    
        container.appendChild(alerta);
        setTimeout(() => {
            
            alerta.remove();
        }, 5000);
    }

    
   
}

