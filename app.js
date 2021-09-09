const Usuario = require("./giraudoFernando");

const main = () => {
  const usuario = new Usuario(
    "Fernando",
    "Giraudo",
    ["Perro", "Gato"],
    [{ nombre: "Canción de Hielo y Fuego", autor: "George RR Martin" }]
  );

  console.log('Full Name: ', usuario.getFullName());

  usuario.addMascota('Conejo');

  console.log('Cantidad de mascotas', usuario.countMascota());

  usuario.addBook('IT', 'Stephen King');

  const bookNames = usuario.getBookNames();

  bookNames.map(book => {
      console.log(book);
  })

};


main();
