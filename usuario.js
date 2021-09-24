class Usuario {

    constructor(nombre, apellido, mascotas, libros){
        this.nombre = nombre;
        this.apellido = apellido;
        this.mascotas = mascotas;
        this.libros = libros;
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(mascota){
        this.mascotas.push(mascota);
    }

    countMascota(){
        return this.mascotas.length;
    }

    addBook(nombre, autor){
        this.libros.push({nombre, autor});
    }

    getBookNames(){
        return this.libros.map(libro => libro.nombre);
    }

}

module.exports = Usuario;