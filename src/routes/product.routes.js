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

// GET /products/edit/:id - Afficher le formulaire de modification
router.get("/edit/:id", productController.showEditForm);
// POST /products/edit/:id - Modifier un produit
router.post("/edit/:id", upload.single("image"), productController.updateProduct);

// POST /products/delete/:id - Supprimer un produit
router.post("/delete/:id", productController.deleteProduct);

module.exports = router;
