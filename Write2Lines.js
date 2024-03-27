//Spanish Language. Gracias por visitar. Disfruta el código compañero!

document.addEventListener('DOMContentLoaded', () => {
    // Verifica si la configuración está definida
    if (typeof configuracion !== 'undefined') {
        const textos = [configuracion['line-1'], configuracion['line-2']];
        let textoActual = textos[0];
        let index = 0;
        let reverse = false;
        let currentTextIndex = 0;
        let isWaiting = false;

        const updateText = () => {
            if (!isWaiting) {
                if (!reverse) {
                    // Muestra el texto letra por letra
                    document.body.innerText = textoActual.slice(0, index);
                    index++;
                } else {
                    // Borra el texto letra por letra
                    document.body.innerText = textoActual.slice(0, index);
                    index--;
                }

                // Si hemos mostrado todo el texto, prepárate para borrarlo después de una pausa
                if (index > textoActual.length && !reverse) {
                    isWaiting = true;
                    setTimeout(() => {
                        isWaiting = false;
                        reverse = true;
                        index--;
                    }, 1000); // Espera 1 segundo
                }
                // Si hemos borrado todo el texto, cambia al siguiente texto o vuelve al primero
                else if (index < 0 && reverse) {
                    isWaiting = true;
                    setTimeout(() => {
                        isWaiting = false;
                        reverse = false; // Preparar para mostrar el nuevo texto
                        // Cambiar al siguiente texto
                        currentTextIndex = (currentTextIndex + 1) % textos.length;
                        textoActual = textos[currentTextIndex];
                        index = 0; // Reiniciar índice para el nuevo texto
                    }, 1000); // Espera 1 segundo
                }
            }
        };

        setInterval(updateText, 100);
    } else {
        console.error('La configuración no está definida.');
    }
});
