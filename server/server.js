const express = require("express");
const cors = require("cors");
const PORT = 8080;

class Server {
  constructor() {
    this.app = express();
    this.productsPath = "/api/productos";
    this.middlewares();
    this.routes();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.productsPath, require("../routes/products"));
  }

  listen() {
    this.app.listen(PORT, () => {
      console.log(`Escuchando en el puerto ${PORT}`);
    });
  }
}

module.exports = Server;
