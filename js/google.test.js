// js/google.test.js
const { validarDatosRegistro } = require('./google');

describe('Pruebas Unitarias - Validación de Registro en Sistemy', () => {
    
    test('1. Debería retornar error si hay campos vacíos', () => {
        const resultado = validarDatosRegistro("", "usuario@test.com", "123456");
        expect(resultado.valido).toBe(false);
        expect(resultado.error).toBe("Por favor, no dejes campos vacíos.");
    });

    test('2. Debería retornar error si hay espacios en blanco', () => {
        const resultado = validarDatosRegistro("Juan Perez", "juan@test.com", "123456");
        expect(resultado.valido).toBe(false);
        expect(resultado.error).toBe("Los campos no pueden contener espacios en blanco.");
    });

    test('3. Debería retornar error si el nombre o contraseña son muy cortos', () => {
        const resultado = validarDatosRegistro("Ana", "ana@test.com", "123");
        expect(resultado.valido).toBe(false);
        expect(resultado.error).toBe("El usuario (mín. 4) o la contraseña (mín. 6) son muy cortos.");
    });

    test('4. Debería aceptar datos que cumplen todas las reglas', () => {
        const resultado = validarDatosRegistro("Usuario_Valido", "correo@test.com", "secreta123");
        expect(resultado.valido).toBe(true);
        expect(resultado.error).toBeNull();
    });

    test('5. Debería bloquear inyecciones de código y caracteres especiales', () => {
    // Intento 1: Inyectar una etiqueta HTML/Script
    const pruebaScript = validarDatosRegistro("<script>hacker</script>", "test@test.com", "123456");
    expect(pruebaScript.valido).toBe(false);
    expect(pruebaScript.error).toBe("El usuario solo puede contener letras, números y guiones bajos (_).");

    // Intento 2: Inyectar formato JSON o SQL
    const pruebaJson = validarDatosRegistro("{rol:admin}", "test@test.com", "123456");
    expect(pruebaJson.valido).toBe(false);
    expect(pruebaJson.error).toBe("El usuario solo puede contener letras, números y guiones bajos (_).");
    });

});