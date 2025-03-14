CREATE TABLE proveedores_contratistas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) CHECK (tipo IN ('Materiales', 'Equipos', 'Mano de Obra', 'Todo Costo')),
    especialidad VARCHAR(100),
    contacto_nombre VARCHAR(255),
    contacto_telefono VARCHAR(50),
    contacto_correo VARCHAR(255),
    ubicacion TEXT,
    estado VARCHAR(20) CHECK (estado IN ('Activo', 'Inactivo'))
);

CREATE TABLE materiales_equipos (
    id SERIAL PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL,
    unidad_medida VARCHAR(50),
    proveedor_id INT REFERENCES proveedores_contratistas(id) ON DELETE SET NULL,
    precio_unitario NUMERIC(10,2),
    tiempo_entrega INTERVAL
);

CREATE TABLE mano_obra_actividades (
    id SERIAL PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL,
    unidad_medida VARCHAR(50),
    contratista_id INT REFERENCES proveedores_contratistas(id) ON DELETE SET NULL,
    costo_estimado NUMERIC(10,2)
);

CREATE TABLE actividades_todo_costo (
    id SERIAL PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL,
    contratista_id INT REFERENCES proveedores_contratistas(id) ON DELETE SET NULL,
    alcance TEXT,
    costo_total NUMERIC(10,2)
);
