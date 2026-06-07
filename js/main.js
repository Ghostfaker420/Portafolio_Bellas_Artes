document.addEventListener('DOMContentLoaded', () => {

    // ==================== CUSTOM CURSOR ====================
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (dot && ring) {
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.left = mouseX + 'px';
            dot.style.top = mouseY + 'px';
        });

        function animateRing() {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            ring.style.left = ringX + 'px';
            ring.style.top = ringY + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();

        document.querySelectorAll('a, button, .project-card, .viewer-btn, .skill-tag, .social-link').forEach(el => {
            el.addEventListener('mouseenter', () => ring.classList.add('hover'));
            el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
        });

        document.addEventListener('mouseleave', () => { ring.classList.add('hidden'); dot.style.opacity = '0'; });
        document.addEventListener('mouseenter', () => { ring.classList.remove('hidden'); dot.style.opacity = '1'; });
    }

    // ==================== PROJECT DATA ====================
    const projects = [
        {
            title: 'Arte Urbano',
            desc: 'Dirección de arte y diseño de murales de gran formato con técnicas digitales y modelado 3D escultórico.',
            tags: ['Arte Urbano', 'Muralismo', 'Escultura Digital'],
            software: ['Nomad Sculpt'],
            color: '#E85D04',
            img: 'assets/images/Arte urbano/kevin 1.webp',
            secondaryImg: 'assets/images/Arte urbano/Kevin 2.webp'
        },
        {
            title: 'Iconografia Vectoral',
            desc: 'Creación de sistemas de iconografía vectorial para plataformas digitales, con enfoque en consistencia visual y escalabilidad.',
            tags: ['Iconografía', 'Vectores', 'Identidad de Marca'],
            software: ['Illustrator', 'Photoshop'],
            color: '#9D0208',
            img: 'assets/images/Iconografía/iconos.webp'
        },
    ];

    function swInitials(name) {
        const p = name.split(/\s+/);
        return p.length > 1 ? p.map(w => w[0]).join('').toUpperCase() : p[0].slice(0, 2).toUpperCase();
    }

    const softwareSVGs = {
        'Illustrator': '<svg viewBox="45 55 150 120" xmlns="http://www.w3.org/2000/svg"><path fill="#ff9a00" d="M116.30029,140.42822H79.10938l-7.5669,23.50611a1.89431,1.89431,0,0,1-1.93213,1.449H50.77344q-1.61133,0-1.127-1.771L81.84619,70.87622q.4834-1.44873.96631-3.30054a34.478,34.478,0,0,0,.644-6.52026.99643.99643,0,0,1,1.127-1.1272h25.59863q1.125,0,1.28808.80518l36.54737,103.03979q.48267,1.61133-.96631,1.61011H126.12109a1.48824,1.48824,0,0,1-1.60986-1.12695Zm-31.395-20.28589h25.438q-.96606-3.21863-2.2539-7.24511-1.29054-4.02246-2.73682-8.61353-1.44947-4.58826-2.89844-9.177-1.44873-4.58826-2.65625-8.855-1.20776-4.26379-2.17334-7.80835h-.16113a130.10721,130.10721,0,0,1-3.38086,12.87988q-2.2566,7.24512-4.58887,14.812Q87.158,113.70484,84.90527,120.14233Z"/><path fill="#ff9a00" d="M169.75049,76.99438a11.67783,11.67783,0,0,1-8.855-3.542,12.73665,12.73665,0,0,1-3.38135-9.177,11.813,11.813,0,0,1,3.62256-8.93555,12.44131,12.44131,0,0,1,8.93555-3.46142q5.79638,0,9.09668,3.46142a12.4294,12.4294,0,0,1,3.30029,8.93555,12.57378,12.57378,0,0,1-3.46143,9.177A12.3536,12.3536,0,0,1,169.75049,76.99438Zm-11.10938,86.77881v-76.958c0-.96582.42774-1.449,1.28809-1.449h19.80322q1.28687,0,1.28809,1.449v76.958q0,1.61133-1.28809,1.61011H160.09033Q158.6416,165.3833,158.64111,163.77319Z"/></svg>',
        'Photoshop': '<svg viewBox="45 50 165 125" xmlns="http://www.w3.org/2000/svg"><path fill="#31a8ff" d="M54.04167,164.09521V61.21631c0-.74976.32226-1.127.96631-1.127,1.71533,0,3.28157-.02515,5.64388-.08057q3.53979-.07911,7.64746-.16089,4.106-.07947,8.69433-.16113,4.5879-.07911,9.09619-.08057,12.23366,0,20.60791,3.05908a35.755,35.755,0,0,1,13.44385,8.21094,31.496,31.496,0,0,1,7.3252,11.35059,37.64894,37.64894,0,0,1,2.25439,12.96045q0,12.88256-5.957,21.252a33.65844,33.65844,0,0,1-16.1001,12.15552c-6.7622,2.52319-14.27636,3.3789-22.54,3.3789q-3.54345,0-4.99121-.08056-1.44873-.07947-4.34668-.08057v32.12183a1.28093,1.28093,0,0,1-1.44922,1.449H55.16862C54.41667,165.3833,54.04167,164.95557,54.04167,164.09521Zm21.74446-84.686v33.55493q2.09034.16224,3.86377.16089h5.313a37.7594,37.7594,0,0,0,11.51172-1.83765,17.35824,17.35824,0,0,0,8.21094-5.313q3.13915-3.70167,3.13965-10.304a16.28281,16.28281,0,0,0-2.335-8.85522,15.01394,15.01394,0,0,0-7.00341-5.71534A29.83951,29.83951,0,0,0,86.73389,79.0874q-3.86427,0-6.84229.08032Q76.91065,79.25085,75.78613,79.40918Z"/><path fill="#31a8ff" d="M191.97114,106.863a37.6431,37.6431,0,0,0-9.57959-3.3811,50.875,50.875,0,0,0-11.18946-1.28809,20.82175,20.82175,0,0,0-6.03759.72461,5.42475,5.42475,0,0,0-3.13965,2.01245,5.0699,5.0699,0,0,0-.80469,2.73706,4.27537,4.27537,0,0,0,.96582,2.57593,10.95825,10.95825,0,0,0,3.38086,2.65649,67.449,67.449,0,0,0,7.084,3.30054,70.20083,70.20083,0,0,1,15.37549,7.32544,23.38242,23.38242,0,0,1,7.88916,8.2915A22.10738,22.10738,0,0,1,198.25,142.122a23.143,23.143,0,0,1-3.86377,13.28247,25.41573,25.41573,0,0,1-11.18995,8.93531q-7.32788,3.219-18.1123,3.22021a65.50368,65.50368,0,0,1-13.60449-1.28808,43.40843,43.40843,0,0,1-10.22363-3.22,2.08508,2.08508,0,0,1-1.127-1.93213V143.73187a.94571.94571,0,0,1,.40283-.8855.781.781,0,0,1,.88526.08057,43.01131,43.01131,0,0,0,12.397,4.9104,51.12181,51.12181,0,0,0,11.75293,1.52954q5.63379,0,8.2915-1.449a4.5512,4.5512,0,0,0,2.65674-4.186q0-2.09034-2.415-4.02491-2.41479-1.93212-9.82129-4.66918a59.18392,59.18392,0,0,1-14.24853-7.24488,24.5718,24.5718,0,0,1-7.5669-8.45263,22.20192,22.20192,0,0,1-2.33447-10.22339,23.08045,23.08045,0,0,1,3.38086-12.075,24.57046,24.57046,0,0,1,10.46533-9.177q7.08252-3.53943,17.71-3.542a78.40115,78.40115,0,0,1,12.397.8855,32.49681,32.49681,0,0,1,8.63066,2.33447,1.46829,1.46829,0,0,1,.96582.8855,4.44869,4.44869,0,0,1,.16113,1.20752v16.261a1.08221,1.08221,0,0,1-.48291.96606A1.556,1.556,0,0,1,191.97114,106.863Z"/></svg>',
        'After Effects': '<svg viewBox="25 55 185 120" xmlns="http://www.w3.org/2000/svg"><path fill="#9999ff" d="M96.415,140H59.22363l-7.56689,23.551A1.89358,1.89358,0,0,1,49.72461,165H30.8877q-1.61133,0-1.127-1.771l32.2002-92.35278c.32177-.96582.644-1.91007.96582-3.14543a34.395,34.395,0,0,0,.644-6.52026.99662.99662,0,0,1,1.127-1.1272H90.29688q1.12426,0,1.28808.80518l36.54688,102.50138q.48265,1.61133-.96582,1.61011H106.23584a1.48791,1.48791,0,0,1-1.60986-1.12695ZM65.02,120.14233H90.458q-.96608-3.21863-2.2544-7.24511-1.29053-4.02246-2.73681-8.61353-1.44873-4.58826-2.898-9.177-1.44873-4.58826-2.65674-8.855-1.207-4.26379-2.17334-7.80835h-.16113a129.83806,129.83806,0,0,1-3.38086,12.87988q-2.2566,7.24512-4.58838,14.812Q67.27271,113.70484,65.02,120.14233Z"/><path fill="#9999ff" d="M187.38086,130.83333h-31.7168a22.61786,22.61786,0,0,0,3.05908,8.87053,16.56442,16.56442,0,0,0,7.3252,6.03735,30.58935,30.58935,0,0,0,12.7998,2.50879,58.00276,58.00276,0,0,0,10.38428-1.14014,38.2738,38.2738,0,0,0,8.92827-2.32743c.53564-.42749.80517-.16089.80517.80518v15.29492a2.38438,2.38438,0,0,1-.2417,1.20752,2.30979,2.30979,0,0,1-.72461.72436,40.94371,40.94371,0,0,1-9.97465,2.97148,70.76093,70.76093,0,0,1-14.168,1.20752q-11.43383,0-19.15918-3.542a34.14667,34.14667,0,0,1-12.55761-9.499,37.19747,37.19747,0,0,1-6.92334-13.12158,51.6676,51.6676,0,0,1-2.09278-14.57056,50.74576,50.74576,0,0,1,2.49561-15.85839A41.42461,41.42461,0,0,1,143.106,96.7168a35.9638,35.9638,0,0,1,12.07519-9.499c4.72168-2.30688,10.30371-3.13444,16.74365-3.13444a36.33458,36.33458,0,0,1,15.53663,3.05884,27.38213,27.38213,0,0,1,10.54541,7.96452,36.61555,36.61555,0,0,1,5.957,11.35059,40.448,40.448,0,0,1,1.93213,12.23608q0,3.54309-.2417,6.43994-.241,2.89784-.40235,4.186a1.45875,1.45875,0,0,1-1.44922,1.28808q-.96606,0-3.30029.24146-2.3357.24133-5.7959.322C192.397,131.22607,189.957,130.83333,187.38086,130.83333Zm-31.7168-14.66666h21.09082q3.86425,0,5.71533-.08057a5.62421,5.62421,0,0,0,2.335-.77384v-.96607a12.8804,12.8804,0,0,0-.644-3.70288,13.15261,13.15261,0,0,0-13.041-9.177,13.9859,13.9859,0,0,0-13.28272,7.56689A23.28917,23.28917,0,0,0,155.66406,116.16667Z"/></svg>',
        'Nomad Sculpt': '<svg viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#9999FF" stroke-linecap="round" stroke-linejoin="round"><path d="M57.93 79.64s-8.48 2.54-11.87 5.94c-2.58 2.58-14.46 13.48-20.01 18.56-2.86 2.62-4.44 6.43-3.96 10.28.31 2.52 1.48 5.1 4.47 6.77 7.63 4.24 23.74 10.17 61.9 1.7 0 0-52.57-24.59-30.52-43.24Z" stroke-width="12"/><path d="M84.21 74.46s44.09 4.13 44.09-1.38-9.64-8.27-14.47-8.27c-11.71 0-17.91 10.33-29.62 9.64Z" stroke-width="8"/><path d="M141.87 68.62s12.72 16.96-.85 21.2-56.81-7.63-63.59.85c0 0-2.25 2.7 6.39 8.77 7.67 5.39 16.71 8.49 26.06 9.2 19.59 1.5 58.08 3.14 59.97-6.95 2.54-13.57-27.98-33.07-27.98-33.07Z" stroke-width="12"/></svg>'
    };

    function swBadgeHTML(name) {
        const svg = softwareSVGs[name];
        const content = svg || swInitials(name);
        return `<span class="project-card-software-badge"><span class="sw-badge-square">${content}</span><span class="sw-badge-label">${name}</span></span>`;
    }

    // Static section badges (carousel, motion)
    const carouselSW = document.getElementById('carouselSoftware');
    if (carouselSW) carouselSW.innerHTML = ['Illustrator', 'Photoshop'].map(s => swBadgeHTML(s)).join('');
    const motionSW = document.getElementById('motionSoftware');
    if (motionSW) motionSW.innerHTML = ['Illustrator', 'After Effects'].map(s => swBadgeHTML(s)).join('');

    const projectsGrid = document.getElementById('projectsGrid');

    function renderProjectCards() {
        projectsGrid.innerHTML = '';
        projects.forEach((p, i) => {
            const card = document.createElement('article');
            card.className = 'project-card reveal-up';
            card.tabIndex = 0;
            card.role = 'button';
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(p);
                }
            });

            card.style.transitionDelay = `${i * 0.1}s`;
            card.innerHTML = `
                <div class="project-card-img${p.type === 'gif' ? ' project-card-img--gif' : ''}">
                    ${p.img ? `<img src="${p.img}" alt="${p.title}" width="800" height="500" ${p.type === 'gif' ? '' : 'loading="lazy"'}>` : `<span class="project-card-index">${String(i + 1).padStart(2, '0')}</span>`}
                </div>
                <div class="project-card-body">
                    <h3 class="project-card-title">${p.title}</h3>
                    <div class="project-card-tags">
                        ${p.tags.map(t => `<span class="project-card-tag">${t}</span>`).join('')}
                    </div>
                </div>
            `;

            const wrapper = document.createElement('div');
            wrapper.className = 'project-card-wrapper';

            card.addEventListener('click', () => openModal(p));
            wrapper.appendChild(card);

            const swDiv = document.createElement('div');
            swDiv.className = 'project-card-software';
            swDiv.innerHTML = p.software.map(s => swBadgeHTML(s)).join('');
            wrapper.appendChild(swDiv);

            projectsGrid.appendChild(wrapper);
        });
    }

    renderProjectCards();

    // ==================== MODAL ====================
    const modal = document.getElementById('projectModal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalTags = document.getElementById('modalTags');
    const modalClose = document.getElementById('modalClose');
    const pageWrapper = document.getElementById('page');

    let lastFocused = null;

    function openModal(project) {
        lastFocused = document.activeElement;
        modalTitle.textContent = project.title;
        modalDesc.textContent = project.desc;
        modalTags.innerHTML = project.tags.map(t => `<span class="project-card-tag">${t}</span>`).join('');
        const existingSw = modalTags.nextElementSibling;
        if (existingSw && existingSw.classList.contains('modal-software')) {
            existingSw.remove();
        }
        if (project.software) {
            const swRow = document.createElement('div');
            swRow.className = 'modal-software';
            swRow.innerHTML = project.software.map(s => swBadgeHTML(s)).join('');
            modalTags.after(swRow);
        }

        if (project.img) {
            modalImg.style.background = 'none';
            if (project.type === 'gif') {
                modalImg.innerHTML = `
                    <div class="modal-gif-player">
                        <img src="${project.img}" alt="${project.title}">
                    </div>`;
            } else if (project.secondaryImg) {
                modalImg.innerHTML = `
                    <div class="modal-img-grid modal-img-grid--dual">
                        <div class="modal-img-primary"><img src="${project.img}" alt="${project.title}" width="800" height="500"></div>
                        <div class="modal-img-secondary"><img src="${project.secondaryImg}" alt="${project.title}" width="800" height="140"></div>
                    </div>`;
            } else {
                modalImg.innerHTML = `<img src="${project.img}" alt="${project.title}" width="800" height="600" style="width:100%;max-height:75vh;object-fit:contain;background:var(--bg-card);padding:20px;">`;
            }
        } else {
            modalImg.style.background = `linear-gradient(135deg, ${project.color}, ${project.color}66)`;
            modalImg.innerHTML = '';
            const letter = document.createElement('span');
            letter.style.cssText = 'display:flex; align-items:center; justify-content:center; width:100%; height:100%; font-size:4rem; font-weight:600; color:rgba(255,255,255,0.2);';
            letter.textContent = project.title.charAt(0);
            modalImg.appendChild(letter);
        }
        modalImg.style.display = 'flex';

        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        if (pageWrapper) pageWrapper.setAttribute('aria-hidden', 'true');
        modalClose.focus();
    }

    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
        if (pageWrapper) pageWrapper.removeAttribute('aria-hidden');
        if (lastFocused) lastFocused.focus();
    }

    function trapFocus(e) {
        if (!modal.classList.contains('open')) return;
        const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    }

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
        trapFocus(e);
    });

    // ==================== NAVBAR ====================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');
    const sections = document.querySelectorAll('.section[id]');
    const navLinkItems = document.querySelectorAll('.nav-link');

    function updateNavbar() {
        const scrollY = window.scrollY;

        if (scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        sections.forEach(section => {
            const top = section.offsetTop - 120;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < bottom) {
                navLinkItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateNavbar, { passive: true });

    function toggleNav(open) {
        const isOpen = open !== undefined ? open : !navLinks.classList.contains('open');
        navToggle.classList.toggle('active', isOpen);
        navLinks.classList.toggle('open', isOpen);
        if (navOverlay) navOverlay.classList.toggle('open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    navToggle.addEventListener('click', () => toggleNav());

    if (navOverlay) navOverlay.addEventListener('click', () => toggleNav(false));

    navLinkItems.forEach(link => {
        link.addEventListener('click', () => toggleNav(false));
    });





    // ==================== SCROLL REVEAL ====================
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-scale, .reveal-blur');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const delay = parseFloat(entry.target.style.transitionDelay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay * 1000);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));

    // ==================== VIEWER 360 INIT (lazy) ====================
    const viewerEl = document.getElementById('viewerContainer');
    if (viewerEl) {
        const obs = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                obs.disconnect();
                try {
                    const frameFiles = [];
                    for (let i = 1; i <= 36; i++) {
                        frameFiles.push(`assets/images/360/1/100${String(i).padStart(2, '0')}.webp`);
                    }
                    new Viewer360('viewerContainer', {
                        totalFrames: 36,
                        framesPerRow: 6,
                        frameFiles: frameFiles
                    });
                } catch (err) {
                    console.warn('Viewer360 no disponible:', err.message);
                }
            }
        }, { rootMargin: '200px' });
        obs.observe(viewerEl);
    }

    // ==================== CAROUSEL INIT ====================
    try {
        const carouselSlides = [
            {
                img: 'assets/images/Carrusel/1.webp',
                icon: '🎨',
                title: 'Identidad de Marca',
                desc: 'Desarrollo completo de branding para startups y empresas consolidadas.',
                color: '#E85D04'
            },
            {
                img: 'assets/images/Carrusel/2.webp',
                icon: '📖',
                title: 'Diseño Editorial',
                desc: 'Maquetación de revistas, libros y catálogos con jerarquía visual cuidada.',
                color: '#9D0208'
            },
            {
                img: 'assets/images/Carrusel/3.webp',
                icon: '📱',
                title: 'UX/UI',
                desc: 'Interfaces funcionales y atractivas centradas en la experiencia de usuario.',
                color: '#0C0F38'
            },
            {
                img: 'assets/images/Carrusel/4.webp',
                icon: '🎲',
                title: 'Modelado 3D',
                desc: 'Renderizado de producto y visualización arquitectónica con Blender.',
                color: '#FFBA08'
            },
            {
                img: 'assets/images/Carrusel/5.webp',
                icon: '🧱',
                title: 'Arte Urbano',
                desc: 'Murales y escultura digital que transforman el espacio público.',
                color: '#E85D04'
            },
            {
                img: 'assets/images/Carrusel/6.webp',
                icon: '✏️',
                title: 'Ilustración Vectorial',
                desc: 'Sistemas de iconografía y gráficos vectoriales para plataformas digitales.',
                color: '#9D0208'
            }
        ];

        new Carousel('carouselContainer', { slides: carouselSlides });
    } catch (err) {
        console.warn('Carrusel no disponible:', err.message);
    }
});
