CREATE TABLE IF NOT EXISTS usuario (
    id_usuario SERIAL NOT NULL UNIQUE PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    hash TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
    id_usuario SERIAL NOT NULL UNIQUE,
    active BOOLEAN NOT NULL,
    jwt VARCHAR(200) NOT NULL,
    last_active TIMESTAMP DEFAULT now(),
    logged_at VARCHAR(20) CHECK (logged_at IN ('main', 'project1', 'project2', 'project3', 'unknow')),
    CONSTRAINT fk_id_usuario FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario)
);

INSERT INTO usuario(id_usuario, email, hash)
	VALUES (1, 'admin@interfocus.com.br', '$2b$10$WsyAhYD6ggL4xAXhs60KYOmBTGdXjXROike2JMlkBg1/Zypdxi12W');

-- Login: admin@interfocus.com.br
-- Senha: admin