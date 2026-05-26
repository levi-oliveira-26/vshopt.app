package com.vshopt.app.repository;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.vshopt.app.model.Produto;

@Repository
public class ProdutoDAO {

    private final JdbcTemplate jdbcTemplate;

    public ProdutoDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private static final RowMapper<Produto> ROW_MAPPER = (rs, rowNum) ->
            new Produto(
                    rs.getLong("id"),
                    rs.getString("nome"),
                    rs.getString("descricao"),
                    rs.getDouble("preco"),
                    rs.getString("categoria"),
                    rs.getString("imagem"),
                    rs.getInt("estoque")
            );

    public List<Produto> findAll() {
        String sql = "SELECT id, nome, descricao, preco, categoria, imagem, estoque FROM produto";
        return jdbcTemplate.query(sql, ROW_MAPPER);
    }

    public List<Produto> findByCategoria(String categoria) {
        String sql = "SELECT id, nome, descricao, preco, categoria, imagem, estoque FROM produto WHERE lower(categoria) = lower(?)";
        return jdbcTemplate.query(sql, ROW_MAPPER, categoria);
    }

    public Produto findById(Long id) {
        String sql = "SELECT id, nome, descricao, preco, categoria, imagem, estoque FROM produto WHERE id = ?";
        List<Produto> results = jdbcTemplate.query(sql, ROW_MAPPER, id);
        return results.isEmpty() ? null : results.get(0);
    }

    public boolean existsById(Long id) {
        Integer count = jdbcTemplate.queryForObject("SELECT count(1) FROM produto WHERE id = ?", Integer.class, id);
        return count != null && count > 0;
    }

    public void save(Produto produto) {
        if (produto.getId() == null || !existsById(produto.getId())) {
            String sql = "INSERT INTO produto (id, nome, descricao, preco, categoria, imagem, estoque) VALUES (?, ?, ?, ?, ?, ?, ?)";
            jdbcTemplate.update(sql,
                    produto.getId(),
                    produto.getNome(),
                    produto.getDescricao(),
                    produto.getPreco(),
                    produto.getCategoria(),
                    produto.getImagem(),
                    produto.getEstoque());
        } else {
            update(produto);
        }
    }

    public void update(Produto produto) {
        String sql = "UPDATE produto SET nome = ?, descricao = ?, preco = ?, categoria = ?, imagem = ?, estoque = ? WHERE id = ?";
        jdbcTemplate.update(sql,
                produto.getNome(),
                produto.getDescricao(),
                produto.getPreco(),
                produto.getCategoria(),
                produto.getImagem(),
                produto.getEstoque(),
                produto.getId());
    }

    public void delete(Long id) {
        jdbcTemplate.update("DELETE FROM produto WHERE id = ?", id);
    }
}
