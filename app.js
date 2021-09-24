const http = require('http');
const express = require('express');
const Contenedor = require('./contenedor');
const { getRandomNumber } = require('./utils/utils');

const contenedor = new Contenedor("products.json");

const app = express();
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
})

app.get('/productos', async (req, resp) => {
  try {
    const productos = await contenedor.getAll();
    resp.json(productos);
    
  } catch (error) {
    resp.status(500).json({
      msg: 'Error en el servidor'
    })
  }
})

app.get('/productoRandom', async (req, resp) => {
  try {
    const productos = await contenedor.getAll();
    const i = getRandomNumber(productos.length, 0);

    resp.json(productos[i]);
    
  } catch (error) {
    resp.status(500).json({
      msg: 'Error en el servidor'
    })
  }
})

