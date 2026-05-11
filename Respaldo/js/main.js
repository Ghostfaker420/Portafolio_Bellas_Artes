/**
 * Portafolio con Tours 360° - main.js
 * Archivo principal para la inicialización del visor 360°.
 */
let viewer = null;
let panoramaViewer = null;
let panoramaLoaded = false;

// Datos de ejemplo para proyectos
const projects = [
    {
        title: 'Título del Proyecto',
        description: 'Descripción del proyecto',
        image: 'images/nombre-imagen.jpg',
        link: 'URL-del-proyecto'
    },
];

// Datos de ejemplo para tours 360°
const tours = [
    {
        title: 'Tour Virtual 1',
        description: 'Primer tour virtual de ejemplo',
        panorama: 'images/360_1.jpg',
        hotspots: [
            { pitch: 0, yaw: 0, text: 'Punto de interés 1' },
            { pitch: 10, yaw: 90, text: 'Punto de interés 2' }
        ]
    },
    {
        title: 'Tour Virtual 2',
        description: 'Descripción del tour virtual 2',
        panorama: 'images/tour2.jpg',
        hotspots: [
            { pitch: -10, yaw: 180, text: 'Punto de interés 1' },
            { pitch: 5, yaw: 270, text: 'Punto de interés 2' }
        ]
    }
];

// Inicializar el visor 360° con optimizaciones para mayor estabilidad
function initViewer() {
    console.log("Iniciando visor 360° optimizado...");

    // Esperar a que las bibliotecas se carguen completamente
    window.addEventListener('load', function() {
        try {
            // Comprobar si la biblioteca está cargada
            if (typeof PANOLENS === 'undefined' || typeof THREE === 'undefined') {
                console.error("Error: Las bibliotecas necesarias no están cargadas correctamente.");
                document.getElementById('pano').innerHTML = 
                    '<div style="color: white; text-align: center; padding: 20px; background-color: rgba(0,0,0,0.7);">' +
                    'Error: No se pudieron cargar las bibliotecas necesarias. Por favor, recarga la página.' +
                    '</div>';
                return;
            }
        
        // Verificar que el contenedor existe
        const container = document.getElementById('pano');
        if (!container) {
            console.error("No se encontró el contenedor #pano");
            return;
        }
        
        // Mostrar indicador de carga
        container.innerHTML = '<div class="loading-indicator"></div>';
        
        // Crear el visor con configuración optimizada
        panoramaViewer = new PANOLENS.Viewer({
            container: container,
            autoRotate: false, // Desactivar rotación automática para mayor estabilidad
            controlBar: true,
            controlButtons: ['fullscreen'],
            cameraFov: 80, // Reducir FOV para mejor rendimiento
            output: 'console', // Reducir logs para mejor rendimiento
            initialLookAt: new THREE.Vector3(0, 0, 5) // Establecer vista inicial
        });
        
        // Cargar imagen panorámica con manejo de errores mejorado
        const fallbackImage = 'images/tour2.jpg.svg'; // Imagen de respaldo
        let panoramaUrl = tours[0].panorama;
        
        // Verificar si la imagen existe antes de cargarla
        const img = new Image();
        img.onload = function() {
            // La imagen existe, cargar panorama
            loadPanorama(panoramaUrl, container);
        };
        img.onerror = function() {
            // La imagen no existe, usar fallback
            console.warn('No se pudo cargar la imagen panorámica original, usando fallback');
            loadPanorama(fallbackImage, container);
        };
        img.src = panoramaUrl;
    } catch (error) {
        console.error("Error al inicializar el visor:", error);
    }
}

// Cargar imagen panorámica con manejo de errores mejorado
function loadPanorama(panoramaUrl, container) {
    panoramaLoaded = true;
    
    // Asegurarse de que la vista está lista
    if (panoramaViewer && viewer) {
        try {
            viewer.stop();
            panoramaViewer.loadImage(panoramaUrl);
        } catch (e) {
            console.warn("Error al cargar panorama, usando fallback:", e);
            loadPanorama(fallbackImage, container);
        }
    }
}

// Inicializar el visor 360° con optimizaciones para mayor estabilidad
initViewer();