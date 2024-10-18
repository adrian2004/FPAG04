CREATE TABLE IF NOT EXISTS usuario (
    id_usuario SERIAL NOT NULL UNIQUE PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    hash TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
    id_usuario SERIAL NOT NULL,
    active BOOLEAN NOT NULL,
    CONSTRAINT fk_id_usuario FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario)
);