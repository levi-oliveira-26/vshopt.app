-- Schema para a tabela produto
CREATE TABLE IF NOT EXISTS produto (
  id BIGINT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  preco NUMERIC(10,2) NOT NULL,
  categoria VARCHAR(100),
  imagem VARCHAR(255),
  estoque INTEGER
);
