// Nueva función pura para evaluar en Jest
function validarDatosLogin(emailVal, passVal) {
    // 1. Campos vacíos
    if (emailVal === "" || passVal === "") {
        return { valido: false, error: "Por favor, ingresa tu correo y contraseña." };
    }

    // 2. Formato de correo válido
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(emailVal)) {
        return { 
            valido: false, 
            error: "El formato del correo no es válido." 
        };
    }

    // 3. Espacios en la contraseña (asumiendo que no los permites)
    if (/\s/.test(passVal)) {
        return { valido: false, error: "La contraseña no puede contener espacios." };
    }

    return { valido: true, error: null };
}

// Función para evaluar el registro en Jest (ESTA ES LA QUE FALTA)
function validarDatosRegistro(nameVal, emailVal, passVal) {
    // 1. Campos vacíos
    if (nameVal === "" || emailVal === "" || passVal === "") {
        return { valido: false, error: "Por favor, no dejes campos vacíos." };
    }

    // 2. Validación de usuario (letras, números, guiones, sin espacios)
    const regexUsuario = /^[a-zA-Z0-9_-]+$/;
    if (!regexUsuario.test(nameVal)) {
        return { 
            valido: false, 
            error: "El usuario solo puede contener letras, números, guiones o guiones bajos." 
        };
    }
    if (nameVal.length < 4) {
        return { valido: false, error: "El nombre de usuario es muy corto (mín. 4)." };
    }

    // 3. Validación de correo (formato estándar con @ y .)
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(emailVal)) {
        return { 
            valido: false, 
            error: "Ingresa un correo electrónico válido (ejemplo@correo.com)." 
        };
    }

    // 4. Validación de contraseña (longitud mínima y sin espacios)
    if (passVal.length < 6) {
        return { valido: false, error: "La contraseña debe tener mínimo 6 caracteres." };
    }
    if (/\s/.test(passVal)) {
        return { valido: false, error: "La contraseña no puede contener espacios en blanco." };
    }

    return { valido: true, error: null };
}

// 2. FUNCIÓN ORIGINAL ACTUALIZADA
async function registrarUsuario() {
    const nameVal = document.getElementById('name-3').value.trim();
    const emailVal = document.getElementById('email-3').value.trim();
    const passVal = document.getElementById('pass-3').value.trim();

    // 3. Usamos la nueva función para validar
    const validacion = validarDatosRegistro(nameVal, emailVal, passVal);
    
    if (!validacion.valido) {
        mostrarError(validacion.error);
        return;
    }

    // 4. Crear el usuario en auth.users
    const { data: authData, error: authError } = await dbClient.auth.signUp({
        email: emailVal,
        password: passVal
    });

    if (authError) {
        // Evaluamos el error de Supabase aquí mismo
        if (authError.message.toLowerCase().includes("already registered")) {
            mostrarError("error este usuario ya existe");
        } else {
            mostrarError("Error al registrar: " + authError.message);
        }
        return;
    }

    // 5. Insertar el perfil en tu tabla 'profiles' usando el mismo ID
    const { error: profileError } = await dbClient
        .from('profiles')
        .insert([
            { id: authData.user.id, username: nameVal }
        ]);

    if (profileError) {
        mostrarError("Usuario creado, pero hubo un error al guardar el perfil, revisa tu correo o inicia sesion.");
        return;
    }

    // 6. Éxito total con mensaje visual en lugar de alert
    mostrarExito("¡Registro exitoso! Redirigiendo...");
    
    // Esperamos un segundo para que el usuario alcance a leer el mensaje antes de cambiar de vista
    setTimeout(async () => {
        await cargarVista('homeworks');  
    }, 1500); 
}
    
async function iniciarSesion() {
    const userVal = document.getElementById('user-2').value.trim();
    const passVal = document.getElementById('pass-2').value.trim();

    // Usamos la nueva función para validar
    const validacion = validarDatosLogin(userVal, passVal);
    
    if (!validacion.valido) {
        mostrarError(validacion.error);
        return;
    }

    // Si pasa la validación local, ahora sí le preguntamos a Supabase
    const { data, error } = await dbClient.auth.signInWithPassword({
        email: userVal,
        password: passVal
    });

    if (error) {
        mostrarError("Credenciales incorrectas o usuario no encontrado.");
        return;
    }
    
    mostrarExito("Inicio exitoso Redirigiendo...");
    
    // Esperamos un segundo para que el usuario alcance a leer el mensaje antes de cambiar de vista
    setTimeout(async () => {
        await cargarVista('homeworks');  
    }, 1500); 
}

async function iniciarConGoogle() {
    const { data, error } = await dbClient.auth.signInWithOAuth({ provider: 'google' });
    if (error) {
        mostrarError("No se pudo iniciar con Google: " + error.message);
    }
}   

async function recuperarCuenta() {
    const email = document.getElementById('user-5').value;

    if (!email) {
        mostrarError("Por favor ingresa tu correo electrónico.");
        return;
    }

    const { data, error } = await dbClient.auth.resetPasswordForEmail(email, {
        // Redirige al usuario a tu entorno local tras hacer clic en el correo
    redirectTo: window.location.origin + '/index.html', 
    });

    if (error) {
        mostrarError("Hubo un problema al enviar el enlace.");
        console.error("Error de recuperación:", error.message);
    } else {
            mostrarExito("Si el correo está registrado, te enviamos un enlace de recuperación.");
    
    setTimeout(async () => {
        await switchScreen('screen-2');  
    }, 1500); 

    }

}

// recordatorio de que esta parte le dice a vs "Si me está leyendo Jest (el de las pruebas unitarias y demas), exporta mi función para la prueba; si me está leyendo el navegador, ignora esto y no te rompas".
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        validarDatosRegistro,
        validarDatosLogin,
        registrarUsuario,
        iniciarSesion,
        iniciarConGoogle,
        recuperarCuenta
    };
}