// Carousel automático para o phone
function initPhoneCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const carousel = document.querySelector('.screen-carousel');
    let currentSlide = 0;

    console.log('🔍 Elementos encontrados:');
    console.log('- Slides:', slides.length);
    console.log('- Dots:', dots.length);
    console.log('- Carousel:', carousel);

    if (slides.length === 0) return;

    function showSlide(index) {
        console.log('🔄 Mudando para slide:', index);
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    // Clique em qualquer lugar do carrossel
    carousel.addEventListener('click', (e) => {
        console.log('🎯 Clicou no carrossel! Target:', e.target);
        console.log('É um dot?', e.target.classList.contains('dot'));
        
        if (!e.target.classList.contains('dot')) {
            let nextSlide = currentSlide + 1;
            if (nextSlide >= slides.length) nextSlide = 0;
            console.log('📸 Próximo slide:', nextSlide);
            showSlide(nextSlide);
        }
    });

    // Clique nos dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('🔘 Dot clicado:', index);
            showSlide(index);
        });
    });

    // Auto-play
    setInterval(() => {
        let nextSlide = currentSlide + 1;
        if (nextSlide >= slides.length) nextSlide = 0;
        showSlide(nextSlide);
    }, 5000);

    showSlide(0);
}

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});

// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'var(--text-primary)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'var(--text-primary)';
        header.style.boxShadow = 'none';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                nav.style.display = 'none';
                menuToggle.setAttribute('aria-expanded', 'false');
            }
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .team-member, .publico-grupo, .problematica-stat, .mvv-card, .quem-somos-stat, .image-btn, .selecionavel-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Update copyright year
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2025', currentYear);
    }
});

// Seleção de planos
document.querySelectorAll('.selecionavel-item').forEach(item => {
    item.addEventListener('click', function() {
        // Remove seleção anterior
        document.querySelectorAll('.selecionavel-item').forEach(i => {
            i.classList.remove('selecionado');
        });
        
        // Adiciona seleção atual
        this.classList.add('selecionado');
        
        // Opcional: mostrar mensagem de confirmação
        const plano = this.getAttribute('data-plano');
        console.log('📋 Plano selecionado:', plano);
        
        // Feedback visual adicional
        this.style.transform = 'translateY(-5px) scale(1.02)';
        setTimeout(() => {
            this.style.transform = 'translateY(-5px)';
        }, 200);
    });
});

// Efeito hover para image buttons
document.querySelectorAll('.image-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.05)';
        this.style.boxShadow = 'var(--shadow-lg)';
    });
    
    btn.addEventListener('mouseleave', function() {
        if (!this.classList.contains('selecionado')) {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'var(--shadow)';
        }
    });
});

// Handle responsive navigation
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        nav.style.display = 'flex';
    } else {
        nav.style.display = 'none';
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Inicializar carousel quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initPhoneCarousel);

// Button click handlers para os botões de download
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        const buttonType = this.classList.contains('btn-primary') ? 'Google Play' : 'App Store';
        console.log(`📲 Botão ${buttonType} clicado`);
        
        // Efeito de clique
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Efeito de clique nos image buttons
document.querySelectorAll('.image-btn').forEach(button => {
    button.addEventListener('click', function() {
        console.log('🖼️ Botão com imagem clicado');
        
        // Efeito de clique
        this.style.transform = 'translateY(-8px) scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'translateY(-8px) scale(1.05)';
        }, 150);
    });
});
