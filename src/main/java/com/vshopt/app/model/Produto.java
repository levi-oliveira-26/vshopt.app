package com.vshopt.app.model;

public class Produto {
    private Long id;
    private String nome;
    private String descricao;
    private Double preco;
    private String categoria;
    private String imagem;
    private int estoque;

    // Constructors
    public Produto() {}

    public Produto(Long id, String nome, String descricao, Double preco, 
                   String categoria, String imagem, int estoque) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.categoria = categoria;
        this.imagem = imagem;
        this.estoque = estoque;
    }

    // Getters
    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getDescricao() { return descricao; }
    public Double getPreco() { return preco; }
    public String getCategoria() { return categoria; }
    public String getImagem() { return imagem; }
    public int getEstoque() { return estoque; }
}