
const getRandomNumber = (max, min) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
    getRandomNumber
}