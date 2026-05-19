package com.vshopt.app.repository;

import com.vshopt.app.model.Produto;
import java.util.*;
import java.util.stream.Collectors;

public class ProdutoRepositoryImpl implements ProdutoRepository {
    
    private List<Produto> produtos = new ArrayList<>();
    
    public ProdutoRepositoryImpl() {
        // Dados de exemplo
        inicializarProdutos();
    }

    @Override
    public List<Produto> findAll() {
        return new ArrayList<>(produtos);
    }

    @Override
    public List<Produto> findByCategoria(String categoria) {
        return produtos.stream()
                .filter(p -> p.getCategoria().equalsIgnoreCase(categoria))
                .collect(Collectors.toList());
    }

    @Override
    public List<Produto> findAll(String categoria, String ordenacao) {
        List<Produto> resultado = findByCategoria(categoria);
        
        if ("asc".equalsIgnoreCase(ordenacao)) {
            resultado.sort((p1, p2) -> Double.compare(p1.getPreco(), p2.getPreco()));
        } else if ("desc".equalsIgnoreCase(ordenacao)) {
            resultado.sort((p1, p2) -> Double.compare(p2.getPreco(), p1.getPreco()));
        }
        
        return resultado;
    }

    @Override
    public Produto findById(Long id) {
        return produtos.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    @Override
    public void save(Produto produto) {
        produtos.add(produto);
    }

    @Override
    public void delete(Long id) {
        produtos.removeIf(p -> p.getId().equals(id));
    }

    private void inicializarProdutos() {
        produtos.add(new Produto(1L, "Produto A", "Descrição A", 49.99, "Eletrônicos", "img1.jpg", 10));
        produtos.add(new Produto(2L, "Produto B", "Descrição B", 99.99, "Eletrônicos", "img2.jpg", 5));
        produtos.add(new Produto(3L, "Produto C", "Descrição C", 29.99, "Roupas", "img3.jpg", 15));
        produtos.add(new Produto(4L, "Produto D", "Descrição D", 149.99, "Eletrônicos", "img4.jpg", 3));
    }
}