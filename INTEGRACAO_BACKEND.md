# 🔗 Guia de Integração com Backend

Este guia mostra como conectar os dados do backend Java/Spring com as novas telas Thymeleaf.

## 📋 Estrutura Recomendada

### 1. DTOs (Data Transfer Objects)

```java
// BibliotecaDTO.java
public class BibliotecaDTO {
    private Long id;
    private String titulo;
    private String autor;
    private String tipo; // ebook, curso, plugin, sample, preset
    private String urlDownload;
    private LocalDate dataAquisicao;
    private Double progresso; // Para cursos (0-100)
    private String statusLicenca; // Para plugins
}

// PerfilDTO.java
public class PerfilDTO {
    private Long usuarioId;
    private String nome;
    private String email;
    private String telefone;
    private LocalDate dataNascimento;
    private String bio;
    private List<EnderecoDTO> enderecos;
    private List<CartaoPagamentoDTO> cartoes;
    private List<PedidoDTO> pedidos;
}

// CarrinhoDTO.java
public class CarrinhoDTO {
    private Long usuarioId;
    private List<ItemCarrinhoDTO> itens;
    private Double subtotal;
    private Double desconto;
    private Double total;
}

// OfertaDTO.java
public class OfertaDTO {
    private Long id;
    private String titulo;
    private Double precoOriginal;
    private Double precoDesconto;
    private Integer percentualDesconto;
    private String tipo; // flash-sale, bundle-deal, early-bird, seasonal
    private LocalDateTime dataFim;
}

// DesejoDTO.java
public class DesejoDTO {
    private Long id;
    private String titulo;
    private String autor;
    private Double preco;
    private String urlImagem;
    private LocalDate dataAdicao;
    private Double avaliacao;
    private Integer numReviews;
}
```

---

## 🔄 Services

```java
// BibliotecaService.java
@Service
@Slf4j
public class BibliotecaService {
    
    @Autowired
    private ProdutoRepository produtoRepository;
    
    public List<BibliotecaDTO> obterBibliotecaUsuario(Long usuarioId) {
        return produtoRepository.findByUsuarioId(usuarioId)
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    public List<BibliotecaDTO> filtrarPorTipo(Long usuarioId, String tipo) {
        return produtoRepository.findByUsuarioIdAndTipo(usuarioId, tipo)
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    private BibliotecaDTO convertToDTO(Produto produto) {
        BibliotecaDTO dto = new BibliotecaDTO();
        dto.setId(produto.getId());
        dto.setTitulo(produto.getNome());
        dto.setAutor(produto.getAutor());
        dto.setTipo(produto.getTipo());
        return dto;
    }
}
```

---

## 📄 Controllers com Dados

### BibliotecaController

```java
@Controller
@RequestMapping("/biblioteca")
@Slf4j
public class BibliotecaController {
    
    @Autowired
    private BibliotecaService bibliotecaService;
    
    @GetMapping
    public String biblioteca(
        @RequestParam(required = false) String tipo,
        @RequestParam(required = false) String ordenacao,
        Model model,
        Principal principal) {
        
        Long usuarioId = obterUsuarioId(principal);
        List<BibliotecaDTO> produtos;
        
        if (tipo != null && !tipo.isEmpty()) {
            produtos = bibliotecaService.filtrarPorTipo(usuarioId, tipo);
        } else {
            produtos = bibliotecaService.obterBibliotecaUsuario(usuarioId);
        }
        
        // Ordenação
        if ("nome-asc".equals(ordenacao)) {
            produtos.sort(Comparator.comparing(BibliotecaDTO::getTitulo));
        } else if ("nome-desc".equals(ordenacao)) {
            produtos.sort(Comparator.comparing(BibliotecaDTO::getTitulo).reversed());
        } else {
            produtos.sort(Comparator.comparing(BibliotecaDTO::getDataAquisicao).reversed());
        }
        
        model.addAttribute("produtos", produtos);
        return "biblioteca";
    }
}
```

---

## 🎯 Integração no Thymeleaf

### Biblioteca

```html
<!-- biblioteca.html -->
<div class="biblioteca-grid">
    <div th:each="produto : ${produtos}" class="biblioteca-card">
        <div class="card-image">
            <img th:src="@{/images/placeholder-} + ${produto.tipo} + '.png'" 
                 th:alt="${produto.titulo}">
            <span class="card-badge" th:classappend="'tipo-' + ${produto.tipo}" 
                  th:text="${produto.tipo}"></span>
        </div>
        <div class="card-content">
            <h3 th:text="${produto.titulo}"></h3>
            <p class="card-autor" th:text="${produto.autor}"></p>
            
            <!-- Progresso para cursos -->
            <div th:if="${produto.progresso}" class="progress-bar">
                <div class="progress-fill" th:style="'width: ' + ${produto.progresso} + '%'"></div>
            </div>
            <p class="progress-text" th:if="${produto.progresso}" 
               th:text="${produto.progresso} + '% completo'"></p>
            
            <!-- Status para plugins -->
            <div th:if="${produto.statusLicenca}" class="card-meta">
                <span class="status-ativo" th:text="${produto.statusLicenca}"></span>
            </div>
        </div>
    </div>
</div>

<!-- Exibir mensagem vazia se não houver produtos -->
<div th:if="${#lists.isEmpty(produtos)}" class="biblioteca-empty">
    <div class="empty-icon">📚</div>
    <h2>Nenhum produto encontrado</h2>
    <p>Sua biblioteca está vazia. Comece a explorar nossos produtos!</p>
    <a href="/" class="btn btn-primary">Explorar Produtos</a>
</div>
```

---

### Carrinho

```html
<!-- carrinho.html -->
<div class="carrinho-items">
    <div th:each="item : ${carrinho.itens}" class="carrinho-item">
        <div class="item-image">
            <img th:src="${item.urlImagem}" th:alt="${item.titulo}">
        </div>
        <div class="item-info">
            <h3 th:text="${item.titulo}"></h3>
            <p class="card-autor" th:text="${item.autor}"></p>
        </div>
        <div class="item-quantidade">
            <button class="qty-btn">−</button>
            <input type="number" th:value="${item.quantidade}" min="1" class="qty-input">
            <button class="qty-btn">+</button>
        </div>
        <div class="item-preco">
            <span class="preco" th:text="'R$ ' + ${item.precoTotal}"></span>
        </div>
    </div>
</div>

<!-- Resumo -->
<div class="resumo-card">
    <div class="resumo-row">
        <span>Subtotal:</span>
        <span class="valor" th:text="'R$ ' + ${carrinho.subtotal}"></span>
    </div>
    <div class="resumo-row" th:if="${carrinho.desconto > 0}">
        <span>Desconto:</span>
        <span class="valor desconto" th:text="'-R$ ' + ${carrinho.desconto}"></span>
    </div>
    <div class="resumo-total">
        <span>Total:</span>
        <span class="valor-total" th:text="'R$ ' + ${carrinho.total}"></span>
    </div>
</div>
```

---

### Ofertas

```html
<!-- ofertas.html -->
<div class="ofertas-grid">
    <div th:each="oferta : ${ofertas}" th:classappend="${oferta.tipo} + '-deal'" class="oferta-card">
        <div class="badge-container">
            <span class="badge" th:classappend="'badge-' + ${oferta.tipo}" 
                  th:text="${oferta.tipo.toUpperCase()}"></span>
            <span class="badge badge-desconto" 
                  th:text="${oferta.percentualDesconto} + '% OFF'"></span>
        </div>
        <div class="card-image">
            <img th:src="${oferta.urlImagem}" th:alt="${oferta.titulo}">
        </div>
        <div class="card-content">
            <h3 th:text="${oferta.titulo}"></h3>
            <div class="preco-container">
                <span class="preco-original" th:text="'R$ ' + ${oferta.precoOriginal}"></span>
                <span class="preco-desconto" th:text="'R$ ' + ${oferta.precoDesconto}"></span>
            </div>
            <p class="economia" th:text="'Economize: R$ ' + ${oferta.precoOriginal - oferta.precoDesconto}"></p>
        </div>
    </div>
</div>
```

---

### Perfil

```html
<!-- perfil.html -->
<div class="tab-content active" id="tab-informacoes">
    <form class="form-grid">
        <div class="form-group">
            <label for="nome">Nome Completo</label>
            <input type="text" id="nome" th:value="${perfil.nome}" class="form-input">
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" th:value="${perfil.email}" class="form-input">
        </div>
        <div class="form-group">
            <label for="telefone">Telefone</label>
            <input type="tel" id="telefone" th:value="${perfil.telefone}" class="form-input">
        </div>
    </form>
</div>

<!-- Endereços -->
<div class="endereco-list">
    <div th:each="endereco : ${perfil.enderecos}" class="endereco-card">
        <h3 th:text="${endereco.tipo}"></h3>
        <p th:text="${endereco.rua} + ', ' + ${endereco.numero}"></p>
        <p th:text="${endereco.cidade} + ', ' + ${endereco.estado} + ' ' + ${endereco.cep}"></p>
    </div>
</div>
```

---

### Lista de Desejos

```html
<!-- lista-desejos.html -->
<div class="desejos-grid">
    <div th:each="desejo : ${desejos}" class="desejo-card">
        <div class="card-image">
            <img th:src="${desejo.urlImagem}" th:alt="${desejo.titulo}">
        </div>
        <div class="card-content">
            <h3 th:text="${desejo.titulo}"></h3>
            <p class="card-autor" th:text="${desejo.autor}"></p>
            <div class="card-preco">
                <span class="preco-atual" th:text="'R$ ' + ${desejo.preco}"></span>
            </div>
            <div class="card-rating">
                <span class="reviews" th:text="'(' + ${desejo.numReviews} + ' reviews)'"></span>
            </div>
        </div>
    </div>
</div>

<!-- Resumo -->
<div class="resumo-card">
    <p><strong>Total de produtos:</strong> <span th:text="${#lists.size(desejos)}"></span></p>
    <p><strong>Valor total:</strong> <span th:text="'R$ ' + ${totalDesejo}"></span></p>
</div>
```

---

## 🔐 Segurança

### Autenticação (usando Spring Security)

```java
@Controller
@RequestMapping("/biblioteca")
public class BibliotecaController {
    
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public String biblioteca(Model model, Principal principal) {
        String email = principal.getName();
        Usuario usuario = usuarioService.findByEmail(email);
        
        List<BibliotecaDTO> produtos = bibliotecaService.obterBibliotecaUsuario(usuario.getId());
        model.addAttribute("produtos", produtos);
        
        return "biblioteca";
    }
}
```

---

## 💾 Banco de Dados

### Tabelas Necessárias

```sql
-- Biblioteca (relação de usuário com produtos)
CREATE TABLE usuario_produtos (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    usuario_id BIGINT NOT NULL,
    produto_id BIGINT NOT NULL,
    data_aquisicao DATETIME DEFAULT CURRENT_TIMESTAMP,
    progresso_curso DECIMAL(5,2),
    licenca_ativa BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

-- Ofertas
CREATE TABLE ofertas (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    preco_original DECIMAL(10,2),
    preco_desconto DECIMAL(10,2),
    percentual_desconto INT,
    tipo VARCHAR(50), -- flash-sale, bundle, early-bird, seasonal
    data_inicio DATETIME,
    data_fim DATETIME,
    ativa BOOLEAN DEFAULT TRUE
);

-- Lista de Desejos
CREATE TABLE lista_desejos (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    usuario_id BIGINT NOT NULL,
    produto_id BIGINT NOT NULL,
    data_adicao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

-- Carrinho
CREATE TABLE carrinhos (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    usuario_id BIGINT NOT NULL UNIQUE,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE carrinho_itens (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    carrinho_id BIGINT NOT NULL,
    produto_id BIGINT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2),
    FOREIGN KEY (carrinho_id) REFERENCES carrinhos(id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

-- Cupons
CREATE TABLE cupons (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    desconto_percentual INT,
    desconto_fixo DECIMAL(10,2),
    uso_maximo INT,
    uso_atual INT DEFAULT 0,
    data_inicio DATETIME,
    data_fim DATETIME,
    ativo BOOLEAN DEFAULT TRUE
);
```

---

## 🧪 Exemplo de Teste

```java
@SpringBootTest
@WebMvcTest(BibliotecaController.class)
public class BibliotecaControllerTest {
    
    @MockBean
    private BibliotecaService bibliotecaService;
    
    @Autowired
    private MockMvc mockMvc;
    
    @Test
    public void testBibliotecaPage() throws Exception {
        List<BibliotecaDTO> produtos = Arrays.asList(
            new BibliotecaDTO(1L, "Mixing Essentials", "Studio Pro", "ebook", LocalDate.now())
        );
        
        when(bibliotecaService.obterBibliotecaUsuario(anyLong())).thenReturn(produtos);
        
        mockMvc.perform(get("/biblioteca"))
            .andExpect(status().isOk())
            .andExpect(view().name("biblioteca"));
    }
}
```

---

## 📚 Recursos Úteis

- [Thymeleaf Documentation](https://www.thymeleaf.org/)
- [Spring MVC Documentation](https://spring.io/projects/spring-framework)
- [Spring Security](https://spring.io/projects/spring-security)

---

**Última Atualização:** 26 de maio de 2024
