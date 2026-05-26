// Biblioteca

document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchBiblioteca');
  const filterTipo = document.getElementById('filterTipo');
  const filterOrdenacao = document.getElementById('filterOrdenacao');
  const cards = document.querySelectorAll('.biblioteca-card');

  function filterCards() {
    const searchTerm = searchInput.value.toLowerCase();
    const tipo = filterTipo.value;

    cards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const badge = card.querySelector('.card-badge');
      const cardTipo = badge ? badge.textContent.toLowerCase() : '';

      let matches = title.includes(searchTerm);
      if (tipo) {
        matches = matches && cardTipo.includes(tipo);
      }

      card.style.display = matches ? 'flex' : 'none';
    });
  }

  function sortCards() {
    const ordenacao = filterOrdenacao.value;
    const parent = document.querySelector('.biblioteca-grid');
    const cardsArray = Array.from(cards);

    cardsArray.sort((a, b) => {
      const titleA = a.querySelector('h3').textContent;
      const titleB = b.querySelector('h3').textContent;

      if (ordenacao === 'nome-asc') {
        return titleA.localeCompare(titleB);
      } else if (ordenacao === 'nome-desc') {
        return titleB.localeCompare(titleA);
      }
      return 0;
    });

    cardsArray.forEach(card => parent.appendChild(card));
  }

  searchInput.addEventListener('input', filterCards);
  filterTipo.addEventListener('change', filterCards);
  filterOrdenacao.addEventListener('change', () => {
    filterCards();
    sortCards();
  });

  // Animação de cards
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animation = `fadeIn 0.5s ease forwards`;
    card.style.animationDelay = `${index * 0.1}s`;
  });
});

// Estilos de animação
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
