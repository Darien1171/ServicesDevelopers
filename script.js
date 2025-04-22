// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const header = document.getElementById('header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const navItems = document.querySelectorAll('.nav-links a');
    
    // ------------- FUNCIONES BÁSICAS DE UI -------------
    
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
    
    // Función para abrir/cerrar el menú móvil con animación
    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
            mobileMenuBtn.textContent = '✕';
            document.body.style.overflow = 'hidden'; // Bloquear scroll del body
            
            // Animar la entrada de los elementos del menú
            const menuItems = navLinks.querySelectorAll('li');
            menuItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100 + (index * 70));
            });
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
    
    // ------------- ANIMACIONES AVANZADAS DE SCROLL -------------
    
    // Función para determinar si un elemento está en el viewport con margen
    function isInViewport(element, offset = 0) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * (1 - offset) &&
            rect.bottom >= 0
        );
    }
    
    // Función para animar elementos al hacer scroll
    function initScrollAnimations() {
        // Configuración de animaciones por tipo de elemento
        const animations = [
            {
                elements: document.querySelectorAll('.service-card'),
                baseDelay: 100,
                delayIncrement: 100,
                animation: {
                    opacity: [0, 1],
                    transform: ['translateY(40px)', 'translateY(0)'],
                    easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                    duration: 800
                }
            },
            {
                elements: document.querySelectorAll('.feature'),
                baseDelay: 100,
                delayIncrement: 150,
                animation: {
                    opacity: [0, 1],
                    transform: ['translateY(30px) scale(0.95)', 'translateY(0) scale(1)'],
                    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                    duration: 700
                }
            },
            {
                elements: document.querySelectorAll('.step'),
                baseDelay: 200,
                delayIncrement: 200,
                animation: {
                    opacity: [0, 1],
                    transform: ['translateY(30px)', 'translateY(0)'],
                    easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                    duration: 600
                }
            },
            {
                elements: document.querySelectorAll('.portfolio-item'),
                baseDelay: 50,
                delayIncrement: 100,
                animation: {
                    opacity: [0, 1],
                    transform: ['scale(0.9)', 'scale(1)'],
                    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                    duration: 800
                }
            },
            {
                elements: document.querySelectorAll('.team-member'),
                baseDelay: 150,
                delayIncrement: 150,
                animation: {
                    opacity: [0, 1],
                    transform: ['translateX(-30px)', 'translateX(0)'],
                    easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                    duration: 700
                }
            },
            {
                elements: document.querySelectorAll('.value-item'),
                baseDelay: 100,
                delayIncrement: 120,
                animation: {
                    opacity: [0, 1],
                    transform: ['translateY(40px) scale(0.95)', 'translateY(0) scale(1)'],
                    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                    duration: 750
                }
            },
            {
                elements: document.querySelectorAll('.contact-card'),
                baseDelay: 100,
                delayIncrement: 100,
                animation: {
                    opacity: [0, 1],
                    transform: ['translateY(30px)', 'translateY(0)'],
                    easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                    duration: 700
                }
            },
            {
                elements: document.querySelectorAll('.faq-item'),
                baseDelay: 200,
                delayIncrement: 150,
                animation: {
                    opacity: [0, 1],
                    transform: ['translateX(-20px)', 'translateX(0)'],
                    easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                    duration: 600
                }
            },
            {
                elements: document.querySelectorAll('.about-stats .stat-item'),
                baseDelay: 100,
                delayIncrement: 100,
                animation: {
                    opacity: [0, 1],
                    transform: ['scale(0.8)', 'scale(1)'],
                    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                    duration: 800
                }
            },
            {
                elements: document.querySelectorAll('.section-title'),
                baseDelay: 0,
                delayIncrement: 0,
                animation: {
                    opacity: [0, 1],
                    transform: ['translateY(20px)', 'translateY(0)'],
                    easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                    duration: 800
                }
            },
            {
                elements: document.querySelectorAll('.section-subtitle'),
                baseDelay: 200,
                delayIncrement: 0,
                animation: {
                    opacity: [0, 1],
                    transform: ['translateY(20px)', 'translateY(0)'],
                    easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                    duration: 800
                }
            },
            {
                elements: document.querySelectorAll('.hero-title'),
                baseDelay: 300,
                delayIncrement: 0,
                animation: {
                    opacity: [0, 1],
                    transform: ['translateY(-20px)', 'translateY(0)'],
                    easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                    duration: 1000
                },
                alwaysAnimate: true
            },
            {
                elements: document.querySelectorAll('.hero-subtitle'),
                baseDelay: 600,
                delayIncrement: 0,
                animation: {
                    opacity: [0, 1],
                    transform: ['translateY(-10px)', 'translateY(0)'],
                    easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                    duration: 1000
                },
                alwaysAnimate: true
            },
            {
                elements: document.querySelectorAll('.hero-buttons'),
                baseDelay: 800,
                delayIncrement: 0,
                animation: {
                    opacity: [0, 1],
                    transform: ['translateY(10px)', 'translateY(0)'],
                    easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                    duration: 1000
                },
                alwaysAnimate: true
            }
        ];

        // Configurar elementos antes de la animación
        animations.forEach(config => {
            config.elements.forEach(element => {
                if (!element.classList.contains('animated') || config.alwaysAnimate) {
                    element.style.opacity = '0';
                    element.style.transform = config.animation.transform[0];
                    element.style.transitionProperty = 'none'; // Evitar transiciones hasta que sea necesario
                }
            });
        });

        // Función para animar elementos cuando entran en el viewport
        function animateOnScroll() {
            animations.forEach(config => {
                config.elements.forEach((element, index) => {
                    if ((isInViewport(element, 0.2) || config.alwaysAnimate) && 
                        (!element.classList.contains('animated') || config.alwaysAnimate)) {
                        
                        // Calcula el retraso basado en el índice y configuración
                        const delay = config.baseDelay + (index * config.delayIncrement);
                        
                        // Configura las propiedades de la transición
                        setTimeout(() => {
                            element.style.transition = `opacity ${config.animation.duration}ms ${config.animation.easing}, 
                                                    transform ${config.animation.duration}ms ${config.animation.easing}`;
                            element.style.opacity = config.animation.opacity[1];
                            element.style.transform = config.animation.transform[1];
                            element.classList.add('animated');
                            
                            // Para algunos elementos, añadir clases adicionales para efectos específicos
                            if (element.classList.contains('service-card') || 
                                element.classList.contains('feature') || 
                                element.classList.contains('portfolio-item')) {
                                element.classList.add('animate-shadow');
                            }
                        }, delay);
                    }
                });
            });
        }
        
        // Ejecutar animación en carga inicial y en scroll
        setTimeout(animateOnScroll, 100); // Pequeño retraso para asegurar que los estilos están aplicados
        window.addEventListener('scroll', animateOnScroll);
    }
    
    // ------------- EFECTO PARALLAX -------------
    
    function initParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.hero-image, .about-image, #cta-section');
        
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const elementPosition = element.offsetTop;
                const elementHeight = element.offsetHeight;
                const viewportHeight = window.innerHeight;
                
                // Verificar si el elemento está en el viewport
                if (scrollPosition + viewportHeight > elementPosition && 
                    scrollPosition < elementPosition + elementHeight) {
                    
                    // Calcular la posición relativa del elemento en el viewport
                    const distance = (scrollPosition + viewportHeight - elementPosition) / viewportHeight;
                    
                    // Aplicar el efecto parallax (diferente según el tipo de elemento)
                    if (element.classList.contains('hero-image')) {
                        element.style.transform = `translateY(${distance * -20}px)`;
                    } else if (element.classList.contains('about-image')) {
                        element.style.transform = `translateY(${distance * -15}px)`;
                    } else if (element.id === 'cta-section') {
                        element.style.backgroundPositionY = `${distance * 30}%`;
                    }
                }
            });
        });
    }
    
    // ------------- ANIMACIONES DE CONTADOR PARA ESTADÍSTICAS -------------
    
    function initCounterAnimations() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        if (statNumbers.length > 0) {
            statNumbers.forEach(number => {
                // Obtener el valor final desde el texto
                const targetValue = parseInt(number.textContent.replace(/[^0-9]/g, ''), 10);
                number.setAttribute('data-target', targetValue);
                number.textContent = '0';
                
                // Flag para asegurar que la animación se ejecute solo una vez
                number.setAttribute('data-animated', 'false');
            });
            
            function animateNumbers() {
                statNumbers.forEach(number => {
                    if (isInViewport(number) && number.getAttribute('data-animated') === 'false') {
                        number.setAttribute('data-animated', 'true');
                        const target = parseInt(number.getAttribute('data-target'), 10);
                        let current = 0;
                        const increment = Math.ceil(target / 50); // Dividir la animación en 50 pasos
                        const duration = 1500; // 1.5 segundos para la animación completa
                        const stepTime = duration / 50;
                        
                        const counter = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                number.textContent = target + (target > 1 && number.textContent.includes('+') ? '+' : '');
                                clearInterval(counter);
                            } else {
                                number.textContent = current + (target > 1 && number.textContent.includes('+') ? '+' : '');
                            }
                        }, stepTime);
                    }
                });
            }
            
            // Ejecutar al cargar y al hacer scroll
            window.addEventListener('scroll', animateNumbers);
            setTimeout(animateNumbers, 500);
        }
    }
    
    // ------------- ANIMACIONES DE SERVICIOS Y CARACTERÍSTICAS -------------
    
    function initServiceAnimations() {
        const serviceCards = document.querySelectorAll('.service-card');
        const features = document.querySelectorAll('.feature');
        
        // Animación de hover mejorada para tarjetas de servicio
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                // Añadir clase para estilos CSS
                this.classList.add('hover');
                
                // Animar el icono
                const icon = this.querySelector('.service-icon');
                if (icon) {
                    icon.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    icon.style.transform = 'scale(1.15) translateY(-5px)';
                }
                
                // Animar el título
                const title = this.querySelector('.service-title');
                if (title) {
                    title.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.3s ease';
                    title.style.transform = 'translateY(-3px)';
                    title.style.color = 'var(--primary-color)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('hover');
                
                // Restaurar el icono
                const icon = this.querySelector('.service-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) translateY(0)';
                }
                
                // Restaurar el título
                const title = this.querySelector('.service-title');
                if (title) {
                    title.style.transform = 'translateY(0)';
                    title.style.color = '';
                }
            });
        });
        
        // Animar características en hover
        features.forEach(feature => {
            feature.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.feature-icon');
                if (icon) {
                    icon.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    icon.style.transform = 'rotateY(180deg) scale(1.1)';
                }
            });
            
            feature.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.feature-icon');
                if (icon) {
                    icon.style.transform = 'rotateY(0) scale(1)';
                }
            });
        });
    }
    
    // ------------- ANIMACIONES PARA EL PORTAFOLIO -------------
    
    function initPortfolioAnimations() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                const overlay = this.querySelector('.portfolio-overlay');
                if (overlay) {
                    overlay.style.transition = 'transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1)';
                    overlay.style.transform = 'translateY(0)';
                }
                
                const image = this.querySelector('.portfolio-image');
                if (image) {
                    image.style.transition = 'transform 0.7s cubic-bezier(0.215, 0.61, 0.355, 1)';
                    image.style.transform = 'scale(1.05)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                const overlay = this.querySelector('.portfolio-overlay');
                if (overlay) {
                    overlay.style.transform = 'translateY(100%)';
                }
                
                const image = this.querySelector('.portfolio-image');
                if (image) {
                    image.style.transform = 'scale(1)';
                }
            });
        });
    }
    
    // ------------- ANIMACIONES PARA TEAM MEMBERS -------------
    
    function initTeamAnimations() {
        const teamMembers = document.querySelectorAll('.team-member');
        
        teamMembers.forEach(member => {
            member.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 15px 30px -10px rgba(0, 0, 0, 0.15)';
                
                const photo = this.querySelector('.member-photo');
                if (photo) {
                    photo.style.transition = 'transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1)';
                    photo.style.transform = 'scale(1.05)';
                }
            });
            
            member.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                
                const photo = this.querySelector('.member-photo');
                if (photo) {
                    photo.style.transform = 'scale(1)';
                }
            });
        });
    }
    
    // ------------- MEJORAR EL SLIDER DE TESTIMONIOS -------------
    
    function initTestimonialSlider() {
        const testimonialsSlider = document.querySelector('.testimonial-slider');
        if (testimonialsSlider) {
            const navDots = document.querySelectorAll('.nav-dot');
            const testimonials = testimonialsSlider.querySelectorAll('.testimonial');
            let isAnimating = false;
            
            // Función para aplicar efecto de transición
            function applyTransitionEffect(element, direction) {
                element.style.opacity = '0';
                element.style.transform = direction === 'next' ? 'translateX(50px)' : 'translateX(-50px)';
                
                setTimeout(() => {
                    element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
                    element.style.opacity = '1';
                    element.style.transform = 'translateX(0)';
                }, 50);
            }
            
            // Función para cambiar el slide actual con efecto
            function changeSlide(index, direction = 'next') {
                if (isAnimating) return;
                isAnimating = true;
                
                // Desactivar todos los dots
                navDots.forEach(dot => dot.classList.remove('active'));
                
                // Activar el dot correspondiente
                navDots[index].classList.add('active');
                
                // Calcular la posición a desplazar
                const position = index * testimonialsSlider.clientWidth;
                
                // Hacer invisible el testimonio actual y luego aplicar transición
                testimonials.forEach((testimonial, idx) => {
                    if (Math.abs(testimonial.offsetLeft - testimonialsSlider.scrollLeft) < 50) {
                        testimonial.style.opacity = '0';
                        testimonial.style.transform = direction === 'next' ? 'translateX(-50px)' : 'translateX(50px)';
                        testimonial.style.transition = 'opacity 0.3s ease-in, transform 0.3s ease-in';
                    }
                });
                
                // Desplazar el slider después de una breve pausa
                setTimeout(() => {
                    testimonialsSlider.scrollTo({
                        left: position,
                        behavior: 'auto' // Usar 'auto' para evitar conflicto con nuestras propias animaciones
                    });
                    
                    // Aplicar efecto al nuevo testimonio visible
                    setTimeout(() => {
                        testimonials.forEach((testimonial, idx) => {
                            if (idx === index) {
                                applyTransitionEffect(testimonial, direction);
                            }
                        });
                        
                        isAnimating = false;
                    }, 100);
                }, 300);
            }
            
            // Asignar eventos de clic a los dots
            navDots.forEach((dot, index) => {
                dot.addEventListener('click', function() {
                    const currentIndex = Array.from(navDots).findIndex(d => d.classList.contains('active'));
                    const direction = index > currentIndex ? 'next' : 'prev';
                    changeSlide(index, direction);
                });
            });
            
            // Auto-avance de testimonios con mejor transición
            let currentSlide = 0;
            const totalSlides = navDots.length;
            
            function autoAdvance() {
                currentSlide = (currentSlide + 1) % totalSlides;
                changeSlide(currentSlide, 'next');
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
            
            // Aplicar efecto al primer testimonio
            setTimeout(() => {
                applyTransitionEffect(testimonials[0], 'next');
            }, 500);
        }
    }
    
    // ------------- ANIMACIONES PARA FAQ -------------
    
    function initFaqAnimations() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        if (faqItems.length > 0) {
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                const answer = item.querySelector('.faq-answer');
                
                // Configurar altura inicial
                if (item.classList.contains('active')) {
                    answer.style.height = answer.scrollHeight + 'px';
                } else {
                    answer.style.height = '0';
                    answer.style.overflow = 'hidden';
                }
                
                question.addEventListener('click', function() {
                    // Cerrar todos los demás items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            const otherAnswer = otherItem.querySelector('.faq-answer');
                            otherItem.classList.remove('active');
                            
                            // Animar el cierre
                            otherAnswer.style.height = otherAnswer.scrollHeight + 'px';
                            setTimeout(() => {
                                otherAnswer.style.transition = 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                                otherAnswer.style.height = '0';
                            }, 10);
                        }
                    });
                    
                    // Alternar el estado activo del item actual
                    item.classList.toggle('active');
                    
                    // Animar la apertura/cierre
                    if (item.classList.contains('active')) {
                        answer.style.display = 'block';
                        answer.style.height = '0';
                        
                        setTimeout(() => {
                            answer.style.transition = 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                            answer.style.height = answer.scrollHeight + 'px';
                        }, 10);
                        
                        // Animar el icono
                        this.style.transition = 'color 0.3s ease';
                        this.style.color = 'var(--primary-color)';
                    } else {
                        answer.style.height = answer.scrollHeight + 'px';
                        
                        setTimeout(() => {
                            answer.style.transition = 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                            answer.style.height = '0';
                        }, 10);
                        
                        // Restaurar el icono
                        this.style.color = '';
                    }
                });
            });
            
            // Abrir el primer item por defecto con animación
            setTimeout(() => {
                if (faqItems[0] && !faqItems[0].classList.contains('active')) {
                    faqItems[0].querySelector('.faq-question').click();
                }
            }, 1000);
        }
    }
    
    // ------------- ANIMACIÓN DE FORMULARIO DE CONTACTO -------------
    
    function initFormAnimations() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            const formElements = contactForm.querySelectorAll('input, textarea, button');
            
            // Añadir efecto de foco a los campos
            formElements.forEach(element => {
                if (element.tagName.toLowerCase() !== 'button') {
                    element.addEventListener('focus', function() {
                        this.parentElement.classList.add('focus');
                        
                        // Animar la etiqueta
                        const label = this.previousElementSibling;
                        if (label && label.classList.contains('form-label')) {
                            label.style.transition = 'transform 0.3s ease, color 0.3s ease';
                            label.style.transform = 'translateY(-5px) scale(0.95)';
                            label.style.color = 'var(--primary-color)';
                            label.style.transformOrigin = 'left top';
                        }
                    });
                    
                    element.addEventListener('blur', function() {
                        this.parentElement.classList.remove('focus');
                        
                        // Restaurar la etiqueta si el campo está vacío
                        const label = this.previousElementSibling;
                        if (label && label.classList.contains('form-label') && !this.value) {
                            label.style.transform = 'translateY(0) scale(1)';
                            label.style.color = '';
                        }
                    });
                }
            });
            
            // Animación al enviar el formulario
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Añadir clase de animación
                this.classList.add('submitting');
                
                // Deshabilitar campos durante la "envío"
                formElements.forEach(element => {
                    element.disabled = true;
                });
                
                // Animar el botón
                const submitBtn = this.querySelector('button[type="submit"]');
                if (submitBtn) {
                    const originalText = submitBtn.textContent;
                    submitBtn.innerHTML = '<span class="spinner"></span> Enviando...';
                    
                    // Aquí iría la lógica de validación y envío real
                    
                    // Simulación de envío exitoso
                    setTimeout(() => {
                        submitBtn.innerHTML = '✓ ¡Mensaje Enviado!';
                        submitBtn.style.backgroundColor = 'var(--accent-color)';
                        
                        // Restaurar el formulario después de un tiempo
                        setTimeout(() => {
                            this.reset();
                            submitBtn.textContent = originalText;
                            submitBtn.style.backgroundColor = '';
                            this.classList.remove('submitting');
                            
                            // Habilitar campos nuevamente
                            formElements.forEach(element => {
                                element.disabled = false;
                            });
                            
                            // Mostrar mensaje de éxito con animación
                            const successMessage = document.createElement('div');
                            successMessage.className = 'form-success-message';
                            successMessage.textContent = '¡Gracias por contactarnos! Te responderemos a la brevedad.';
                            
                            this.after(successMessage);
                            
                            // Animar entrada del mensaje
                            setTimeout(() => {
                                successMessage.style.opacity = '1';
                                successMessage.style.transform = 'translateY(0)';
                            }, 10);
                            
                            // Remover mensaje después de un tiempo
                            setTimeout(() => {
                                successMessage.style.opacity = '0';
                                successMessage.style.transform = 'translateY(-10px)';
                                
                                setTimeout(() => {
                                    successMessage.remove();
                                }, 500);
                            }, 5000);
                        }, 1500);
                    }, 1500);
                }
            });
        }
    }
    
    // ------------- ANIMACIÓN DE LOADER DE PÁGINA -------------
    
    function initPageLoader() {
        // Crear loader si no existe
        let loader = document.querySelector('.page-loader');
        
        if (!loader) {
            loader = document.createElement('div');
            loader.className = 'page-loader';
            loader.innerHTML = `
                <div class="loader-content">
                    <div class="loader-spinner"></div>
                    <div class="loader-text">Cargando</div>
                </div>
            `;
            document.body.appendChild(loader);
            
            // Añadir estilos inline para el loader
            const style = document.createElement('style');
            style.textContent = `
                .page-loader {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                    transition: opacity 0.5s ease, visibility 0.5s ease;
                }
                .loader-content {
                    text-align: center;
                }
                .loader-spinner {
                    width: 40px;
                    height: 40px;
                    border: 3px solid rgba(37, 99, 235, 0.2);
                    border-top-color: var(--primary-color);
                    border-radius: 50%;
                    margin: 0 auto 15px;
                    animation: spin 1s infinite linear;
                }
                .loader-text {
                    color: var(--primary-color);
                    font-weight: 600;
                    animation: pulse 1.5s infinite;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                @keyframes pulse {
                    0% { opacity: 0.6; }
                    50% { opacity: 1; }
                    100% { opacity: 0.6; }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Ocultar loader cuando la página esté lista
        window.addEventListener('load', function() {
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
                
                // Activar animaciones de la página después de que el loader desaparezca
                setTimeout(() => {
                    document.body.classList.add('page-loaded');
                    loader.remove();
                }, 500);
            }, 1000); // Dar tiempo suficiente para que se carguen los recursos
        });
    }
    
    // ------------- INICIALIZAR TODAS LAS FUNCIONES -------------
    
    // Inicializar el loader primero
    initPageLoader();
    
    // Inicializar funciones básicas de UI
    initScrollHeader();
    initSmoothScroll();
    
    // Inicializar animaciones avanzadas
    window.addEventListener('load', function() {
        // Esperar a que la página esté completamente cargada
        setTimeout(() => {
            initScrollAnimations();
            initParallaxEffect();
            initCounterAnimations();
            initServiceAnimations();
            initPortfolioAnimations();
            initTeamAnimations();
            initTestimonialSlider();
            initFaqAnimations();
            initFormAnimations();
            
            // Añadir clase para indicar que todas las animaciones están listas
            document.body.classList.add('animations-ready');
        }, 500);
    });
    
    // Añadir estilos CSS dinámicos para animaciones
    const dynamicStyles = document.createElement('style');
    dynamicStyles.textContent = `
        .animate-shadow {
            transition: box-shadow 0.5s ease, transform 0.5s ease !important;
        }
        
        .animate-shadow:hover {
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
        }
        
        .form-success-message {
            background-color: #ecfdf5;
            color: #047857;
            padding: 1rem;
            border-radius: 5px;
            margin-top: 1rem;
            opacity: 0;
            transform: translateY(-10px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .submitting input, .submitting textarea, .submitting button {
            transition: opacity 0.3s ease;
            opacity: 0.7;
        }
        
        .spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top-color: #fff;
            animation: spin 1s infinite linear;
            margin-right: 5px;
            vertical-align: middle;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        /* Estilos para la animación de entrada de página */
        body:not(.page-loaded) {
            overflow: hidden;
        }
        
        body.page-loaded section {
            animation: fadeIn 1s ease forwards;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(dynamicStyles);
});