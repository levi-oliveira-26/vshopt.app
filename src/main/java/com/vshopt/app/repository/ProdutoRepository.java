package com.vshopt.app.repository;

import java.util.List;

import com.vshopt.app.model.Produto;

public interface ProdutoRepository {
    List<Produto> findAll();
    List<Produto> findByCategoria(String categoria);
    List<Produto> findAll(String categoria, String ordenacao);
    Produto findById(Long id);
    void save(Produto produto);
    void delete(Long id);
}