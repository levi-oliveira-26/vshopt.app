// Carrinho

document.addEventListener('DOMContentLoaded', function() {
  const qtyInputs = document.querySelectorAll('.qty-input');
  const qtyBtns = document.querySelectorAll('.qty-btn');
  const removeButtons = document.querySelectorAll('.btn-remove');

  function updateTotal() {
    let subtotal = 0;
    document.querySelectorAll('.carrinho-item').forEach(item => {
      const precoText = item.querySelector('.preco').textContent;
      const preco = parseFloat(precoText.replace('R$ ', '').replace(',', '.'));
      const qtd = parseInt(item.querySelector('.qty-input').value);
      subtotal += preco * qtd;
    });

    // Atualizar resumo
    const resumoRow = document.querySelector('.resumo-row .valor');
    if (resumoRow) {
      resumoRow.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    }
  }

  // Quantidade buttons
  qtyBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const input = this.closest('.item-quantidade').querySelector('.qty-input');
      let value = parseInt(input.value);

      if (this.textContent === '−') {
        value = Math.max(1, value - 1);
      } else if (this.textContent === '+') {
        value += 1;
      }

      input.value = value;
      updateTotal();
    });
  });

  // Quantity input change
  qtyInputs.forEach(input => {
    input.addEventListener('change', function() {
      const value = parseInt(this.value) || 1;
      if (value < 1) this.value = 1;
      if (value > 999) this.value = 999;
      updateTotal();
    });
  });

  // Remove item
  removeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const item = this.closest('.carrinho-item');
      item.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        item.remove();
        updateTotal();

        // Verificar se carrinho está vazio
        if (document.querySelectorAll('.carrinho-item').length === 0) {
          document.querySelector('.carrinho-items').style.display = 'none';
          document.querySelector('.carrinho-vazio').style.display = 'block';
        }
      }, 300);
    });
  });

  // Aplicar cupom
  const applyCouponBtn = document.querySelector('.coupon-input .btn');
  if (applyCouponBtn) {
    applyCouponBtn.addEventListener('click', function() {
      const couponInput = document.getElementById('coupon');
      const coupon = couponInput.value.toUpperCase();

      if (coupon === 'VSHOPT10') {
        alert('Cupom VSHOPT10 aplicado! 10% de desconto concedido.');
        couponInput.disabled = true;
        this.textContent = 'Aplicado ✓';
        this.style.background = 'rgba(34, 197, 94, 0.2)';
        this.style.color = '#22c55e';
      } else if (coupon) {
        alert('Cupom inválido');
      }
    });
  }

  // Checkout
  const checkoutBtn = document.querySelector('.btn-primary:nth-of-type(1)');
  if (checkoutBtn && checkoutBtn.textContent.includes('Checkout')) {
    checkoutBtn.addEventListener('click', function() {
      alert('Redirecionando para checkout...');
      // Aqui você redirecionaria para a página de checkout
    });
  }

  updateTotal();
});

// Estilos de animação
const style = document.createElement('style');
style.textContent = `
  @keyframes slideOut {
    to {
      opacity: 0;
      transform: translateX(100%);
    }
  }
`;
document.head.appendChild(style);
