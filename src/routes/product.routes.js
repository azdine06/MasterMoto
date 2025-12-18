const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

const upload = require("../middleware/upload");

// GET /products - Liste des produits avec filtres
router.get("/", productController.getAllProducts);
// GET /products/add - Afficher le formulaire d'ajout
router.get("/add", productController.showAddForm);
// POST /products/add - Créer un nouveau produit
router.post("/add", upload.single("image"), productController.createProduct);

module.exports = router;
