const { Router } = require("express");
const ProductController = require("../controllers/products");
const productController = new ProductController();

const router = Router();

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.get("/productoRandom", productController.getRandomProduct);
router.post("/", productController.postProduct);
router.put("/:id", productController.putProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
