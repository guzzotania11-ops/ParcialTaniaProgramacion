const conexion = require("../database/conexion");


const obtenerTodos = (req, res) => {
    conexion.query(
        "SELECT * FROM productos",
        (err, resultados) => {
            if (err) return res.status(500).json({ mensaje: err.message });

            res.json(resultados);
        }
    );
};


const obtenerUno = (req, res) => {
    const { id } = req.params;

    conexion.query(
        "SELECT * FROM productos WHERE id = ?",
        [id],
        (err, resultados) => {
            if (err) return res.status(500).json({ mensaje: err.message });

            if (resultados.length === 0) {
                return res.status(404).json({
                    mensaje: "Producto no encontrado"
                });
            }

            res.json(resultados[0]);
        }
    );
};


const crear = (req, res) => {
    const { nombre, categoria, precio, stock } = req.body;

    if (!nombre || nombre.trim() === "") {
        return res.status(400).json({
            mensaje: "El nombre no puede estar vacío"
        });
    }

    if (!categoria || categoria.trim() === "") {
        return res.status(400).json({
            mensaje: "La categoría no puede estar vacía"
        });
    }

    if (precio <= 0) {
        return res.status(400).json({
            mensaje: "El precio debe ser mayor a 0"
        });
    }

    if (stock < 0) {
        return res.status(400).json({
            mensaje: "El stock debe ser mayor o igual a 0"
        });
    }

    conexion.query(
        "INSERT INTO productos (nombre,categoria,precio,stock) VALUES (?,?,?,?)",
        [nombre, categoria, precio, stock],
        (err, resultado) => {
            if (err) return res.status(500).json({ mensaje: err.message });

            res.status(201).json({
                mensaje: "Producto creado",
                id: resultado.insertId
            });
        }
    );
};

const actualizar = (req, res) => {
    const { id } = req.params;
    const { nombre, categoria, precio, stock } = req.body;

    if (!nombre || nombre.trim() === "") {
        return res.status(400).json({
            mensaje: "El nombre no puede estar vacío"
        });
    }

    if (!categoria || categoria.trim() === "") {
        return res.status(400).json({
            mensaje: "La categoría no puede estar vacía"
        });
    }

    if (precio <= 0) {
        return res.status(400).json({
            mensaje: "El precio debe ser mayor a 0"
        });
    }

    if (stock < 0) {
        return res.status(400).json({
            mensaje: "El stock debe ser mayor o igual a 0"
        });
    }

    conexion.query(
        "UPDATE productos SET nombre=?, categoria=?, precio=?, stock=? WHERE id=?",
        [nombre, categoria, precio, stock, id],
        (err, resultado) => {
            if (err) return res.status(500).json({ mensaje: err.message });

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    mensaje: "Producto no encontrado"
                });
            }

            res.json({
                mensaje: "Producto actualizado"
            });
        }
    );
};


const eliminar = (req, res) => {
    const { id } = req.params;

    conexion.query(
        "DELETE FROM productos WHERE id=?",
        [id],
        (err, resultado) => {
            if (err) return res.status(500).json({ mensaje: err.message });

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    mensaje: "Producto no encontrado"
                });
            }

            res.json({
                mensaje: "Producto eliminado"
            });
        }
    );
};

module.exports = {
    obtenerTodos,
    obtenerUno,
    crear,
    actualizar,
    eliminar
};