// Ofertas

document.addEventListener('DOMContentLoaded', function() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const ofertaCards = document.querySelectorAll('.oferta-card');

  // Filtrar ofertas
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.dataset.filter;

      ofertaCards.forEach(card => {
        if (filter === 'todas') {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          // Adicionar lógica de filtro baseado em classe
          if (card.classList.contains(`${filter}-deal`) || card.classList.contains(filter)) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s ease';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });

  // Newsletter
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      alert(`Email ${email} inscrito na newsletter!`);
      this.reset();
    });
  }

  // Countdown timer
  const countdown = document.querySelector('.timer');
  if (countdown) {
    let dias = 5;
    let horas = 12;
    let minutos = 34;

    setInterval(() => {
      minutos--;
      if (minutos < 0) {
        minutos = 59;
        horas--;
        if (horas < 0) {
          horas = 23;
          dias--;
          if (dias < 0) {
            dias = 0;
            horas = 0;
            minutos = 0;
          }
        }
      }

      const timeValues = countdown.querySelectorAll('.time-value');
      if (timeValues.length >= 3) {
        timeValues[0].textContent = String(dias).padStart(2, '0');
        timeValues[1].textContent = String(horas).padStart(2, '0');
        timeValues[2].textContent = String(minutos).padStart(2, '0');
      }
    }, 60000); // Atualizar a cada minuto
  }

  // Adicionar ao carrinho
  const addToCartBtns = document.querySelectorAll('.oferta-card .btn-primary');
  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('.oferta-card');
      const title = card.querySelector('h3').textContent;
      this.textContent = 'Adicionado ✓';
      this.style.background = '#22c55e';

      setTimeout(() => {
        this.textContent = 'Adicionar ao Carrinho';
        this.style.background = '';
      }, 2000);
    });
  });
});

// Estilos de animação
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
document.head.appendChild(style);
