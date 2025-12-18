/**
 * Affiche la page de connexion
 * @route GET /auth/login
 */
const showLoginForm = (req, res) => {
    res.render("auth/login", {
        title: "Connexion - MasterMoto"
    });
};

/**
 * Affiche la page d'inscription
 * @route GET /auth/register
 */
const showRegisterForm = (req, res) => {
    res.render("auth/register", {
        title: "Inscription - MasterMoto"
    });
};

/**
 * Traite la connexion
 * @route POST /auth/login
 */
const login = (req, res) => {
    // Placeholder pour la logique de connexion
    console.log("Tentative de connexion:", req.body);
    res.redirect("/");
};

/**
 * Traite l'inscription
 * @route POST /auth/register
 */
const register = (req, res) => {
    // Placeholder pour la logique d'inscription
    console.log("Tentative d'inscription:", req.body);
    res.redirect("/auth/login");
};

module.exports = {
    showLoginForm,
    showRegisterForm,
    login,
    register
};
