async function registrarUsuario() {
    const nameVal = document.getElementById('name-3').value.trim();
    const emailVal = document.getElementById('email-3').value.trim();
    const passVal = document.getElementById('pass-3').value.trim();

    // 1. Validar campos vacíos
    if (nameVal === "" || emailVal === "" || passVal === "") {
        mostrarError("Por favor, no dejes campos vacíos.");
        return;
    }

    // 2. Validar espacios en blanco
    if (/\s/.test(nameVal) || /\s/.test(emailVal) || /\s/.test(passVal)) {
        mostrarError("Los campos no pueden contener espacios en blanco.");
        return;
    }

    // 3. Validar longitud mínima
    if (nameVal.length < 4 || passVal.length < 6) {
        mostrarError("El usuario (mín. 4) o la contraseña (mín. 6) son muy cortos.");
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

    // 1. Validar campos vacíos
    if (userVal === "" || passVal === "") {
        mostrarError("Por favor, no dejes campos vacíos.");
        return;
    }

    // 2. Validar espacios en blanco
    if (/\s/.test(userVal) || /\s/.test(passVal)) {
        mostrarError("Los campos no pueden contener espacios en blanco.");
        return;
    }

    const { data, error } = await dbClient.auth.signInWithPassword({
        email: userVal,
        password: passVal
    });

    if (error) {
        mostrarError("Credenciales incorrectas o usuario no encontrado.");
        return;
    }
    
    mostrarExito("¡Registro exitoso! Redirigiendo...");
    
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
