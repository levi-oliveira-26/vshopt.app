package com.vshopt.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controller para as novas telas do front-end
 * Responsável por servir as páginas de:
 * - Biblioteca
 * - Perfil do Usuário
 * - Carrinho de Compras
 * - Ofertas e Promoções
 * - Lista de Desejos
 * - Central de Suporte
 */
@Controller
public class PaginasController {

    /**
     * Página da Biblioteca do Usuário
     * Mostra todos os produtos adquiridos
     * 
     * URL: /biblioteca
     * Template: biblioteca.html
     */
    @GetMapping("/biblioteca")
    public String biblioteca() {
        return "biblioteca";
    }

    /**
     * Página de Perfil do Usuário
     * Gerenciamento de dados pessoais, endereços, pagamento, etc
     * 
     * URL: /perfil
     * Template: perfil.html
     */
    @GetMapping("/perfil")
    public String perfil() {
        return "perfil";
    }

    /**
     * Página do Carrinho de Compras
     * Mostra os itens do carrinho, totais e opções de checkout
     * 
     * URL: /carrinho
     * Template: carrinho.html
     */
    @GetMapping("/carrinho")
    public String carrinho() {
        return "carrinho";
    }

    /**
     * Página de Ofertas e Promoções
     * Mostra flash sales, bundles, early bird offers, etc
     * 
     * URL: /ofertas
     * Template: ofertas.html
     */
    @GetMapping("/ofertas")
    public String ofertas() {
        return "ofertas";
    }

    /**
     * Página de Lista de Desejos
     * Produtos que o usuário deseja adicionar no futuro
     * 
     * URL: /lista-desejos
     * Template: lista-desejos.html
     */
    @GetMapping("/lista-desejos")
    public String listaDesejos() {
        return "lista-desejos";
    }

    /**
     * Página da Central de Suporte
     * FAQ, formulário de suporte, canais de contato
     * 
     * URL: /suporte
     * Template: suporte.html
     */
    @GetMapping("/suporte")
    public String suporte() {
        return "suporte";
    }

}
