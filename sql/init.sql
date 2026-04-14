CREATE DATABASE RESERVASHOTEL;

CREATE TABLE HOTEL (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    estrellas INT,
    telefono VARCHAR(20)
);

CREATE TABLE CLIENTE (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(100)
);

CREATE TABLE RESERVA (
    id SERIAL PRIMARY KEY,
    fecha_entrada TIMESTAMP NOT NULL,
    fecha_salida TIMESTAMP NOT NULL,
    num_huespedes INT DEFAULT 1,
    hotel_id INT NOT NULL,
    cliente_id INT NOT NULL,
    FOREIGN KEY (hotel_id) REFERENCES hotel(id),
    FOREIGN KEY (cliente_id) REFERENCES cliente(id)
);
