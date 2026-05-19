package com.vshopt.app.controller;

import java.util.List;

import com.vshopt.app.model.Produto;
import com.vshopt.app.repository.ProdutoRepository;
import com.vshopt.app.repository.ProdutoRepositoryImpl;

public class ProdutoController {
    
    private ProdutoRepository produtoRepository;
    
    public ProdutoController() {
        this.produtoRepository = new ProdutoRepositoryImpl();
    }
    
    /**
     * Obtém todos os produtos da vitrine
     */
    public List<Produto> obterVitrine() {
        return produtoRepository.findAll();
    }
    
    /**
     * Filtra produtos por categoria
     */
    public List<Produto> filtrarPorCategoria(String categoria) {
        if (categoria == null || categoria.isEmpty()) {
            return produtoRepository.findAll();
        }
        return produtoRepository.findByCategoria(categoria);
    }
    
    /**
     * Filtra e ordena produtos por categoria e preço
     * @param categoria - categoria do produto (null retorna todos)
     * @param ordenacao - "asc" (menor ao maior) ou "desc" (maior ao menor)
     */
    public List<Produto> filtrarEOrdenar(String categoria, String ordenacao) {
        List<Produto> resultado = (categoria == null || categoria.isEmpty()) 
            ? produtoRepository.findAll() 
            : produtoRepository.findByCategoria(categoria);
        
        if ("asc".equalsIgnoreCase(ordenacao)) {
            resultado.sort((p1, p2) -> Double.compare(p1.getPreco(), p2.getPreco()));
        } else if ("desc".equalsIgnoreCase(ordenacao)) {
            resultado.sort((p1, p2) -> Double.compare(p2.getPreco(), p1.getPreco()));
        }
        
        return resultado;
    }
    
    /**
     * Obtém todas as categorias disponíveis
     */
    public List<String> obterCategorias() {
        return produtoRepository.findAll().stream()
            .map(Produto::getCategoria)
            .distinct()
            .sorted()
            .toList();
    }
}