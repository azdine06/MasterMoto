const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const indexRoutes = require("./routes/index.routes");
const productRoutes = require("./routes/product.routes");

app.use("/", indexRoutes);
app.use("/products", productRoutes);

module.exports = app;

