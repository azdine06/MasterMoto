const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Le nom du produit est requis"],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        enum: ["Moteur", "Freinage", "Électrique", "Carrosserie", "Échappement", "Suspension"],
        required: [true, "La catégorie est requise"]
    },
    color: {
        type: String,
        enum: ["Noir", "Rouge", "Chrome", "Bleu", "Or"],
        required: [true, "La couleur est requise"]
    },
    price: {
        type: Number,
        required: [true, "Le prix est requis"],
        min: [0, "Le prix doit être positif"]
    },
    image: {
        type: String,
        default: "/images/placeholder.jpg"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Product", productSchema);
