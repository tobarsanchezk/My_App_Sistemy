// Función para cambiar de pantalla
function switchScreen(targetScreenId) {
    const termsError = document.getElementById('terms-error-1');
    const formError = document.getElementById('form-error-msg');
    if (termsError) termsError.style.display = 'none';
    if (formError) formError.style.display = 'none';

    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });

    const target = document.getElementById(targetScreenId);
    if (target) {
        target.classList.add('active');
    }
}

// Validación de términos en pantalla 1
function handleRegisterClick() {
    const termsChecked = document.getElementById('terms').checked;
    const termsError = document.getElementById('terms-error-1');

    if (!termsChecked) {
        if (termsError) termsError.style.display = 'block';
        return;
    }

    if (termsError) termsError.style.display = 'none';
    switchScreen('screen-4');
}

// Mostrar / Ocultar contraseña
function togglePass(element) {
    const input = element.previousElementSibling;
    const svg = element.querySelector('svg');
    
    if (input.type === "password") {
        input.type = "text";
        svg.innerHTML = '<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/><line x1="2" y1="2" x2="22" y2="22" stroke="#000000" stroke-width="2" stroke-linecap="round"/>';
    } else {
        input.type = "password";
        svg.innerHTML = '<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>';
    }
}

function mostrarError(mensaje) {
    const errorDiv = document.getElementById('form-error-msg');
    if (errorDiv) {
        errorDiv.innerText = mensaje;
        errorDiv.style.display = 'block';
        setTimeout(() => { errorDiv.style.display = 'none'; }, 4000);
    }
}

function mostrarExito(mensaje) {
    // Si ya tienes un contenedor específico para mensajes, úsalo. 
    // Aquí usamos el mismo principio visual que tu error pero con estilo de éxito (verde).
    const errorDiv = document.getElementById('terms-error-1'); // O el ID de tu contenedor de alertas
    
    if (errorDiv) {
        errorDiv.textContent = mensaje;
        errorDiv.style.backgroundColor = "#155724"; // Fondo verdecito
        errorDiv.style.color = "#d4edda";           // Texto verde oscuro
        errorDiv.style.borderColor = "#c3e6cb";     // Borde sutil
        errorDiv.style.display = "block";
        
        // Ocultar automáticamente después de 4 segundos
        setTimeout(() => {
            errorDiv.style.display = "none";
        }, 4000);
    } else {
        // Fallback por si acaso el contenedor no existe con ese ID exacto
        console.log("Éxito: ", mensaje);
    }
}
