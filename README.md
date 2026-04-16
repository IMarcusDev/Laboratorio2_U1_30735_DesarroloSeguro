# Hotel Reservas API

API REST para gestión de hoteles, clientes y reservas — Node.js + Express + PostgreSQL.

## Requisitos

- Node.js v18+
- PostgreSQL corriendo localmente

## Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Crear el archivo de entorno
touch .env

# 3. Crear la base de datos
psql -U postgres -f init.sql
```

## Ejecución

```bash
# Producción
npm start

# Desarrollo (con hot-reload)
npm run dev
```

La API escucha en `http://localhost:3001` por defecto.

## Endpoints

### Hoteles
| Método | Ruta               | Descripción                  |
|--------|--------------------|------------------------------|
| GET    | /api/hoteles       | Listar todos los hoteles     |
| GET    | /api/hoteles/:id   | Obtener hotel por ID         |
| POST   | /api/hoteles       | Crear nuevo hotel            |
| PUT    | /api/hoteles/:id   | Actualizar hotel existente   |

### Clientes
| Método | Ruta               | Descripción                  |
|--------|--------------------|------------------------------|
| GET    | /api/clientes      | Listar todos los clientes    |
| GET    | /api/clientes/:id  | Obtener cliente por ID       |
| POST   | /api/clientes      | Crear nuevo cliente          |
| PUT    | /api/clientes/:id  | Actualizar cliente existente |

### Reservas
| Método | Ruta               | Descripción                  |
|--------|--------------------|------------------------------|
| GET    | /api/reservas      | Listar todas las reservas    |
| GET    | /api/reservas/:id  | Obtener reserva por ID       |
| POST   | /api/reservas      | Crear nueva reserva          |
| PUT    | /api/reservas/:id  | Actualizar reserva existente |

## Códigos HTTP

| Código | Significado                              |
|--------|------------------------------------------|
| 200    | OK — GET o PUT exitoso                  |
| 201    | Created — POST exitoso                  |
| 400    | Bad Request — datos inválidos o faltantes|
| 404    | Not Found — recurso no existe           |
| 500    | Internal Server Error                   |

## Estructura del proyecto

```
hotel-api/
├── src/
│   ├── index.js                          
│   ├── db/
│   │   └── pool.js                      
│   ├── controllers/
│   │   ├── hoteles.controller.js
│   │   ├── clientes.controller.js
│   │   └── reservas.controller.js
│   └── routes/
│       ├── hoteles.routes.js
│       ├── clientes.routes.js
│       └── reservas.routes.js
├── .env
├── sql/
|    └──init.sql 
├── package.json
└── README.md
```
