// Script para Metta Assessoria

// Função para rolagem suave nos links de navegação
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os links que apontam para âncoras na página
    const links = document.querySelectorAll('a[href^="#"]');
    
    // Adiciona evento de clique a cada link
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtém o alvo da âncora
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Rola suavemente até o elemento
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Inicializa as animações de scroll
    initScrollAnimations();
    
    // Inicializa o efeito de paralaxe
    initParallaxEffect();
    
    // Adiciona o grid de background
    addBackgroundGrid();
    
    // Adiciona partículas à seção hero
    addParticles();
    
    // Inicializa o carrossel de depoimentos
    initTestimonialCarousel();
    
    // INÍCIO: Chamada para o novo carrossel de Cases de Sucesso
    initCasesCarousel();
    // FIM: Chamada para o novo carrossel de Cases de Sucesso
    
    // Cria partículas flutuantes para o hero
    createFloatingParticles();

    // Adiciona classe de escala às seções
    document.querySelectorAll('section:not(.hero-section)').forEach(section => {
        section.classList.add('scale-on-scroll');
    });

    // Funcionalidade do FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      const icon = item.querySelector('.faq-icon');

      question.addEventListener('click', () => {
        const isOpen = answer.classList.contains('open');
        
        document.querySelectorAll('.faq-answer.open').forEach(openAnswer => {
          if (openAnswer !== answer) {
            openAnswer.classList.remove('open');
            openAnswer.style.maxHeight = '0px';
            const otherIcon = openAnswer.previousElementSibling.querySelector('.faq-icon');
            if (otherIcon) {
              otherIcon.classList.remove('rotate-180');
            }
          }
        });

        answer.classList.toggle('open');
        icon.classList.toggle('rotate-180');
        if (answer.classList.contains('open')) {
          answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
          answer.style.maxHeight = '0px';
        }
      });
    });

    // Anima os cards em sequência
    animateSequence('.flex-col.md\:flex-row', '.card', 150);
    
    // Anima os cards de serviços com atraso maior
    animateSequence('#servicos .flex-col.md\:flex-row', '.service-card', 200);
    
    // Adiciona classe de paralaxe a elementos selecionados - mantém o efeito parallax
    document.querySelectorAll('.hero-section h1, .section > img').forEach((el, index) => {
        el.classList.add('parallax');
        el.setAttribute('data-speed', (0.05 + (index * 0.02)).toString());
    });
    
    // Adiciona classe de destaque aos cards
    document.querySelectorAll('.card').forEach(card => {
        card.classList.add('highlight-on-view');
    });
});

// Função para inicializar as animações de scroll
function initScrollAnimations() {
    // Seleciona todos os elementos com a classe animate-on-scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const highlightElements = document.querySelectorAll('.highlight-on-view');
    const scaleElements = document.querySelectorAll('.scale-on-scroll');
    
    // Verificador de visibilidade para determinar quando animar
    function checkVisibility() {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
        
        // Anima os elementos com fade quando estão no viewport
        animatedElements.forEach(element => {
            // Obtém a posição do elemento em relação à viewport
            const elementPosition = element.getBoundingClientRect();
            // Define uma altura de offset para iniciar a animação antes do elemento estar totalmente visível
            const offset = 100;
            
            // Verifica se o elemento está visível na viewport
            if (elementPosition.top < windowHeight - offset) {
                element.classList.add('animate-visible');
            } else if (element.classList.contains('animate-reset')) {
                // Opcional: reseta a animação quando o elemento sai da viewport
                element.classList.remove('animate-visible');
            }
        });
        
        // Destaca elementos quando estão no centro do viewport
        highlightElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            const viewportCenter = windowHeight / 2;
            
            // Verifica se o elemento está próximo ao centro da viewport
            if (Math.abs(elementCenter - viewportCenter) < 100) {
                element.classList.add('highlight-active');
            } else {
                element.classList.remove('highlight-active');
            }
        });
        
        // Escala elementos quando estão visíveis
        scaleElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            
            if (rect.top < windowHeight * 0.85) {
                element.classList.add('scale-active');
            }
        });
    }
    
    // Executa a verificação inicial
    checkVisibility();
    
    // Adiciona o evento de scroll para verificar a visibilidade durante a rolagem
    window.addEventListener('scroll', checkVisibility);
}

// Função para animar elementos em sequência
function animateSequence(parentSelector, childSelector, delayBetween = 100) {
    const parent = document.querySelector(parentSelector);
    if (!parent) return;
    
    const children = parent.querySelectorAll(childSelector);
    
    children.forEach((child, index) => {
        child.style.transitionDelay = `${index * delayBetween}ms`;
    });
}

// Função para inicializar o efeito de paralaxe
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    // Função para atualizar a posição dos elementos com base no scroll
    function updateParallaxPositions() {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.1;
            const yPos = -(scrollY * speed);
            
            // Aplica a transformação com base na posição de scroll
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    // Atualiza as posições inicialmente e durante o scroll
    updateParallaxPositions();
    window.addEventListener('scroll', updateParallaxPositions);
}

// Função para adicionar o grid de background
function addBackgroundGrid() {
    const bgGrid = document.createElement('div');
    bgGrid.className = 'bg-grid';
    document.body.appendChild(bgGrid);
}

// Função para adicionar partículas à seção hero
function addParticles() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    // Cria o container de partículas
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'hero-particles';
    heroSection.appendChild(particlesContainer);
    
    // Cria várias partículas com tamanhos e posições aleatórias
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Define propriedades aleatórias para cada partícula
        const size = Math.random() * 6 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = Math.random() * 10 + 10;
        
        // Aplica estilos
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        // Adiciona a partícula ao container
        particlesContainer.appendChild(particle);
    }
}

// Função para adicionar efeitos de hover nos elementos interativos
function addHoverEffects() {
    // Adiciona efeito de hover nos cartões
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(14, 165, 233, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 0 0 rgba(0, 0, 0, 0)';
        });
    });
}

// Função para inicializar o carrossel de depoimentos
function initTestimonialCarousel() {
    const carousel = document.querySelector('.testimonial-carousel');
    if (!carousel) return;
    
    const container = carousel.querySelector('.testimonial-container');
    const slides = carousel.querySelectorAll('.testimonial-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const prevBtn = carousel.querySelector('.carousel-arrow.prev');
    const nextBtn = carousel.querySelector('.carousel-arrow.next');
    
    let currentIndex = 0;
    const slideWidth = 100; // 100% da largura do container
    
    // Função para atualizar a posição do carrossel
    function updateCarousel() {
        // Move o container para mostrar o slide atual
        container.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
        
        // Atualiza os dots (indicadores)
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Função para ir para o próximo slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }
    
    // Função para ir para o slide anterior
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    }
    
    // Adiciona eventos de clique aos botões de navegação
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Adiciona eventos de clique aos dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Auto-reprodução do carrossel (opcional)
    let autoplay;
    
    function startAutoplay() {
        autoplay = setInterval(nextSlide, 5000); // Muda de slide a cada 5 segundos
    }
    
    function stopAutoplay() {
        clearInterval(autoplay);
    }
    
    // Inicia a auto-reprodução
    startAutoplay();
    
    // Pausa a auto-reprodução quando o usuário interagir com o carrossel
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    
    // Para dispositivos de toque, também adiciona suporte a swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoplay();
    }, { passive: true });
    
    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoplay();
    }, { passive: true });
    
    function handleSwipe() {
        const SWIPE_THRESHOLD = 50;
        if (touchEndX < touchStartX - SWIPE_THRESHOLD) {
            // Swipe para a esquerda
            nextSlide();
        } else if (touchEndX > touchStartX + SWIPE_THRESHOLD) {
            // Swipe para a direita
            prevSlide();
        }
    }
    
    // Inicialmente, atualiza o carrossel para definir o estado inicial
    updateCarousel();
}

// INÍCIO: Nova função para o Carrossel de Cases de Sucesso
function initCasesCarousel() {
    const carousel = document.querySelector('.cases-carousel');
    if (!carousel) {
        console.warn("Cases carousel (selector: .cases-carousel) not found.");
        return;
    }
    
    const container = carousel.querySelector('.cases-container');
    const slides = Array.from(carousel.querySelectorAll('.case-slide'));
    const prevBtn = carousel.querySelector('.cases-prev');
    const nextBtn = carousel.querySelector('.cases-next');
    const dotContainer = carousel.querySelector('.cases-carousel-controls');

    if (!container || slides.length === 0) {
        console.warn('Cases carousel: Container or slides not found.');
        return;
    }

    let currentIndex = 0;
    let itemsPerPage = 1;
    const totalSlides = slides.length;
    const slideDisplayWidthPercentDesktop = 70; 
    const slideMarginPxDesktop = 15;          

    function updateItemsPerPageAndSizing() {
        const isMobile = window.innerWidth < 768;

        slides.forEach(slide => {
            if (isMobile) {
                slide.style.flexBasis = '100%';
                slide.style.minWidth = '100%';
                slide.style.margin = '0';
                slide.style.padding = '0 0.75rem'; // Mantém o padding para mobile
            } else { // Desktop
                slide.style.flexBasis = `${slideDisplayWidthPercentDesktop}%`;
                slide.style.minWidth = `${slideDisplayWidthPercentDesktop}%`;
                slide.style.margin = `0 ${slideMarginPxDesktop}px`;
                slide.style.padding = '0'; // Remove padding do .case-slide no desktop
            }
        });
        currentIndex = Math.min(currentIndex, Math.max(0, totalSlides - 1));
    }

    function createDots() {
        if (!dotContainer) return;
        dotContainer.innerHTML = '';
        // Math.max(0, totalSlides - itemsPerPage + 1) se torna totalSlides se itemsPerPage é 1 e queremos um dot por slide.
        const numDots = totalSlides; 

        if (numDots <= 1) { 
            dotContainer.style.display = 'none';
            return;
        }
        dotContainer.style.display = 'flex';

        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement('button');
            dot.classList.add('cases-carousel-dot'); 
            dot.dataset.slideTo = i;
            dotContainer.appendChild(dot);
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarouselState();
            });
        }
    }
    
    function updateCarouselState() {
        if (!carousel || !container || slides.length === 0) return;
        const isMobile = window.innerWidth < 768;

        if (isMobile) {
            const translatePercentage = currentIndex * 100;
            container.style.transform = `translateX(-${translatePercentage}%)`;
            slides.forEach((slide, index) => {
                slide.classList.remove('active', 'prev-sibling', 'next-sibling');
                if (index === currentIndex) {
                    slide.classList.add('active');
                }
            });
        } else { // Desktop
            const carouselWidth = carousel.offsetWidth;
            let slideContentWidth = 0; // Largura do slide sem margens
            if (slides[0]) {
                // slides[0].offsetWidth deve agora ser a largura baseada no flex-basis (sem padding)
                slideContentWidth = slides[0].offsetWidth;
            }

            if (slideContentWidth <= 0) {
                requestAnimationFrame(updateCarouselState);
                return;
            }

            const slideOuterWidth = slideContentWidth + (slideMarginPxDesktop * 2); // Largura total incluindo margens
            
            const centralizingOffset = (carouselWidth / 2) - (slideOuterWidth / 2);
            const totalTranslation = -(currentIndex * slideOuterWidth) + centralizingOffset;
            container.style.transform = `translateX(${totalTranslation}px)`;

            slides.forEach((slide, index) => {
                slide.classList.remove('active', 'prev-sibling', 'next-sibling');
                if (index === currentIndex) {
                    slide.classList.add('active');
                } else if (index === currentIndex - 1) {
                    slide.classList.add('prev-sibling');
                } else if (index === currentIndex + 1) {
                    slide.classList.add('next-sibling');
                }
            });
        }

        // Atualiza os dots 
        if (dotContainer) {
            const dots = dotContainer.querySelectorAll('.cases-carousel-dot');
            dots.forEach(dot => {
                dot.classList.toggle('active', parseInt(dot.dataset.slideTo) === currentIndex);
            });
        }

        const canNavigate = totalSlides > 1;
        if (prevBtn) prevBtn.style.display = canNavigate ? 'flex' : 'none';
        if (nextBtn) nextBtn.style.display = canNavigate ? 'flex' : 'none';
    }

    function goToNextSlide() {
        // const maxStartIndex = Math.max(0, totalSlides - itemsPerPage);
        // Com itemsPerPage = 1, maxStartIndex é totalSlides - 1
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop para o início
        }
        updateCarouselState();
    }

    function goToPrevSlide() {
        // const maxStartIndex = Math.max(0, totalSlides - itemsPerPage);
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalSlides - 1; // Loop para o fim
        }
        updateCarouselState();
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', goToNextSlide);
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', goToPrevSlide);
    }

    let autoplayInterval;
    function startAutoplay() {
        stopAutoplay();
        if (totalSlides <= itemsPerPage) return; // Não auto-play se todos slides visíveis
        autoplayInterval = setInterval(goToNextSlide, 5500); // Intervalo um pouco diferente para debug, se necessário
    }
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    let touchStartX = 0;
    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoplay();
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const SWIPE_THRESHOLD = 50; // Min. distância para swipe
        if (touchEndX < touchStartX - SWIPE_THRESHOLD) {
            goToNextSlide();
        } else if (touchEndX > touchStartX + SWIPE_THRESHOLD) {
            goToPrevSlide();
        }
        startAutoplay(); // Reinicia autoplay após interação
    }, { passive: true });
    
    // Configuração inicial e responsividade
    function initializeOrUpdate() {
        updateItemsPerPageAndSizing();
        createDots();
        updateCarouselState();
        startAutoplay();
    }

    window.addEventListener('resize', debounce(initializeOrUpdate, 250));
    initializeOrUpdate(); // Chamada inicial
}
// FIM: Nova função para o Carrossel de Cases de Sucesso

// Função para criar partículas flutuantes
function createFloatingParticles() {
    const container = document.querySelector('.floating-particles');
    if (!container) return;
    
    // Limpa o container antes de adicionar novas partículas
    container.innerHTML = '';
    
    // Número de partículas a serem criadas
    const particleCount = 30;
    
    // Cores das partículas (tons de azul e verde)
    const colors = [
        'rgba(14, 165, 233, 0.15)',
        'rgba(45, 212, 191, 0.12)',
        'rgba(56, 189, 248, 0.10)',
        'rgba(20, 184, 166, 0.13)'
    ];
    
    // Cria as partículas
    for (let i = 0; i < particleCount; i++) {
        // Cria elemento de partícula
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        // Tamanho aleatório
        const size = Math.random() * 12 + 3;
        
        // Posição aleatória
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Velocidade e direção aleatórias
        const speedX = (Math.random() - 0.5) * 0.2;
        const speedY = (Math.random() - 0.5) * 0.2;
        
        // Opacidade aleatória
        const opacity = Math.random() * 0.5 + 0.1;
        
        // Atraso de animação aleatório
        const delay = Math.random() * 5;
        
        // Cor aleatória do array de cores
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Define os estilos
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = opacity;
        particle.style.backgroundColor = color;
        particle.style.borderRadius = '50%';
        particle.style.position = 'absolute';
        particle.style.boxShadow = `0 0 ${size}px ${color.replace('0.1', '0.3')}`;
        particle.style.transform = 'translate3d(0, 0, 0)';
        particle.style.zIndex = '1';
        
        // Adiciona atributos de dados para animação via JavaScript
        particle.dataset.speedX = speedX;
        particle.dataset.speedY = speedY;
        particle.dataset.startX = posX;
        particle.dataset.startY = posY;
        particle.dataset.delay = delay;
        
        // Adiciona a partícula ao container
        container.appendChild(particle);
    }
    
    // Inicia a animação das partículas
    animateParticles();
}

// Função para animar as partículas flutuantes
function animateParticles() {
    const particles = document.querySelectorAll('.floating-particle');
    
    // Função de animação
    function moveParticles() {
        particles.forEach(particle => {
            // Obtém valores de dados
            const speedX = parseFloat(particle.dataset.speedX);
            const speedY = parseFloat(particle.dataset.speedY);
            const delay = parseFloat(particle.dataset.delay);
            
            // Calcula o tempo transcorrido
            const now = Date.now() / 1000;
            const offset = now * 0.5 + delay;
            
            // Calcula novas posições com movimento sinusoidal
            const startX = parseFloat(particle.dataset.startX);
            const startY = parseFloat(particle.dataset.startY);
            
            const posX = startX + Math.sin(offset) * 8 * speedX;
            const posY = startY + Math.cos(offset) * 8 * speedY;
            
            // Aplica a nova posição
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            
            // Atualiza opacidade para efeito de brilho
            const glowFactor = (Math.sin(offset * 2) + 1) / 2;
            particle.style.opacity = 0.1 + glowFactor * 0.3;
        });
        
        // Continua a animação
        requestAnimationFrame(moveParticles);
    }
    
    // Inicia a animação
    moveParticles();
}

// Adiciona funcionalidade de debounce para o redimensionamento da janela
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Adiciona funcionalidade de redimensionamento para o carrossel
function resizeCarousel() {
    const carousels = document.querySelectorAll('.swiper-container');
    carousels.forEach(container => {
        const slides = container.querySelectorAll('.swiper-slide');
        const dotContainer = container.querySelector('.swiper-pagination');
        const dotWidth = dotContainer.offsetWidth;
        const slideWidth = slides[0].offsetWidth;
        const totalWidth = slideWidth * slides.length;
        const scrollWidth = totalWidth - dotWidth;
        const scrollbar = container.querySelector('.swiper-scrollbar');
        
        if (scrollWidth > 0) {
            scrollbar.style.width = `${scrollWidth}px`;
        } else {
            scrollbar.style.width = '0px';
        }
    });
}

// Adiciona evento de redimensionamento
const resizeEvent = debounce(resizeCarousel, 200);
window.addEventListener('resize', resizeEvent); 