function navigate(targetView, buttonElement) {
    // 1. Desactivar todos los botones de la barra lateral
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Activar el botón que el usuario presionó
    buttonElement.classList.add('active');

    // 2. Controlar qué panel se muestra
    const viewTareas = document.getElementById('view-tareas');
    const viewDesarrollo = document.getElementById('view-desarrollo');
    const devTitle = document.getElementById('dev-title');

    if (targetView === 'tareas') {
        // Si eligen tareas, muestra el panel completo
        viewDesarrollo.classList.remove('active');
        viewTareas.classList.add('active');
    } else {
        // Si eligen otra opción, oculta tareas y muestra el aviso de desarrollo
        viewTareas.classList.remove('active');
        
        // Formatear el nombre estéticamente
        const formattedTitle = targetView.replace('-', ' ');
        devTitle.textContent = formattedTitle.charAt(0).toUpperCase() + formattedTitle.slice(1) + " (En desarrollo)";
        
        viewDesarrollo.classList.add('active');
    }
}