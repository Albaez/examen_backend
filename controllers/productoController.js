import { db } from "../db/conn.js";

/*GETS */
const getProducto = async (req, res) => {
  try {
    const sql = `SELECT * FROM productos`
    const result = await db.query(sql);
    
    if (result.length > 0) {
      res.json(result);
  } else {
      res.status(404).json({ message: "No data found." });
  }
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const getProducto_id = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = `SELECT * FROM productos WHERE id = $1`
    const result = await db.query(sql, [id]);
    if (result.length < 0) {
      res.json({ message: "No se encontró el producto" });
    } else {
      res.json(result);
    }
  } catch (e) {
    res.status(500).json(e.message)
  }
}

/*POSTS */
const postProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, estado, categoria } = req.body;
    const { buffer, mimetype, originalname } = req.file;

    const params = [nombre, descripcion, precio, estado, categoria, buffer, mimetype, originalname]

    const sql = `INSERT INTO productos
                 (nombre, descripcion, precio, estado, categoria, foto, mime_type, nombre_archivo)
                 VALUES
                 ($1, $2, $3, $4, $5, $6, $7, $8)
                 RETURNING *`

    const result = await db.query(sql, params);
    res.json(result);
  } catch (error) {
    res.status(500).json(error.message)
  }
}

/*DELETES */

const deleteProducto = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = `DELETE FROM productos WHERE id = $1`
    const result = await db.query(sql, [id]);

    if (result.length > 0) {
      res.json({ message: "No se encontró el producto con el id " + id });
    } else {
      res.json({ message: "Producto eliminado con éxito" });
    }
  } catch (error) {
    res.status(500).json(error.message)
  }
}


export { deleteProducto, getProducto, getProducto_id, postProducto };
