const { Router } = require("express");
const { getProducts, getRandomProduct, getProductById, postProduct, deleteProduct, putProduct } = require("../controllers/products");

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/productoRandom", getRandomProduct);
router.post("/", postProduct);
router.put("/:id", putProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
