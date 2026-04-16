-- Hoteles
INSERT INTO hotel (nombre, direccion, estrellas, telefono) VALUES
  ('Hotel Gran Pacífico',    'Av. del Mar 100, Cancún, Q.R.',        5, '+52-998-123-4567'),
  ('Posada Los Pinos',       'Calle Roble 45, Guadalajara, Jal.',    3, '+52-333-987-6543'),
  ('Hotel Centro Histórico', 'Plaza Mayor 12, Ciudad de México',     4, '+52-55-2345-6789'),
  ('Resort Playa Azul',      'Blvd. Costero 200, Los Cabos, B.C.S.', 5, '+52-624-555-0101'),
  ('Hostal El Viajero',      'Calle Insurgentes 77, Oaxaca, Oax.',   2, NULL);

-- Clientes
INSERT INTO cliente (nombre, email, telefono) VALUES
  ('Ana García López',      'ana.garcia@email.com',    '+52-55-1111-2222'),
  ('Carlos Martínez Ruiz',  'carlos.mtz@email.com',   '+52-33-3333-4444'),
  ('Laura Sánchez Vega',    'laura.sv@email.com',     '+52-998-555-6666'),
  ('Pedro Jiménez Torres',  'pedro.jt@email.com',     NULL),
  ('María Flores Mendoza',  'maria.flores@email.com', '+52-624-777-8888'),
  ('Roberto Luna Cruz',     'roberto.lc@email.com',  '+52-951-999-0000');

-- Reservas: pasadas, activas y futuras para cubrir distintos escenarios
INSERT INTO reserva (fecha_entrada, fecha_salida, num_huespedes, hotel_id, cliente_id) VALUES
  -- Reservas pasadas
  ('2026-01-10 14:00:00', '2026-01-15 12:00:00', 2, 1, 1),
  ('2026-02-05 15:00:00', '2026-02-08 11:00:00', 1, 3, 2),
  ('2026-03-20 14:00:00', '2026-03-25 12:00:00', 4, 4, 3),
  ('2026-03-01 16:00:00', '2026-03-03 10:00:00', 1, 5, 4),

  -- Reservas activas (alrededor de la fecha actual: 2026-04-14)
  ('2026-04-12 14:00:00', '2026-04-17 12:00:00', 3, 2, 5),
  ('2026-04-10 15:00:00', '2026-04-16 11:00:00', 2, 1, 6),

  -- Reservas futuras
  ('2026-05-01 14:00:00', '2026-05-07 12:00:00', 2, 1, 1),
  ('2026-06-15 15:00:00', '2026-06-20 11:00:00', 1, 3, 3),
  ('2026-07-04 14:00:00', '2026-07-10 12:00:00', 5, 4, 2),
  ('2026-08-20 16:00:00', '2026-08-22 10:00:00', 2, 5, 4);
