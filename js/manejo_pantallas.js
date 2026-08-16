// js/main.js - Director de orquesta para la carga de pantallas

async function cargarVista(nombreVista) {
    const root = document.getElementById('root');
    try {
        const respuesta = await fetch(`screens/${nombreVista}.html`);
        if (!respuesta.ok) {
            throw new Error(`No se pudo cargar la vista: ${nombreVista}`);
        }
        const contenidoHTML = await respuesta.text();
        root.innerHTML = contenidoHTML;
    } catch (error) {
        console.error("Error en cargarVista:", error);
        root.innerHTML = "<p>Error al cargar la pantalla.</p>";
    }
}

// Al abrir o refrescar la página, verificamos si hay una sesión activa en Supabase
window.addEventListener('load', async () => {
    if (typeof dbClient === 'undefined') {
        console.error("Error crítico: dbClient no está definido. Revisa config.js");
        return;
    }

    try {
        const { data: { session }, error } = await dbClient.auth.getSession();
        
        if (error) throw error;

        if (session) {
            // Si el usuario ya inició sesión, cargamos el panel
            await cargarVista('homeworks'); 
        } else {
            // Si no hay sesión, mostramos el login
            await cargarVista('login'); 
        }
    } catch (err) {
        console.error("Error al verificar la sesión:", err.message);
        await cargarVista('login');
    }
});