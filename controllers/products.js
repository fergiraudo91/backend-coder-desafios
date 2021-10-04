const Contenedor = require("../controllers/contenedor");
const { getRandomNumber, productValidation } = require("../utils/utils");
const contenedor = new Contenedor("products.json");

const getProducts = async (req, resp) => {
  try {
    const productos = await contenedor.getAll();
    resp.json(productos);
  } catch (error) {
    resp.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

const getProductById = async (req, resp) => {

    const {id} = req.params;
  try {
    const productos = await contenedor.getByID(id);
    if(!productos){
      resp.status(400).json({
        error: 'producto no encontrado'
      })
    }
    resp.json(productos);
  } catch (error) {
    resp.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

const getRandomProduct = async (req, resp) => {
  try {
    const productos = await contenedor.getAll();
    const i = getRandomNumber(productos.length, 0);

    resp.json(productos[i]);
  } catch (error) {
    resp.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

const postProduct = async (req, resp) => {
  const body = req.body;
  try {
    let id = await contenedor.ultimoID() + 1;
    if(productValidation(body)){
      await contenedor.save({...body, id});
      resp.json({
        msg: 'Los datos se guardaron correctamente',
        data: body
      })
    }
    else{
      resp.status(400).json({
        ok: false,
        msg: "Los datos ingresados no son validos"
      })
    }
    
  } catch (error) {
    resp.status(500).json({
      msg: 'Error en el servidor'
    });
  }
}

const putProduct = async (req, resp) => {
  try {
    const {id} = req.params;
    const data = req.body;
    const item = await contenedor.getByID(id);
    if(!item || !productValidation(data)){
      resp.status(400).json({
        ok: false,
        msg: 'datos enviados incorrectamente'
      })
    }
    else{
      await contenedor.update(id, data);
      resp.json({
        ok: true,
        msg: 'Datos actualizados correctamente',
        data: item
      })
    }
  } catch (error) {
    resp.status(500).json({
      ok: false,
      msg: 'Problemas en el servidor'
    })
  }
  
}

const deleteProduct = async (req, resp) => {
  try {
    const {id} = req.params;
    const item = await contenedor.getByID(id);
    if(!item){
      resp.status(400).json({
        ok: false,
        msg: 'El Id no es correcto'
      })
    }
    else{
      await contenedor.deleteById(id);
      resp.json({
        msg: 'Item eliminado',
        data: item
      })
    }
  } catch (error) {
    resp.status(500).json({
      msg: 'Error en el servidor'
    })
  }
}

module.exports = {
    getProducts,
    getProductById,
    getRandomProduct,
    postProduct,
    putProduct,
    deleteProduct
}