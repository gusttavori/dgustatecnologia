// Esperar que o DOM seja completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Animação de entrada para elementos
    const animateElements = document.querySelectorAll('.hero-content, .tech-category');
    
    // Adicionar classe para iniciar animações
    setTimeout(() => {
        animateElements.forEach(element => {
            element.classList.add('animated');
        });
    }, 100);
    
    // Efeito de hover nos ícones de tecnologia
    const techIcons = document.querySelectorAll('.tech-icon, .card');
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(197, 255, 0, 0.2)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Menu toggle para dispositivos móveis
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            
            // Atualizar atributo aria-expanded
            const expanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', expanded);
        });
    }
    
    // Efeito de digitação para o título principal
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Iniciar efeito de digitação
        typeWriter();
    }
    
    // Formulário de contato
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aqui você adicionaria a lógica para enviar o formulário
            // Por exemplo, usando fetch para enviar para um backend
            
            // Feedback visual para o usuário
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Simulação de envio (remover em produção)
            setTimeout(() => {
                submitBtn.textContent = 'Mensagem Enviada!';
                
                // Resetar formulário
                contactForm.reset();
                
                // Restaurar botão após alguns segundos
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
    
    // Navegação suave para links internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Fechar menu mobile se estiver aberto
                if (nav && nav.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    nav.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
                
                // Scroll suave
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajuste para o header fixo
                    behavior: 'smooth'
                });
            }
        });
    });
});
