-- ============================================================
-- BANCO: sistema_vendas
-- ============================================================

CREATE DATABASE sistema_vendas
    WITH OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'pt_BR.UTF-8'
    LC_CTYPE = 'pt_BR.UTF-8'
    TEMPLATE template0;

\c sistema_vendas;

-- ============================================================
-- TABELAS
-- ============================================================

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE,
    cidade VARCHAR(100),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    preco NUMERIC(10,2) CHECK (preco >= 0),
    ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    cliente_id INT NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
    data DATE DEFAULT CURRENT_DATE,
    status VARCHAR(20) CHECK (status IN ('PENDENTE','PAGO','CANCELADO')),
    total NUMERIC(12,2) CHECK (total >= 0) DEFAULT 0
);

CREATE TABLE itens_pedido (
    id SERIAL PRIMARY KEY,
    pedido_id INT NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
    produto_id INT NOT NULL REFERENCES produtos(id) ON DELETE RESTRICT,
    qtd INT CHECK (qtd > 0),
    preco_unit NUMERIC(10,2) CHECK (preco_unit >= 0)
);

CREATE TABLE pagamentos (
    id SERIAL PRIMARY KEY,
    pedido_id INT NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
    valor NUMERIC(12,2) CHECK (valor > 0),
    forma VARCHAR(30) CHECK (forma IN ('PIX','CARTAO','BOLETO','DINHEIRO')),
    pago_em DATE DEFAULT CURRENT_DATE
);

CREATE TABLE cupons (
    id SERIAL PRIMARY KEY,
    pedido_id INT NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
    codigo VARCHAR(50),
    desconto NUMERIC(5,2) CHECK (desconto >= 0)
);

-- ============================================================
-- ÍNDICES
-- ============================================================
CREATE INDEX idx_pedidos_cliente     ON pedidos(cliente_id);
CREATE INDEX idx_pedidos_data        ON pedidos(data);
CREATE INDEX idx_itens_pedido_pedido ON itens_pedido(pedido_id);
CREATE INDEX idx_pagamentos_pedido   ON pagamentos(pedido_id);
CREATE INDEX idx_produtos_categoria  ON produtos(categoria);

-- ============================================================
-- DADOS FIXOS DE PRODUTOS (CATÁLOGO)
-- ============================================================
INSERT INTO produtos (nome, categoria, preco) VALUES
('Notebook Lenovo', 'Informática', 3500.00),
('Mouse Logitech', 'Acessórios', 150.00),
('Teclado Mecânico', 'Acessórios', 480.00),
('Cadeira Gamer', 'Móveis', 1200.00),
('Monitor LG 24"', 'Informática', 950.00),
('Headset Redragon', 'Acessórios', 390.00),
('Smartphone Samsung', 'Telefonia', 2800.00),
('Cabo HDMI 2m', 'Acessórios', 45.00),
('SSD Kingston 1TB', 'Informática', 650.00),
('Impressora HP', 'Periféricos', 750.00);

-- ============================================================
-- GERAÇÃO AUTOMÁTICA DE 10.000 REGISTROS
-- ============================================================

DO $$
DECLARE
    i INT;
    j INT;
    n_itens INT;
    v_cliente INT;
    v_produto INT;
    v_preco NUMERIC;
    v_qtd INT;
    v_total NUMERIC;
    v_status TEXT;
    v_forma TEXT;
BEGIN
    RAISE NOTICE 'Gerando 10.000 clientes, pedidos e registros auxiliares...';

    -- CLIENTES
    FOR i IN 1..10000 LOOP
        INSERT INTO clientes (nome, email, cidade)
        VALUES (
            'Cliente_' || i,
            'cliente' || i || '@email.com',
            CASE (i % 5)
                WHEN 0 THEN 'Manaus'
                WHEN 1 THEN 'Belém'
                WHEN 2 THEN 'Boa Vista'
                WHEN 3 THEN 'Porto Velho'
                ELSE 'Macapá'
            END
        );
    END LOOP;

    -- PEDIDOS, ITENS, PAGAMENTOS, CUPONS
    FOR i IN 1..10000 LOOP
        v_cliente := ((i - 1) % 10000) + 1;
        v_status := (ARRAY['PENDENTE','PAGO','CANCELADO'])[1 + (random()*2)::INT];
        v_total := 0;

        INSERT INTO pedidos (cliente_id, data, status)
        VALUES (v_cliente,
                DATE '2024-01-01' + (random()*700)::INT,
                v_status)
        RETURNING id INTO j;

        -- entre 1 e 5 itens
        n_itens := 1 + (random()*4)::INT;
        FOR v_qtd IN 1..n_itens LOOP
            v_produto := 1 + (random()*9)::INT;
            SELECT preco INTO v_preco FROM produtos WHERE id = v_produto;
            INSERT INTO itens_pedido (pedido_id, produto_id, qtd, preco_unit)
            VALUES (j, v_produto, 1 + (random()*5)::INT, v_preco);
            v_total := v_total + (v_preco * (1 + (random()*5)::INT));
        END LOOP;

        UPDATE pedidos SET total = v_total WHERE id = j;

        -- PAGAMENTO se pedido pago
        IF v_status = 'PAGO' THEN
            v_forma := (ARRAY['PIX','CARTAO','BOLETO','DINHEIRO'])[1 + (random()*3)::INT];
            INSERT INTO pagamentos (pedido_id, valor, forma, pago_em)
            VALUES (j, v_total, v_forma, DATE '2024-01-01' + (random()*700)::INT);
        END IF;

        -- CUPOM aleatório
        IF random() < 0.15 THEN
            INSERT INTO cupons (pedido_id, codigo, desconto)
            VALUES (j, 'CUPOM' || (100 + (random()*900)::INT), (random()*30)::NUMERIC(5,2));
        END IF;
    END LOOP;

    RAISE NOTICE 'Concluído com sucesso.';
END $$;

-- ============================================================
-- VALIDAÇÃO RÁPIDA
-- ============================================================
SELECT
  (SELECT COUNT(*) FROM clientes)  AS clientes,
  (SELECT COUNT(*) FROM pedidos)   AS pedidos,
  (SELECT COUNT(*) FROM itens_pedido) AS itens,
  (SELECT COUNT(*) FROM pagamentos) AS pagamentos,
  (SELECT COUNT(*) FROM cupons) AS cupons;
