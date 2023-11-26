document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');
    const menuBtn = document.querySelector('.menu-btn');
    const navigation = document.querySelector('.navigation');

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
            })
            .catch(error => {
                console.error('Error loading content', error);
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
    document.querySelectorAll('.navigation-items a, .footer-links a').forEach(link => {
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
