
const getRandomNumber = (max, min) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const productValidation = (product) => {
    if(product.nombre && product.precio && product.descripcion){
        return true;
    }
    else{
        return false;
    }
}

module.exports = {
    getRandomNumber,
    productValidation
}