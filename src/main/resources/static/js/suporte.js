// Suporte

document.addEventListener('DOMContentLoaded', function() {
  // FAQ Collapse/Expand
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const content = item.querySelector('.faq-content');

    header.addEventListener('click', function() {
      const isActive = item.classList.contains('active');

      // Fechar todos os outros
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current
      item.classList.toggle('active');
    });
  });

  // Chat ao vivo
  const chatBtns = document.querySelectorAll('.channel-card');
  chatBtns.forEach(btn => {
    const chatBtn = btn.querySelector('.btn-outline');
    if (chatBtn && btn.textContent.includes('Chat')) {
      chatBtn.addEventListener('click', function() {
        alert('Iniciando chat ao vivo... Um agente será alocado em breve.');
      });
    }
  });

  // Enviar email
  const emailBtns = document.querySelectorAll('.channel-card');
  emailBtns.forEach(btn => {
    const emailBtn = btn.querySelector('.btn-outline');
    if (emailBtn && btn.textContent.includes('Email')) {
      emailBtn.addEventListener('click', function() {
        window.location.href = 'mailto:suporte@vshopt.com';
      });
    }
  });

  // Agendar ligação
  const phoneBtns = document.querySelectorAll('.channel-card');
  phoneBtns.forEach(btn => {
    const phoneBtn = btn.querySelector('.btn-outline');
    if (phoneBtn && btn.textContent.includes('Telefone')) {
      phoneBtn.addEventListener('click', function() {
        alert('Formulário de agendamento aberto. Por favor preencha seus dados.');
      });
    }
  });

  // Novo ticket
  const ticketBtns = document.querySelectorAll('.channel-card');
  ticketBtns.forEach(btn => {
    const ticketBtn = btn.querySelector('.btn-outline');
    if (ticketBtn && btn.textContent.includes('Ticket')) {
      ticketBtn.addEventListener('click', function() {
        document.querySelector('.ticket-form-section').scrollIntoView({ behavior: 'smooth' });
      });
    }
  });

  // Form submission
  const ticketForm = document.querySelector('.ticket-form');
  if (ticketForm) {
    ticketForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const assunto = document.getElementById('assunto').value;
      const descricao = document.getElementById('descricao').value;

      if (!assunto || !descricao) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      // Gerar número de ticket
      const ticketNumber = 'TKT-' + Date.now();

      alert(`Ticket criado com sucesso!\n\nNúmero: ${ticketNumber}\n\nVocê receberá uma resposta em até 2 horas.`);

      this.reset();
    });
  }

  // Search
  const searchInput = document.querySelector('.search-suporte .search-input');
  if (searchInput) {
    const searchBtn = document.querySelector('.search-suporte .btn');
    searchBtn?.addEventListener('click', function() {
      const query = searchInput.value.toLowerCase();
      if (query.length > 0) {
        alert(`Procurando por: "${query}"\n\nNenhum resultado encontrado. Use o formulário abaixo para entrar em contato.`);
      }
    });
  }

  // Link das categorias
  const categoryLinks = document.querySelectorAll('.category-group a');
  categoryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const text = this.textContent;
      alert(`Expandindo: ${text}`);
    });
  });

  // Animação do FAQ
  faqItems.forEach((item, index) => {
    item.style.animation = `fadeIn 0.5s ease forwards`;
    item.style.animationDelay = `${index * 0.05}s`;
  });
});

// Estilos de animação
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
