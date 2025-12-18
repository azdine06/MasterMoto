const Product = require("../models/Product");

// Liste des catégories et couleurs pour les filtres
const CATEGORIES = ["Moteur", "Freinage", "Électrique", "Carrosserie", "Échappement", "Suspension"];
const COLORS = ["Noir", "Rouge", "Chrome", "Bleu", "Or"];

/**
 * Récupère tous les produits avec filtres optionnels
 * @route GET /products
 */
const getAllProducts = async (req, res) => {
    try {
        const { search, category, color } = req.query;

        // Construire le filtre MongoDB
        const filter = {};

        // Recherche par nom (regex insensible à la casse)
        if (search && search.trim()) {
            filter.name = { $regex: search.trim(), $options: "i" };
        }

        // Filtre par catégorie
        if (category && category !== "all") {
            filter.category = category;
        }

        // Filtre par couleur
        if (color && color !== "all") {
            filter.color = color;
        }

        const products = await Product.find(filter).sort({ createdAt: -1 });

        res.render("products", {
            title: "Produits - MasterMoto",
            products,
            categories: CATEGORIES,
            colors: COLORS,
            filters: { search: search || "", category: category || "all", color: color || "all" }
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
        res.status(500).render("error", {
            title: "Erreur",
            message: "Erreur lors de la récupération des produits"
        });
    }
};

/**
 * Affiche le formulaire d'ajout de produit
 * @route GET /products/add
 */
const showAddForm = async (req, res) => {
    try {
        res.render("add-product", {
            title: "Ajouter un produit - MasterMoto"
        });
    } catch (error) {
        console.error("Erreur lors de l'affichage du formulaire:", error);
        res.status(500).render("error", {
            title: "Erreur",
            message: "Erreur lors de l'affichage du formulaire"
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, description, category, color, price } = req.body;

        let imagePath = "/images/default-product.jpg"; // Image par défaut
        if (req.file) {
            imagePath = "/uploads/" + req.file.filename;
        }

        const newProduct = new Product({
            name,
            description,
            category,
            color,
            price,
            image: imagePath
        });

        await newProduct.save();

        res.redirect("/products");
    } catch (error) {
        console.error("Erreur lors de la création du produit:", error);
        res.status(500).render("error", {
            title: "Erreur",
            message: "Erreur lors de la création du produit"
        });
    }
};

module.exports = {
    getAllProducts,
    showAddForm,
    createProduct,
    CATEGORIES,
    COLORS
};
