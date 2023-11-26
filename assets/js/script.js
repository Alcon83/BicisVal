document.addEventListener('DOMContentLoaded', () => {

    const main = document.querySelector('main');
    const links = document.querySelectorAll('.navigation-items a');
    const currentPath = window.location.pathname.split('/').pop();
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

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navigation.classList.toggle('active');
    });

    // Añadir el active a los links para que quede la linea marcada

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Evita la navegación predeterminada
            const href = link.getAttribute('href');
            loadContent(href);
        });
    });
    // Cargar el contenido de home.html si main está vacío
    if (!main.innerHTML.trim()) {
        loadContent('pages/home.html');
        document.querySelector('.navigation-items a[href="home.html"]').classList.add('active');
    }
});