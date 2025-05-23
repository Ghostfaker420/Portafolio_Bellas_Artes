// Datos de ejemplo para proyectos
const projects = [
    {
        title: 'Proyecto 1',
        description: 'Descripción del proyecto 1',
        image: 'images/project1.jpg',
        link: '#'
    },
    {
        title: 'Proyecto 2',
        description: 'Descripción del proyecto 2',
        image: 'images/project2.jpg',
        link: '#'
    },
    // Agrega más proyectos según necesites
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
    // Agrega más tours según necesites
];

// Inicializar el visor 360°
let viewer = null;
let panoramaViewer = null;

function initViewer() {
    console.log("Iniciando visor 360°...");
    
    try {
        // Comprobar si la biblioteca está cargada
        if (typeof PANOLENS === 'undefined') {
            console.error("Error: PANOLENS no está definido. Verifica que la biblioteca se haya cargado correctamente.");
            document.getElementById('pano').innerHTML = 
                '<div style="color: white; text-align: center; padding: 20px; background-color: rgba(0,0,0,0.7);">' +
                'Error: No se pudo cargar la biblioteca PANOLENS. Por favor, recarga la página o verifica tu conexión a Internet.' +
                '</div>';
            return;
        }
        
        // Verificar que el contenedor existe
        const container = document.getElementById('pano');
        if (!container) {
            console.error("No se encontró el contenedor #pano");
            return;
        }
        
        console.log("Creando visor...");
        
        // Crear el visor primero
        panoramaViewer = new PANOLENS.Viewer({
            container: container,
            autoRotate: true,
            autoRotateSpeed: 0.3,
            controlBar: true,
            controlButtons: ['fullscreen', 'setting', 'video'],
            cameraFov: 90
        });
        
        console.log("Visor creado. Cargando imagen panorámica:", tours[0].panorama);
        
        // Crear el panorama
        viewer = new PANOLENS.ImagePanorama(tours[0].panorama);
        
        console.log("Panorama creado, agregando eventos...");
        
        // Manejar eventos
        viewer.addEventListener('load', function() {
            console.log("Panorama cargado correctamente");
            // Ocultar el indicador de carga cuando la imagen se carga correctamente
            const loadingIndicator = document.querySelector('.loading-indicator');
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
        });
        
        viewer.addEventListener('error', function(e) {
            console.error('Error al cargar la imagen panorámica:', e);
            container.innerHTML = 
                '<div style="color: white; text-align: center; padding: 20px; background-color: rgba(0,0,0,0.7);">' +
                'Error al cargar la imagen panorámica. Verifica que el archivo "' + tours[0].panorama + '" existe y es accesible.' +
                '</div>';
        });
        
        console.log("Agregando panorama al visor...");
        panoramaViewer.add(viewer);
        
        console.log("Visor inicializado correctamente");
        
    } catch (error) {
        console.error("Error al inicializar el visor:", error);
        document.getElementById('pano').innerHTML = 
            '<div style="color: white; text-align: center; padding: 20px; background-color: rgba(0,0,0,0.7);">' +
            'Error al inicializar el visor 360°. Error: ' + error.message + 
            '</div>';
    }
}

// Cargar proyectos en la cuadrícula
function loadProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.link}" class="project-link">Ver más</a>
        `;
        projectsGrid.appendChild(projectCard);
    });
}

// Cargar lista de tours
function loadTours() {
    const toursList = document.querySelector('.tours-list');
    
    tours.forEach((tour, index) => {
        const tourItem = document.createElement('div');
        tourItem.className = 'tour-item';
        tourItem.innerHTML = `
            <h3>${tour.title}</h3>
            <p>${tour.description}</p>
            <button onclick="loadTour(${index})" class="tour-button">Ver Tour</button>
        `;
        toursList.appendChild(tourItem);
    });
}

// Cargar un tour específico
function loadTour(index) {
    console.log("Cargando tour:", index);
    
    try {
        // Verificar que PANOLENS esté definido
        if (typeof PANOLENS === 'undefined') {
            console.error("Error: PANOLENS no está definido al cargar el tour.");
            return;
        }
        
        // Verificar que el contenedor existe
        const container = document.getElementById('pano');
        if (!container) {
            console.error("No se encontró el contenedor #pano");
            return;
        }
        
        // Mostrar indicador de carga
        const loadingIndicator = document.querySelector('.loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.style.display = 'block';
        }
        
        // Limpiar el visor actual si existe
        if (panoramaViewer) {
            panoramaViewer.dispose();
        }
        
        // Crear un nuevo visor
        panoramaViewer = new PANOLENS.Viewer({
            container: container,
            autoRotate: true,
            autoRotateSpeed: 0.3,
            controlBar: true,
            controlButtons: ['fullscreen', 'setting', 'video'],
            cameraFov: 90
        });
        
        const tour = tours[index];
        console.log("Cargando panorama:", tour.panorama);
        
        // Crear el nuevo panorama
        viewer = new PANOLENS.ImagePanorama(tour.panorama);
        
        // Manejar eventos
        viewer.addEventListener('load', function() {
            console.log("Panorama cargado correctamente");
            // Ocultar el indicador de carga
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
        });
        
        viewer.addEventListener('error', function(e) {
            console.error('Error al cargar la imagen panorámica:', e);
            container.innerHTML = 
                '<div style="color: white; text-align: center; padding: 20px; background-color: rgba(0,0,0,0.7);">' +
                'Error al cargar la imagen panorámica. Verifica que el archivo "' + tour.panorama + '" existe y es accesible.' +
                '</div>';
        });
        
        // Agregar el panorama al visor
        panoramaViewer.add(viewer);
        
        console.log("Tour cargado correctamente");
        
    } catch (error) {
        console.error("Error al cargar el tour:", error);
        document.getElementById('pano').innerHTML = 
            '<div style="color: white; text-align: center; padding: 20px; background-color: rgba(0,0,0,0.7);">' +
            'Error al cargar el tour. Error: ' + error.message + 
            '</div>';
    }
}

// Manejar el formulario de contacto
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario
    alert('Mensaje enviado correctamente');
    this.reset();
});

// Función para manejar el menú móvil
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileMenuBtn || !navLinks) {
        console.error("No se encontraron los elementos necesarios para el menú móvil");
        return;
    }
    
    // Alternar menú al hacer clic en el botón
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Cambiar icono del botón
        const icon = this.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });
    
    // Cerrar menú al hacer clic en un enlace
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });
    
    // Cerrar menú al desplazarse por la página
    window.addEventListener('scroll', function() {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
        }
    });
}

// Hacer que el 360 sea responsivo
function makeViewerResponsive() {
    window.addEventListener('resize', function() {
        // Si el visor ya está inicializado, actualizamos su tamaño
        if (panoramaViewer) {
            panoramaViewer.onWindowResize();
        }
    });
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', function() {
    console.log("Documento cargado, esperando a que las bibliotecas se inicialicen...");
    
    // Configurar menú móvil
    setupMobileMenu();
    
    // Hacer que el visor sea responsivo
    makeViewerResponsive();
    
    // Esperar un momento para asegurar que las bibliotecas estén disponibles
    setTimeout(function() {
        console.log("Iniciando la aplicación...");
        loadProjects();
        loadTours();
        initViewer();
    }, 500); // Esperar 500ms
}); 