require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") });
const mongoose = require("mongoose");
const Product = require("../models/Product");

const products = [
    {
        name: "Kit Chaîne Racing DID",
        description: "Kit chaîne complet avec couronne et pignon renforcés pour usage sportif",
        category: "Moteur",
        color: "Or",
        price: 189.99,
        image: "/images/products/kit-chaine.jpg"
    },
    {
        name: "Disques de Frein Brembo",
        description: "Paire de disques avant flottants haute performance",
        category: "Freinage",
        color: "Chrome",
        price: 349.00,
        image: "/images/products/disques-brembo.jpg"
    },
    {
        name: "Plaquettes Céramique Racing",
        description: "Plaquettes de frein céramique pour usage circuit",
        category: "Freinage",
        color: "Noir",
        price: 89.50,
        image: "/images/products/plaquettes.jpg"
    },
    {
        name: "Feu LED Universel",
        description: "Feu arrière LED avec clignotants intégrés",
        category: "Électrique",
        color: "Noir",
        price: 45.00,
        image: "/images/products/feu-led.jpg"
    },
    {
        name: "Carénage Sport Noir Mat",
        description: "Carénage complet en ABS noir mat avec fixations",
        category: "Carrosserie",
        color: "Noir",
        price: 599.00,
        image: "/images/products/carenage.jpg"
    },
    {
        name: "Rétroviseurs CNC Rouge",
        description: "Paire de rétroviseurs usinés CNC design sportif",
        category: "Carrosserie",
        color: "Rouge",
        price: 79.90,
        image: "/images/products/retroviseurs.jpg"
    },
    {
        name: "Échappement Akrapovic Titane",
        description: "Ligne complète avec silencieux titane et collecteur inox",
        category: "Échappement",
        color: "Chrome",
        price: 1299.00,
        image: "/images/products/echappement-akra.jpg"
    },
    {
        name: "Silencieux SC-Project GP",
        description: "Silencieux slip-on carbone avec dB-killer amovible",
        category: "Échappement",
        color: "Noir",
        price: 549.00,
        image: "/images/products/silencieux-sc.jpg"
    },
    {
        name: "Amortisseurs Öhlins TTX",
        description: "Amortisseur arrière réglable haute performance",
        category: "Suspension",
        color: "Or",
        price: 1850.00,
        image: "/images/products/ohlins.jpg"
    },
    {
        name: "Fourche USD Racing",
        description: "Fourche inversée 43mm avec réglages compression/détente",
        category: "Suspension",
        color: "Or",
        price: 1199.00,
        image: "/images/products/fourche.jpg"
    },
    {
        name: "Batterie Lithium YTZ10S",
        description: "Batterie lithium-ion légère haute capacité",
        category: "Électrique",
        color: "Bleu",
        price: 159.00,
        image: "/images/products/batterie.jpg"
    },
    {
        name: "Faisceau Électrique Universel",
        description: "Kit faisceau simplifié pour café racer et customs",
        category: "Électrique",
        color: "Noir",
        price: 89.00,
        image: "/images/products/faisceau.jpg"
    },
    {
        name: "Caches Moteur CNC",
        description: "Set de caches moteur usinés protection carter",
        category: "Carrosserie",
        color: "Rouge",
        price: 129.00,
        image: "/images/products/caches-moteur.jpg"
    },
    {
        name: "Guidon Superbike Bleu",
        description: "Guidon bracelet 50mm anodisé bleu",
        category: "Carrosserie",
        color: "Bleu",
        price: 119.00,
        image: "/images/products/guidon.jpg"
    },
    {
        name: "Collecteur Inox Racing",
        description: "Collecteur 4-en-1 inox 304 pour lignes complètes",
        category: "Échappement",
        color: "Chrome",
        price: 399.00,
        image: "/images/products/collecteur.jpg"
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connecté");

        // Supprimer les produits existants
        await Product.deleteMany({});
        console.log("🗑️  Produits existants supprimés");

        // Insérer les nouveaux produits
        await Product.insertMany(products);
        console.log(`✅ ${products.length} produits insérés avec succès`);

        await mongoose.connection.close();
        console.log("📦 Seed terminé, connexion fermée");
        process.exit(0);
    } catch (error) {
        console.error("❌ Erreur seed:", error);
        process.exit(1);
    }
};

seedDatabase();
