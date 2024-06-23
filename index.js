import express from 'express';
import { Producto } from './router/apiProducto.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


// Middleware para permitir el acceso a través de CORS

app.use("*", (req, res, next) => {
  const allowedOrigins = [
    "http://localhost:3000",
    "http://192.168.0.199:8081",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST,DELETE");
  next();
});



app.use("/api/producto", Producto)

// Manejo de rutas no encontradas
app.use((req, res, next) => {
  const error = new Error("Ruta no encontrada");
  error.status = 404;
  next(error);
});

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
