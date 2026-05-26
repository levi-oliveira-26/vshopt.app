// Lista de Desejos

document.addEventListener('DOMContentLoaded', function() {
  const heartButtons = document.querySelectorAll('.btn-heart');
  const viewBtns = document.querySelectorAll('.view-btn');
  const searchInput = document.querySelector('.toolbar-right .search-input');
  const sortSelect = document.querySelector('.sort-select');
  const desejosGrid = document.querySelector('.desejos-grid');

  // Heart button - toggle like
  heartButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      this.classList.toggle('liked');

      if (this.classList.contains('liked')) {
        this.style.animation = 'heartBeat 0.5s ease';
        setTimeout(() => {
          this.style.animation = '';
        }, 500);
      }
    });
  });

  // Adicionar ao carrinho
  const addToCartBtns = document.querySelectorAll('.card-overlay .btn');
  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('.desejo-card');
      const title = card.querySelector('h3').textContent;
      this.textContent = 'Adicionado ✓';
      this.style.background = '#22c55e';

      setTimeout(() => {
        this.textContent = 'Adicionar ao Carrinho';
        this.style.background = '';
      }, 2000);
    });
  });

  // View toggle
  viewBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      viewBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      if (this.classList.contains('list-view')) {
        desejosGrid.style.display = 'flex';
        desejosGrid.style.flexDirection = 'column';
        document.querySelectorAll('.desejo-card').forEach(card => {
          card.style.display = 'grid';
          card.style.gridTemplateColumns = '150px 1fr';
        });
      } else {
        desejosGrid.style.display = 'grid';
        desejosGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
        document.querySelectorAll('.desejo-card').forEach(card => {
          card.style.display = 'flex';
          card.style.flexDirection = 'column';
        });
      }
    });
  });

  // Search
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      document.querySelectorAll('.desejo-card').forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = title.includes(searchTerm) ? 'block' : 'none';
      });
    });
  }

  // Sort
  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      const cards = Array.from(document.querySelectorAll('.desejo-card'));
      const parent = desejosGrid;

      cards.sort((a, b) => {
        const titleA = a.querySelector('h3').textContent;
        const titleB = b.querySelector('h3').textContent;
        const precoA = parseFloat(a.querySelector('.preco-atual').textContent.replace('R$ ', '').replace(',', '.'));
        const precoB = parseFloat(b.querySelector('.preco-atual').textContent.replace('R$ ', '').replace(',', '.'));

        switch (this.value) {
          case 'nome':
            return titleA.localeCompare(titleB);
          case 'menor-preco':
            return precoA - precoB;
          case 'maior-preco':
            return precoB - precoA;
          default:
            return 0;
        }
      });

      cards.forEach(card => parent.appendChild(card));
    });
  }

  // Comprar tudo
  const comprarTudoBtn = document.querySelector('.resumo-card .btn-primary');
  if (comprarTudoBtn && comprarTudoBtn.textContent.includes('Comprar Tudo')) {
    comprarTudoBtn.addEventListener('click', function() {
      const items = document.querySelectorAll('.desejo-card');
      let total = 0;

      items.forEach(item => {
        const precoText = item.querySelector('.preco-atual').textContent;
        const preco = parseFloat(precoText.replace('R$ ', '').replace(',', '.'));
        total += preco;
      });

      alert(`${items.length} produtos adicionados ao carrinho. Total: R$ ${total.toFixed(2).replace('.', ',')}`);
    });
  }

  // Compartilhar lista
  const compartilharBtn = document.querySelector('.resumo-card .btn-outline');
  if (compartilharBtn && compartilharBtn.textContent.includes('Compartilhar')) {
    compartilharBtn.addEventListener('click', function() {
      const url = window.location.href;
      if (navigator.share) {
        navigator.share({
          title: 'Minha Lista de Desejos',
          url: url
        });
      } else {
        alert(`Link da lista: ${url}`);
      }
    });
  }
});
