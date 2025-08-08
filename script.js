document.addEventListener('DOMContentLoaded', function() {

    // --- Efeito de digitação para o título principal ---
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
        typeWriter();
    }

    // --- Navegação suave para links internos ---
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Dropdown customizado ---
const customSelects = document.querySelectorAll('.custom-select');
customSelects.forEach(customSelect => {
    const selectStyled = customSelect.querySelector('.select-styled');
    const selectOptions = customSelect.querySelector('.select-options');
    
    // Find the original select element with a safety check
    const originalSelect = document.getElementById(customSelect.id.replace('custom-', ''));

    selectStyled.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.select-styled.active').forEach(otherSelect => {
            if (otherSelect !== selectStyled) {
                otherSelect.classList.remove('active');
                otherSelect.nextElementSibling.style.display = 'none';
            }
        });
        const isOpen = selectOptions.style.display === 'block';
        selectStyled.classList.toggle('active');
        selectOptions.style.display = isOpen ? 'none' : 'block';
    });

    selectOptions.querySelectorAll('li').forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const value = option.getAttribute('data-value');
            const text = option.textContent;
            selectStyled.textContent = text;
            selectStyled.setAttribute('data-value', value);
            
            // This is the line that was causing the error.
            // We'll add a check to make sure the element exists.
            if (originalSelect) {
                originalSelect.value = value;
            }

            document.querySelectorAll('.select-styled.active').forEach(otherSelect => {
                otherSelect.classList.remove('active');
                otherSelect.nextElementSibling.style.display = 'none';
            });

            selectOptions.querySelectorAll('li').forEach(li => li.classList.remove('selected'));
            option.classList.add('selected');
        });
    });
});

    // --- Envio do formulário para o WhatsApp (versão otimizada) ---
const form = document.getElementById('consultoriaForm');
if (form) {
    // Adiciona a classe 'invalid' e retorna true se o elemento for inválido
    function validateAndMark(element, value) {
        if (!value) {
            element.classList.add('invalid');
            return true;
        } else {
            element.classList.remove('invalid');
            return false;
        }
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const nomeInput = document.getElementById('nome');
        const tipoStyled = document.querySelector('#custom-tipo-select .select-styled');
        const usoStyled = document.querySelector('#custom-uso-select .select-styled');
        const orcamentoStyled = document.querySelector('#custom-orcamento-select .select-styled');

        let hasError = false;
        
        hasError = validateAndMark(nomeInput, nomeInput.value.trim()) || hasError;
        hasError = validateAndMark(tipoStyled, tipoStyled.dataset.value) || hasError;
        hasError = validateAndMark(usoStyled, usoStyled.dataset.value) || hasError;
        hasError = validateAndMark(orcamentoStyled, orcamentoStyled.dataset.value) || hasError;

        if (hasError) {
            // Se houver algum erro, pare a execução aqui
            return;
        }
        
        // O restante do seu código para enviar para o WhatsApp
        const tipo = tipoStyled.dataset.value;
        const uso = usoStyled.dataset.value;
        const orcamento = orcamentoStyled.dataset.value;
        const informacoes = document.getElementById('informacoes').value.trim();
        const numero = '5577988838862';

        const mensagem =
            `Olá, Gustavo! Gostaria de uma consultoria personalizada.%0A%0A` +
            `Nome: ${encodeURIComponent(nomeInput.value.trim())}%0A` +
            `Tipo de consultoria: ${encodeURIComponent(tipo)}%0A` +
            `Uso principal: ${encodeURIComponent(uso)}%0A` +
            `Orçamento: ${encodeURIComponent(orcamento)}%0A` +
            `Informações adicionais: ${encodeURIComponent(informacoes)}`;

        const url = `https://wa.me/${numero}?text=${mensagem}`;

        const newWin = window.open(url, '_blank');
        if (!newWin) {
            window.location.href = url;
        }
    });
}
});