-- Criação do banco de dados
CREATE DATABASE condominio;
USE condominio;

-- Tabela de blocos
CREATE TABLE blocos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(50) NOT NULL UNIQUE
);

-- Tabela de moradores
CREATE TABLE moradores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  cpf VARCHAR(14) NOT NULL UNIQUE,
  telefone VARCHAR(20),
  bloco_id INT,
  FOREIGN KEY (bloco_id) REFERENCES blocos(id)
);

-- Tabela de apartamentos
CREATE TABLE apartamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  numero VARCHAR(10) NOT NULL,
  andar INT NOT NULL,
  bloco_id INT NOT NULL,
  morador_id INT,
  UNIQUE (numero, bloco_id),
  FOREIGN KEY (bloco_id) REFERENCES blocos(id),
  FOREIGN KEY (morador_id) REFERENCES moradores(id)
);

-- Tabela de referência (mês/ano)
CREATE TABLE referencia (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mes INT NOT NULL CHECK (mes BETWEEN 1 AND 12),
  ano INT NOT NULL,
  UNIQUE (mes, ano)
);

-- Tabela de pagamentos
CREATE TABLE pagamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  morador_id INT NOT NULL,
  referencia_id INT NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  data_pagamento DATE,
  FOREIGN KEY (morador_id) REFERENCES moradores(id),
  FOREIGN KEY (referencia_id) REFERENCES referencia(id),
  UNIQUE (morador_id, referencia_id)
);

-- Tabela de tipos de manutenção
CREATE TABLE tipos_manutencao (
  id INT AUTO_INCREMENT PRIMARY KEY,
  descricao VARCHAR(100) NOT NULL UNIQUE
);

-- Tabela de manutenções
CREATE TABLE manutencoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo_id INT NOT NULL,
  data DATE NOT NULL,
  local VARCHAR(100) NOT NULL,
  FOREIGN KEY (tipo_id) REFERENCES tipos_manutencao(id)
);

-- Dados iniciais (opcional)
INSERT INTO blocos (nome) VALUES ('Bloco A'), ('Bloco B');

INSERT INTO tipos_manutencao (descricao) VALUES 
  ('Pintura'),
  ('Limpeza'),
  ('Reparo Elétrico'),
  ('Reparo Hidráulico');