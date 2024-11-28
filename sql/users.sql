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

INSERT INTO sessions (id_usuario, active, jwt, logged_at) VALUES 
(2, true, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.def456', 'project1'),
(3, true, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ghi789', 'project2'),
(4, true, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.jkl101', 'unknow'),
(5, true, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mno112', 'project3'),
(6, true, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.pqr131', 'project1'),
(7, true, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.stu415', 'main'),
(8, true, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.vwx527', 'project2'),
(9, true, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.yzq639', 'unknow'),
(10, true, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.abc741', 'project3'),
(11, true, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.abc123', 'main');

INSERT INTO usuario (id_usuario, email, hash) VALUES
(2, 'usuario2@example.com', 'ab56b4d92b40713acc5af89985d4b786'),
(3, 'usuario3@example.com', '25d55ad283aa400af464c76d713c07ad'),
(4, 'usuario4@example.com', '6c569aabbf7775ef8fc570e228c16b98'),
(5, 'usuario5@example.com', 'd8578edf8458ce06fbc5bb76a58c5ca4'),
(6, 'usuario6@example.com', '5f4dcc3b5aa765d61d8327deb882cf99'),
(7, 'usuario7@example.com', '098f6bcd4621d373cade4e832627b4f6'),
(8, 'usuario8@example.com', '7c6a180b36896a0a8c02787eeafb0e4c'),
(9, 'usuario9@example.com', '8d969eef6ecad3c29a3a629280e686cf'),
(10, 'usuario10@example.com', '3c59dc048e8850243be8079a5c74d079'),
(11, 'usuario1@example.com', 'e99a18c428cb38d5f260853678922e03');