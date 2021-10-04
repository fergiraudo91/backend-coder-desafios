const fs = require("fs");

class Contenedor {
  constructor(file) {
    this.file = file;
  }

  async ultimoID() {
    try {
      const resultado = await fs.promises.readFile(
        `./data/${this.file}`,
        "utf-8"
      );
      if (resultado.trim() === "") {
        return;
      }
      const res = JSON.parse(resultado);
      return res[res.length - 1].id;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAll() {
    try {
      const resultado = await fs.promises.readFile(
        `./data/${this.file}`,
        "utf-8"
      );
      const res = JSON.parse(resultado);
      return res;
    } catch (error) {
      return null;
    }
  }

  async getByID(id) {
    const data = await this.getAll();
    if (!data) {
      return null;
    }
    return data.find((el) => el.id == id);
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(`./data/${this.file}`, "");
      console.log("Base de datos eliminada");
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      const allItems = await this.getAll();
      const filteredItems = allItems.filter((item) => item.id != id);
      await fs.promises.writeFile(
        `./data/${this.file}`,
        JSON.stringify(filteredItems)
      );
      console.log("Item Borrado correctamente");
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, data) {
    try {
      const itemToUpdate = await this.getByID(id);
      itemToUpdate.nombre = data.nombre;
      itemToUpdate.descripcion = data.descripcion;
      itemToUpdate.precio = data.precio;
      await this.deleteById(id);
      const allItems = await this.getAll();
      allItems.push(itemToUpdate);
      await fs.promises.writeFile(
        `./data/${this.file}`,
        JSON.stringify(allItems)
      );
      console.log("Item Actualizado correctamente");
    } catch (error) {
        console.log(error);
    }
  }

  async save(data = {}) {
    let id = await this.ultimoID();
    id++;
    data.id = id;
    try {
      if (id === 1) {
        await fs.promises.writeFile(
          `./data/${this.file}`,
          JSON.stringify([data])
        );
        console.log("Grabado correctamente");
      } else {
        const dbData = await this.getAll();
        dbData.push(data);
        await fs.promises.writeFile(
          `./data/${this.file}`,
          JSON.stringify(dbData)
        );
        console.log("Actualizado correctamente");
      }
    } catch (error) {
      console.log("Se produjo un error ", error);
      throw new Error(error);
    }
  }
}

module.exports = Contenedor;
