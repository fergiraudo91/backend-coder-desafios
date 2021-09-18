const fs = require('fs');

class Contenedor{
    constructor(file){
        this.file = file;
    }

    async ultimoID(){
        try {
            const resultado = await fs.promises.readFile(`./data/${this.file}`, 'utf-8');
            const res = JSON.parse(resultado);
            return res.length;
        } catch (error) {
            return 0;
        }
    }
    
    async getAll(){
        try {
            const resultado = await fs.promises.readFile(`./data/${this.file}`, 'utf-8');
            const res = JSON.parse(resultado);
            return res;
        } catch (error) {
            return null;
        }
    }

    async getByID(id){
        const data = await this.getAll();
        if(!data){
            return null;
        }
        return data[id - 1];
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(`./data/${this.file}`, '');
            console.log("Base de datos eliminada");
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id){
        try {
            const allItems = await this.getAll();
            delete allItems.splice(id - 1, 1);
            await fs.promises.writeFile(`./data/${this.file}`, JSON.stringify(allItems));
        } catch (error) {
            console.log(error);
        }
    }

    async save(data = {}){
        let id = await this.ultimoID();
        id++;
        data.id = id;
        if(id === 1){
            try {
                await fs.promises.writeFile(`./data/${this.file}`, JSON.stringify([data]));
                console.log("Grabado correctamente");
            } catch (error) {
                console.log("Se produjo un error");
            }
        }
        else{
            try {
                const dbData = await this.getAll();
                dbData.push(data);
                await fs.promises.writeFile(`./data/${this.file}`, JSON.stringify(dbData));
                console.log("Actualizado correctamente");
            } catch (error) {
                console.log("Se produjo un error");
            }
        }
    }

}

module.exports = Contenedor;