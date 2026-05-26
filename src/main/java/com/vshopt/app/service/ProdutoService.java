package com.vshopt.app.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.vshopt.app.model.Produto;
import com.vshopt.app.repository.ProdutoRepository;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public List<Produto> listarProdutos(String categoria, String ordenacao) {
        List<Produto> produtos = (categoria == null || categoria.isEmpty())
                ? produtoRepository.findAll()
                : produtoRepository.findByCategoria(categoria);

        if ("asc".equalsIgnoreCase(ordenacao)) {
            produtos.sort((p1, p2) -> Double.compare(p1.getPreco(), p2.getPreco()));
        } else if ("desc".equalsIgnoreCase(ordenacao)) {
            produtos.sort((p1, p2) -> Double.compare(p2.getPreco(), p1.getPreco()));
        }

        return produtos;
    }

    public List<String> listarCategorias() {
        return produtoRepository.findAll().stream()
                .map(Produto::getCategoria)
                .distinct()
                .sorted()
                .toList();
    }
}
