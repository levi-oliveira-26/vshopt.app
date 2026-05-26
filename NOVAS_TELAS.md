# 📱 Novas Telas do Front-end VSHOPT

Este documento descreve todas as novas telas desenvolvidas para a plataforma VSHOPT.

## 📂 Estrutura de Pastas Criadas

```
src/main/resources/
├── static/
│   ├── css/
│   │   ├── biblioteca.css
│   │   ├── perfil.css
│   │   ├── carrinho.css
│   │   ├── ofertas.css
│   │   ├── lista-desejos.css
│   │   └── suporte.css
│   ├── js/
│   │   ├── biblioteca.js
│   │   ├── perfil.js
│   │   ├── carrinho.js
│   │   ├── ofertas.js
│   │   ├── lista-desejos.js
│   │   └── suporte.js
│   └── images/
│       ├── (Adicione suas imagens aqui)
│       ├── placeholder-ebook.png
│       ├── placeholder-curso.png
│       ├── placeholder-plugin.png
│       ├── placeholder-sample.png
│       ├── placeholder-preset.png
│       └── avatar-placeholder.png
└── templates/
    ├── biblioteca.html
    ├── perfil.html
    ├── carrinho.html
    ├── ofertas.html
    ├── lista-desejos.html
    └── suporte.html
```

## 📄 Telas Desenvolvidas

### 1. **Biblioteca** (`/biblioteca`)
**Arquivo:** `biblioteca.html`

Tela que mostra todos os produtos adquiridos pelo usuário.

**Funcionalidades:**
- 📚 Visualizar todos os produtos adquiridos
- 🔍 Buscar produtos por nome
- 🏷️ Filtrar por tipo (E-books, Cursos, Plugins, Samples, Presets)
- 📊 Ordenar por: Mais recentes, A-Z, Z-A
- 📥 Baixar produtos
- 👀 Visualizar/Continuar cursos
- ⚙️ Atualizar plugins
- 📋 Barra de progresso para cursos

**CSS:** `biblioteca.css` - Design responsivo com cards modernos

**JS:** `biblioteca.js` - Filtros e busca em tempo real

---

### 2. **Perfil do Usuário** (`/perfil`)
**Arquivo:** `perfil.html`

Gerenciamento completo da conta do usuário.

**Funcionalidades:**
- 👤 Informações Pessoais (editar dados)
- 📍 Endereços (adicionar, editar, remover)
- 💳 Métodos de Pagamento
- 📦 Histórico de Pedidos
- 🔔 Notificações (preferências)
- 🔒 Segurança (senha, 2FA, dispositivos)
- 🎨 Avatar customizável

**Abas:**
- Informações
- Endereços
- Pagamento
- Pedidos
- Notificações
- Segurança

**CSS:** `perfil.css` - Layout em duas colunas com sidebar

**JS:** `perfil.js` - Navegação entre abas e validações

---

### 3. **Carrinho de Compras** (`/carrinho`)
**Arquivo:** `carrinho.html`

Sistema completo de carrinho de compras.

**Funcionalidades:**
- 🛒 Listar itens do carrinho
- ➕➖ Aumentar/diminuir quantidade
- ❌ Remover itens
- 💰 Cálculo automático de subtotal
- 🏷️ Aplicar cupom de desconto
- 📊 Resumo de preços em tempo real
- 🎁 Produtos relacionados sugeridos
- ✓ Validações de quantidade

**CSS:** `carrinho.css` - Layout responsivo com grade

**JS:** `carrinho.js` - Gerenciamento de carrinho e cálculos

---

### 4. **Ofertas e Promoções** (`/ofertas`)
**Arquivo:** `ofertas.html`

Página de ofertas especiais e promoções.

**Funcionalidades:**
- ⚡ Flash Sales (com animação pulsante)
- 🎁 Bundle Deals
- 🌅 Early Bird Offers
- ☀️ Seasonal Offers
- 🆕 First Time Buyer Discounts
- ⏱️ Contador regressivo de ofertas
- 📧 Newsletter signup
- 🔍 Filtros por categoria
- 💳 Mostrar preço original e desconto

**CSS:** `ofertas.css` - Design vibrante com gradientes

**JS:** `ofertas.js` - Filtros, countdown e validações

---

### 5. **Lista de Desejos** (`/lista-desejos`)
**Arquivo:** `lista-desejos.html`

Gerenciamento de produtos desejados.

**Funcionalidades:**
- ❤️ Adicionar/remover da lista (com animação)
- 🔍 Buscar produtos
- 📊 Diferentes visualizações (grade/lista)
- 📈 Ordenação (nome, preço, data)
- ⭐ Avaliações de produtos
- 💬 Compartilhar lista
- 🛒 Comprar tudo de uma vez
- 📊 Resumo de preços e economia

**CSS:** `lista-desejos.css` - Cards com efeito hover

**JS:** `lista-desejos.js` - Gerenciamento de lista e compartilhamento

---

### 6. **Central de Suporte** (`/suporte`)
**Arquivo:** `suporte.html`

Sistema completo de suporte ao cliente.

**Funcionalidades:**
- 💬 Chat ao Vivo (24/7)
- 📧 Enviar Email
- 📞 Agendar Ligação
- 📝 Criar Ticket de Suporte
- ❓ FAQ com 6+ perguntas frequentes (collapse)
- 📚 Categorias de Ajuda (Account, Compras, Downloads, Produtos, Reembolso)
- 🔍 Buscar na ajuda
- 📊 Status dos Serviços (indicadores em tempo real)
- 📋 Formulário de suporte com anexos

**CSS:** `suporte.css` - Design clean com cores dinâmicas

**JS:** `suporte.js` - Collapsa FAQ, roteamento de suporte

---

## 🎨 Recursos de Design

### Paleta de Cores
- **Primária:** `#38bdf8` (Azul claro)
- **Secundária:** `#0ea5e9` (Azul escuro)
- **Fundo:** `#0f172a` (Azul muito escuro)
- **Superfícies:** `#111827` (Cinza escuro)
- **Texto:** `#e2e8f0` (Cinza claro)
- **Acentos:** Verde (#22c55e), Laranja (#f97316), Roxo (#a855f7)

### Características de Design
✨ **Tema Escuro Moderno** - Reduz fadiga ocular
✨ **Responsivo** - Funciona em mobile, tablet e desktop
✨ **Animações Suaves** - Transições e efeitos visuais
✨ **Tipografia Clara** - Font Inter com bom contraste
✨ **Acessibilidade** - Labels, aria-labels e navegação por teclado

---

## 📦 Pasta de Imagens

A pasta `src/main/resources/static/images/` foi criada para armazenar:

- **Placeholders:** 
  - `placeholder-ebook.png`
  - `placeholder-curso.png`
  - `placeholder-plugin.png`
  - `placeholder-sample.png`
  - `placeholder-preset.png`
  - `placeholder-bundle.png`

- **Avatares:**
  - `avatar-placeholder.png`

### Como Adicionar Imagens
1. Coloque seus arquivos PNG/JPG/WebP em `src/main/resources/static/images/`
2. Atualize os URLs nos HTML de `@{/images/seu-arquivo.png}`
3. Recompile o projeto

---

## 🔗 Rotas Recomendadas (Backend)

Adicione essas rotas no seu Controller Java:

```java
@GetMapping("/biblioteca")
public String biblioteca(Model model) {
    return "biblioteca";
}

@GetMapping("/perfil")
public String perfil(Model model) {
    return "perfil";
}

@GetMapping("/carrinho")
public String carrinho(Model model) {
    return "carrinho";
}

@GetMapping("/ofertas")
public String ofertas(Model model) {
    return "ofertas";
}

@GetMapping("/lista-desejos")
public String listaDesejos(Model model) {
    return "lista-desejos";
}

@GetMapping("/suporte")
public String suporte(Model model) {
    return "suporte";
}
```

---

## 🚀 Funcionalidades JavaScript

### Biblioteca
- ✅ Filtro em tempo real
- ✅ Ordenação dinâmica
- ✅ Animação de entrada

### Perfil
- ✅ Navegação entre abas
- ✅ Collapsa FAQ (se integrado)
- ✅ Validação de formulários
- ✅ Animação de toggle switches

### Carrinho
- ✅ Cálculo de totais em tempo real
- ✅ Validação de quantidade
- ✅ Aplicar cupom VSHOPT10 (demo)
- ✅ Remover itens com animação

### Ofertas
- ✅ Filtros por categoria
- ✅ Countdown regressivo (atualiza a cada minuto)
- ✅ Newsletter signup
- ✅ Adicionar ao carrinho com feedback

### Lista de Desejos
- ✅ Toggle like/unlike com animação
- ✅ Busca em tempo real
- ✅ Ordenação customizável
- ✅ Visualização grid/lista
- ✅ Compartilhamento
- ✅ Compra em lote

### Suporte
- ✅ FAQ colapsável com autoclose
- ✅ Roteamento de canais (Chat, Email, Telefone, Ticket)
- ✅ Criação de tickets
- ✅ Busca de ajuda

---

## 📱 Responsividade

Todas as telas são totalmente responsivas com breakpoints em:
- **Desktop:** 1120px (padrão)
- **Tablet:** 768px
- **Mobile:** < 600px

---

## 🔐 Dados de Demo

### Cupom
- Código: `VSHOPT10`
- Desconto: 10%

### Usuário Demo (Perfil)
- Nome: João Silva Santos
- Email: joao@example.com
- Desde: 2024

---

## 📝 Próximas Etapas

1. Integrar com backend para carregar dados reais
2. Criar endpoints API para cada funcionalidade
3. Implementar sistema de autenticação
4. Adicionar imagens reais
5. Testes de performance
6. Otimização SEO

---

## 🎯 Como Usar

1. **Desenvolver:** As telas já estão prontas, apenas conecte com o backend
2. **Testar:** Abra cada página HTML no navegador
3. **Personalizar:** Edite CSS para mudar cores/espaçamento
4. **Integrar:** Conecte os formulários com APIs do backend

---

**Versão:** 1.0  
**Última Atualização:** 26 de maio de 2024  
**Desenvolvido para:** VSHOPT - Loja Digital de Produção Musical

---
