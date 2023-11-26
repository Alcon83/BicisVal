document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');
    const menuBtn = document.querySelector('.menu-btn');
    const navigation = document.querySelector('.navigation');
    const links = document.querySelectorAll('.navigation-items a, .footer-links a');

    // Función para cargar el contenido
    function loadContent(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                main.innerHTML = html;
                updateActiveLink(url);
            })
            .catch(error => {
                console.error('Error loading content', error);
            });
    }

    // Actualizar la clase 'active' en el enlace
    function updateActiveLink(activeUrl) {
        links.forEach(link => {
            if (link.getAttribute('href') === activeUrl) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Evento delegado para manejar clics en 'main'
    main.addEventListener('click', (event) => {
        let target = event.target.closest('a');
        if (target && (target.getAttribute('href').startsWith('pages/') || target.getAttribute('href') === 'index.html')) {
            event.preventDefault();
            loadContent(target.getAttribute('href'));
        }
    });

    // Eventos para enlaces en la cabecera y el pie de página
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            let href = link.getAttribute('href');
            if (href.startsWith('pages/') || href === 'index.html') {
                event.preventDefault();
                loadContent(href);
            }
        });
    });

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navigation.classList.toggle('active');
    });

    // Cargar el contenido inicial si es necesario
    if (!main.innerHTML.trim()) {
        loadContent('pages/home.html');
    }
});
