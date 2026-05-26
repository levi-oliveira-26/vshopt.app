package com.vshopt.app.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.vshopt.app.model.Produto;

@Repository
public class ProdutoRepositoryImpl implements ProdutoRepository {

    private final ProdutoDAO produtoDAO;

    public ProdutoRepositoryImpl(ProdutoDAO produtoDAO) {
        this.produtoDAO = produtoDAO;
    }

    @Override
    public List<Produto> findAll() {
        return produtoDAO.findAll();
    }

    @Override
    public List<Produto> findByCategoria(String categoria) {
        return produtoDAO.findByCategoria(categoria);
    }

    @Override
    public List<Produto> findAll(String categoria, String ordenacao) {
        List<Produto> lista = (categoria == null || categoria.isEmpty())
                ? produtoDAO.findAll()
                : produtoDAO.findByCategoria(categoria);

        if ("asc".equalsIgnoreCase(ordenacao)) {
            lista.sort((p1, p2) -> Double.compare(p1.getPreco(), p2.getPreco()));
        } else if ("desc".equalsIgnoreCase(ordenacao)) {
            lista.sort((p1, p2) -> Double.compare(p2.getPreco(), p1.getPreco()));
        }

        return lista;
    }

    @Override
    public Produto findById(Long id) {
        return produtoDAO.findById(id);
    }

    @Override
    public void save(Produto produto) {
        produtoDAO.save(produto);
    }

    @Override
    public void delete(Long id) {
        produtoDAO.delete(id);
    }
}