const express = require("express");

const ProductController = require('./controllers/productController');
const CategorieController = require('./controllers/categorieController');
const AccountController = require('./controllers/accountController');

const app = express();
const port = 3000;

app.use(express.json());
app.use("/", express.static("public"));

/* Définition des différentes routes de l'API */
app.use("/api/products", ProductController)
app.use("/api/categories", CategorieController)
app.use("/api/account", AccountController)

app.listen(port, () => {
  console.log(`Shopping List app listening at http://localhost:${port}`);
});