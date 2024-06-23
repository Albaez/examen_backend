import express from "express";
import multer from "multer";
import {
    deleteProducto,
    getProducto,
    getProducto_id,
    postProducto
} from "../controllers/productoController.js";

const Producto = express();
const storage = multer.memoryStorage();
const upload = multer({storage: storage})

Producto.use (express.json());

Producto.post('', upload.single('foto'), postProducto);

Producto.get('', getProducto );
  
Producto.get('/:id', getProducto_id);

Producto.delete('/:id', deleteProducto);




export { Producto };
