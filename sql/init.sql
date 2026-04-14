CREATE DATABASE RESERVASHOTEL;

CREATE TABLE HOTEL (
    hotel_id SERIAL PRIMARY KEY,
    hotel_name VARCHAR(100) NOT NULL,
    hotel_direction VARCHAR(255) NOT NULL,
    hotel_stars INT,
    hotel_phone VARCHAR(20)
);

CREATE TABLE CLIENTE (
    cliente_id SERIAL PRIMARY KEY,
    cliente_name VARCHAR(100) NOT NULL,
    cliente_email VARCHAR(100) UNIQUE NOT NULL,
    cliente_phone VARCHAR(100)
);

CREATE TABLE RESERVA (
    reserva_id SERIAL PRIMARY KEY,
    reserva_date_entrada TIMESTAMP NOT NULL,
    reserva_date_salida TIMESTAMP NOT NULL,
    reserva_num_huespedes INT DEFAULT 1,
    hotel_id INT NOT NULL,
    cliente_id INT NOT NULL,
    FOREIGN KEY (hotel_id) REFERENCES hotel(hotel_id),
    FOREIGN KEY (cliente_id) REFERENCES cliente(cliente_id)
);
