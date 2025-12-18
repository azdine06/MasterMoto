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

/**
 * Affiche le formulaire de modification
 * @route GET /products/edit/:id
 */
const showEditForm = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).render("error", {
                title: "Produit non trouvé",
                message: "Le produit demandé n'existe pas."
            });
        }

        res.render("edit-product", {
            title: `Modifier ${product.name} - MasterMoto`,
            product
        });
    } catch (error) {
        console.error("Erreur lors de l'affichage du formulaire de modification:", error);
        res.status(500).render("error", {
            title: "Erreur",
            message: "Erreur lors du chargement du produit"
        });
    }
};

/**
 * Modifie un produit existant
 * @route POST /products/edit/:id
 */
const updateProduct = async (req, res) => {
    try {
        const { name, description, category, color, price } = req.body;
        const productId = req.params.id;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).render("error", {
                title: "Produit non trouvé",
                message: "Le produit que vous essayez de modifier n'existe pas."
            });
        }

        // Mise à jour des champs
        product.name = name;
        product.description = description;
        product.category = category;
        product.color = color;
        product.price = price;

        // Mise à jour de l'image si une nouvelle est uploadée
        if (req.file) {
            product.image = "/uploads/" + req.file.filename;
        }

        await product.save();

        res.redirect("/products");
    } catch (error) {
        console.error("Erreur lors de la modification du produit:", error);
        res.status(500).render("error", {
            title: "Erreur",
            message: "Erreur lors de la modification du produit"
        });
    }
};

/**
 * Supprime un produit
 * @route POST /products/delete/:id
 */
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).render("error", {
                title: "Produit non trouvé",
                message: "Le produit que vous essayez de supprimer n'existe pas."
            });
        }

        res.redirect("/products");
    } catch (error) {
        console.error("Erreur lors de la suppression du produit:", error);
        res.status(500).render("error", {
            title: "Erreur",
            message: "Erreur lors de la suppression du produit"
        });
    }
};

module.exports = {
    getAllProducts,
    showAddForm,
    createProduct,
    showEditForm,
    updateProduct,
    deleteProduct,
    CATEGORIES,
    COLORS
};
