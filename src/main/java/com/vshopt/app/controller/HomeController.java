package com.vshopt.app.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.vshopt.app.model.Produto;
import com.vshopt.app.service.ProdutoService;

@Controller
public class HomeController {

    private final ProdutoService produtoService;

    public HomeController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @GetMapping("/")
    public String home(
            @RequestParam(required = false) String categoria,
            @RequestParam(required = false) String ordenacao,
            Model model) {

        List<Produto> produtos = produtoService.listarProdutos(categoria, ordenacao);
        model.addAttribute("produtos", produtos);
        model.addAttribute("categorias", produtoService.listarCategorias());
        model.addAttribute("categoria", categoria == null ? "" : categoria);
        model.addAttribute("ordenacao", ordenacao == null ? "" : ordenacao);

        return "index";
    }
}
