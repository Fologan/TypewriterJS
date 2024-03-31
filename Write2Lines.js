//notes in spanish language
document.addEventListener('DOMContentLoaded', () => {
    const contenedorPadre = document.querySelector('.w2l');
    const contenedorTexto = document.createElement('div');
    contenedorTexto.id = 'textoAnimado';
    contenedorTexto.style.minHeight = '1.5em';
    contenedorPadre.appendChild(contenedorTexto);

    // Asume configuracion ya definida en tu HTML
    const textos = Object.values(configuracion); // Convierte los valores del objeto a un array

    // Contenedor temporal para medir el ancho del texto
    const medidor = document.createElement('span');
    medidor.style.visibility = 'hidden'; // Posicionar fuera de la vista
    contenedorPadre.appendChild(medidor); // Asegurar que herede el estilo del contenedor padre

    let maxWidth = 0;
    textos.forEach(texto => {
        // Considera el texto completo para soportar frases o configuraciones multi-palabra
        medidor.innerText = texto;
        maxWidth = Math.max(maxWidth, medidor.offsetWidth + 3);
    });

    // Ajusta el minWidth del contenedorTexto basado en el maxWidth encontrado
    contenedorTexto.style.minWidth = `${maxWidth}px`;

    // Limpia el medidor del DOM
    contenedorPadre.removeChild(medidor);

    // Inicia la animación con la primera línea de texto
    let currentTextIndex = 0;
    let textoActual = textos[currentTextIndex];
    let index = 0;
    let reverse = false;
    let isWaiting = false;

    const updateText = () => {
        if (!isWaiting) {
            if (!reverse) {
                contenedorTexto.innerText = textoActual.slice(0, index);
                index++;
            } else {
                contenedorTexto.innerText = textoActual.slice(0, index);
                index--;
            }

            if (index > textoActual.length && !reverse) {
                isWaiting = true;
                setTimeout(() => {
                    isWaiting = false;
                    reverse = true;
                    index--;
                }, 1000); // Espera 1 segundo para mostrar texto
            } else if (index < 0 && reverse) {
                isWaiting = true;
                setTimeout(() => {
                    isWaiting = false;
                    reverse = false;
                    // Avanza al siguiente texto o vuelve al inicio
                    currentTextIndex = (currentTextIndex + 1) % textos.length;
                    textoActual = textos[currentTextIndex];
                    index = 0;
                }, 500); // Espera de .5 segundos para el cambio de linea
            }
        }
    };

    setInterval(updateText, 100);
});
