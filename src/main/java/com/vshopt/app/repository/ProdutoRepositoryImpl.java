package com.vshopt.app.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.vshopt.app.model.Produto;

public class ProdutoRepositoryImpl implements ProdutoRepository {
    
    private final List<Produto> produtos = new ArrayList<>();
    
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
        List<Produto> resultado = (categoria == null || categoria.isEmpty())
                ? findAll()
                : findByCategoria(categoria);
        
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
        produtos.add(new Produto(1L, "E-book Mixagem Profissional", "Guia completo de técnicas de mixagem para faixas modernas e estúdio home studio.", 49.90, "E-book", "", 999));
        produtos.add(new Produto(2L, "Plugin EQ Vintage", "Equalizador analógico emulando timbres clássicos para mixagens com caráter.", 79.90, "Plugin", "", 999));
        produtos.add(new Produto(3L, "Curso Beatmaking Moderno", "Curso passo a passo para produzir instrumentais e beats com workflow profissional.", 119.90, "Curso", "", 999));
        produtos.add(new Produto(4L, "Sample Pack Drums", "Kit de baterias eletrônicas e acústicas para produções impactantes e atuais.", 39.90, "Sample Pack", "", 999));
        produtos.add(new Produto(5L, "Presets Synthwave", "Banco de presets para sintetizadores com timbres retrô e texturas modernas.", 29.90, "Presets", "", 999));
        produtos.add(new Produto(6L, "E-book Masterização Comercial", "Rotina de masterização para deixar suas faixas prontas para streaming e rádio.", 44.90, "E-book", "", 999));
    }
}