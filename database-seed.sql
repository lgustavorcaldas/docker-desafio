CREATE TABLE cards(
    id SERIAL,
    title text,
    body text,
    CONSTRAINT employees_pkey PRIMARY KEY (id)
);

INSERT INTO cards (title, body) VALUES ('Casa', 'Limpar banheiro'), ('Estudo', 'Terminar curso Udemy'), ('Trabalho', 'Estudar Ruby on Rails')