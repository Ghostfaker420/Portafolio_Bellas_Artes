/**
 * gallery-tabs.js - Manejo de las pestañas de la galería
 */

document.addEventListener('DOMContentLoaded', () => {
    // Obtener todos los botones de las pestañas y las colecciones
    const tabButtons = document.querySelectorAll('.gallery-tab');
    const collections = document.querySelectorAll('.gallery-collection');

    // Función para cambiar la colección activa
    function switchCollection(collectionId) {
        // Remover la clase active de todas las colecciones
        collections.forEach(collection => {
            collection.classList.remove('active');
        });

        // Remover la clase active de todos los botones
        tabButtons.forEach(button => {
            button.classList.remove('active');
        });

        // Activar la colección seleccionada
        const selectedCollection = document.getElementById(collectionId);
        const selectedButton = document.querySelector(`[data-collection="${collectionId}"]`);
        
        if (selectedCollection && selectedButton) {
            selectedCollection.classList.add('active');
            selectedButton.classList.add('active');
        }
    }

    // Agregar event listeners a los botones
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const collectionId = button.getAttribute('data-collection');
            switchCollection(collectionId);
        });
    });
});