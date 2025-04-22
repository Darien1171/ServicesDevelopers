// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const header = document.getElementById('header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const navItems = document.querySelectorAll('.nav-links a');
    
    // Función para hacer scroll suave a las secciones
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Si el menú móvil está abierto, cerrarlo
                    if (navLinks.classList.contains('active')) {
                        toggleMobileMenu();
                    }
                }
            });
        });
    }
    
    // Función para cambiar el estilo del header al hacer scroll
    function initScrollHeader() {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Función para abrir/cerrar el menú móvil
    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
            mobileMenuBtn.textContent = '✕';
            document.body.style.overflow = 'hidden'; // Bloquear scroll del body
        } else {
            mobileMenuBtn.textContent = '☰';
            document.body.style.overflow = ''; // Restaurar scroll del body
        }
    }
    
    // Asignar eventos de clic para el menú móvil
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', toggleMobileMenu);
    }
    
    // Cerrar menú al hacer clic en un enlace
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Inicializar testimonios slider si existe en la página
    const testimonialsSlider = document.querySelector('.testimonial-slider');
    if (testimonialsSlider) {
        const navDots = document.querySelectorAll('.nav-dot');
        
        // Función para cambiar el slide actual
        function changeSlide(index) {
            // Calcular la posición a desplazar
            const position = index * testimonialsSlider.clientWidth;
            
            // Desplazar el slider
            testimonialsSlider.scrollTo({
                left: position,
                behavior: 'smooth'
            });
            
            // Actualizar dots activos
            navDots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Asignar eventos de clic a los dots
        navDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                changeSlide(index);
            });
        });
        
        // Escuchar el evento scroll del slider
        testimonialsSlider.addEventListener('scroll', function() {
            const scrollPosition = testimonialsSlider.scrollLeft;
            const sliderWidth = testimonialsSlider.clientWidth;
            
            // Determinar qué testimonio es visible
            const activeIndex = Math.round(scrollPosition / sliderWidth);
            
            // Actualizar dots
            navDots.forEach((dot, index) => {
                if (index === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        });
        
        // Auto-avance de testimonios cada 5 segundos
        let currentSlide = 0;
        const totalSlides = navDots.length;
        
        function autoAdvance() {
            currentSlide = (currentSlide + 1) % totalSlides;
            changeSlide(currentSlide);
        }
        
        // Iniciar el auto-avance
        let slideInterval = setInterval(autoAdvance, 5000);
        
        // Detener el auto-avance cuando el usuario interactúa con el slider
        testimonialsSlider.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        // Reanudar el auto-avance cuando el usuario deja de interactuar
        testimonialsSlider.addEventListener('mouseleave', function() {
            slideInterval = setInterval(autoAdvance, 5000);
        });
    }
    
    // Inicializar accordion de FAQ si existe en la página
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', function() {
                // Cerrar todos los demás items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Alternar el estado activo del item actual
                item.classList.toggle('active');
            });
        });
        
        // Abrir el primer item por defecto
        faqItems[0].classList.add('active');
    }
    
    // Manejar el envío del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí iría la lógica de validación y envío del formulario
            // Para este ejemplo, simplemente mostramos un mensaje de éxito
            
            // Simulación de envío (en un caso real, aquí iría una llamada AJAX)
            setTimeout(function() {
                alert('¡Gracias por contactarnos! Te responderemos a la brevedad.');
                contactForm.reset();
            }, 500);
        });
    }
    
    // Inicializar efectos de animación en scroll
    function initScrollAnimations() {
        const elementsToAnimate = document.querySelectorAll('.service-card, .feature, .portfolio-item, .team-member, .contact-card, .value-item');
        
        // Función para verificar si un elemento está en el viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
                rect.bottom >= 0
            );
        }
        
        // Función para animar elementos visibles
        function animateOnScroll() {
            elementsToAnimate.forEach(element => {
                if (isInViewport(element) && !element.classList.contains('animated')) {
                    element.classList.add('animated');
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }
        
        // Configurar elementos antes de la animación
        elementsToAnimate.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        // Ejecutar animación en carga y scroll
        animateOnScroll();
        window.addEventListener('scroll', animateOnScroll);
    }
    
    // Inicializar todas las funcionalidades
    initScrollHeader();
    initSmoothScroll();
    initScrollAnimations();
});