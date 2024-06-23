-- Active: 1717868038531@@localhost@5432@supermercado@public
CREATE TABLE productos(
    id SERIAL,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255),
    precio int,
    Estado VARCHAR(200),
    categoria VARCHAR(300),
    foto bytea,
    nombre_archivo VARCHAR(500),
    mime_type VARCHAR(500)
)