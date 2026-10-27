const { validarDatosRegistro, validarDatosLogin } = require('./google');

describe('Pruebas Unitarias - Validación de Registro en Sistemy', () => {
    
    test('1. Debería retornar error si hay campos vacíos', () => {
        const resultado = validarDatosRegistro("", "usuario@test.com", "123456");
        expect(resultado.valido).toBe(false);
        expect(resultado.error).toBe("Por favor, no dejes campos vacíos.");
    });

    test('2. Debería retornar error si el usuario tiene caracteres no permitidos (ej. espacios o inyecciones)', () => {
        // Intento 1: Inyectar una etiqueta HTML/Script
        const pruebaScript = validarDatosRegistro("<script>hacker</script>", "test@test.com", "123456");
        expect(pruebaScript.valido).toBe(false);
        expect(pruebaScript.error).toBe("El usuario solo puede contener letras, números, guiones o guiones bajos.");

        // Intento 2: Espacio en blanco en el nombre de usuario
        const pruebaEspacio = validarDatosRegistro("Juan Perez", "juan@test.com", "123456");
        expect(pruebaEspacio.valido).toBe(false);
        expect(pruebaEspacio.error).toBe("El usuario solo puede contener letras, números, guiones o guiones bajos.");
    });

    test('3. Debería retornar error si el nombre de usuario es muy corto', () => {
        const resultado = validarDatosRegistro("Ana", "ana@test.com", "123456");
        expect(resultado.valido).toBe(false);
        expect(resultado.error).toBe("El nombre de usuario es muy corto (mín. 4).");
    });

    test('4. Debería retornar error si el correo no tiene un formato válido', () => {
        const resultado = validarDatosRegistro("Usuario_Valido", "correosin_arroba.com", "123456");
        expect(resultado.valido).toBe(false);
        expect(resultado.error).toBe("Ingresa un correo electrónico válido (ejemplo@correo.com).");
    });

    test('5. Debería retornar error si la contraseña es muy corta', () => {
        const resultado = validarDatosRegistro("Usuario_Valido", "correo@test.com", "123");
        expect(resultado.valido).toBe(false);
        expect(resultado.error).toBe("La contraseña debe tener mínimo 6 caracteres.");
    });

    test('6. Debería retornar error si la contraseña tiene espacios en blanco', () => {
        const resultado = validarDatosRegistro("Usuario_Valido", "correo@test.com", "123 456");
        expect(resultado.valido).toBe(false);
        expect(resultado.error).toBe("La contraseña no puede contener espacios en blanco.");
    });

    test('7. Debería aceptar datos que cumplen todas las reglas (incluyendo guiones)', () => {
        const resultado = validarDatosRegistro("User-Pro_123", "correo@test.com", "secreta123!");
        expect(resultado.valido).toBe(true);
        expect(resultado.error).toBeNull();
    });

});

describe('Pruebas Unitarias - Validación de Login en Sistemy', () => {
    
    test('1. Debería retornar error si hay campos vacíos', () => {
        const resultado = validarDatosLogin("", "123456");
        expect(resultado.valido).toBe(false);
        expect(resultado.error).toBe("Por favor, ingresa tu correo y contraseña.");
    });

    test('2. Debería retornar error si el formato del correo no es válido', () => {
        const resultado = validarDatosLogin("juan_arroba_test.com", "123456");
        expect(resultado.valido).toBe(false);
        expect(resultado.error).toBe("El formato del correo no es válido.");
    });

    test('3. Debería retornar error si la contraseña tiene espacios', () => {
        const resultado = validarDatosLogin("correo@test.com", "pass word");
        expect(resultado.valido).toBe(false);
        expect(resultado.error).toBe("La contraseña no puede contener espacios.");
    });

    test('4. Debería aceptar credenciales con el formato correcto', () => {
        const resultado = validarDatosLogin("correo@test.com", "secreta123!");
        expect(resultado.valido).toBe(true);
        expect(resultado.error).toBeNull();
    });

});