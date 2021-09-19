const Contenedor = require("./desafio2");

const producto = new Contenedor("products.json");

const product1 = {
  nombre: "Whisky",
  precio: 5000,
  descripcion: "Whisky Jack Daniels",
};
const product2 = {
  nombre: "Vino Tinto",
  precio: 2500,
  descripcion: "Luigi Bosca Reserva",
};
const product3 = {
  nombre: "Cerveza",
  precio: 1000,
  descripcion: "Cerveza Irlandesa",
};

producto.save(product2);
// const productoPorId = producto.getByID(2).then((producto) => {
//   console.log(producto);
// });

// producto.getAll().then((productos) => {
//   console.log(productos);
// });

// producto.deleteById(1);


// producto.deleteAll();