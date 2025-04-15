document.addEventListener('DOMContentLoaded', () => {
    
    // --- Toggle Menú Móvil ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
            // Opcional: Cambiar icono hamburguesa a X
             const icon = mobileMenuButton.querySelector('i');
             if (icon) {
                 icon.classList.toggle('fa-bars');
                 icon.classList.toggle('fa-times');
             }
        });
    }

    // --- Toggle FAQ items ---
    // Selecciona SOLAMENTE los botones con la clase 'faq-toggle'
    const faqToggleButtons = document.querySelectorAll('.faq-toggle');

    faqToggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const contentId = button.getAttribute('aria-controls');
            const content = document.getElementById(contentId);
            const icon = button.querySelector('i'); // Icono dentro del botón específico
            const isExpanded = button.getAttribute('aria-expanded') === 'true';

            if (content) {
                // Cambiar estado ARIA y visibilidad
                button.setAttribute('aria-expanded', !isExpanded);
                content.classList.toggle('hidden');

                // No es necesario cambiar clases del icono aquí si usamos CSS
                // como se añadió en styles.css:
                // .faq-toggle[aria-expanded="true"] i { transform: rotate(180deg); }

                // Alternativa si NO se usa el CSS para la rotación:
                // if (icon) {
                //    icon.classList.toggle('fa-chevron-down');
                //    icon.classList.toggle('fa-chevron-up');
                // }
            }
        });
    });

    // --- Smooth scrolling for anchor links ---
    // Asegurarse que también funcione al hacer clic desde el menú móvil
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hrefAttribute = this.getAttribute('href');
            // Asegurarse que el href no sea solo '#'
            if (hrefAttribute && hrefAttribute.length > 1) {
                const targetElement = document.querySelector(hrefAttribute);
                if (targetElement) {
                    e.preventDefault();
                    
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });

                    // Opcional: Si el menú móvil está abierto, cerrarlo después de hacer clic
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                       mobileMenuButton.click(); // Simula un clic para cerrar
                    }
                }
            }
        });
    });

}); // Fin de DOMContentLoaded