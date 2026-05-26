// Perfil

document.addEventListener('DOMContentLoaded', function() {
  const menuItems = document.querySelectorAll('.menu-item');
  const tabContents = document.querySelectorAll('.tab-content');

  menuItems.forEach(item => {
    item.addEventListener('click', function() {
      const tabName = this.dataset.tab;

      // Remove active class de todos os items
      menuItems.forEach(menu => menu.classList.remove('active'));
      // Adiciona active class no item clicado
      this.classList.add('active');

      // Hide all tabs
      tabContents.forEach(tab => tab.classList.remove('active'));
      // Show selected tab
      document.getElementById(`tab-${tabName}`).classList.add('active');
    });
  });

  // FAQ Collapse
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      item.querySelector('.faq-header').addEventListener('click', () => {
        item.classList.toggle('active');
      });
    });
  }

  // Form submission
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      // Aqui você pode adicionar lógica para enviar dados
      console.log('Formulário enviado');
      alert('Alterações salvas com sucesso!');
    });
  });

  // Toggle Switch Animation
  const toggles = document.querySelectorAll('.toggle-switch');
  toggles.forEach(toggle => {
    toggle.addEventListener('change', function() {
      this.style.animation = 'none';
      setTimeout(() => {
        this.style.animation = 'togglePulse 0.3s ease';
      }, 10);
    });
  });
});

// Estilos de animação
const style = document.createElement('style');
style.textContent = `
  @keyframes togglePulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
`;
document.head.appendChild(style);
