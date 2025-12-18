const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// GET /auth/login - Page de connexion
router.get("/login", authController.showLoginForm);

// POST /auth/login - Traitement de la connexion
router.post("/login", authController.login);

// GET /auth/register - Page d'inscription
router.get("/register", authController.showRegisterForm);

// POST /auth/register - Traitement de l'inscription
router.post("/register", authController.register);

module.exports = router;
