# Projet FullStack JS - My Shopping List 🛒

## Fonctionnalités 📝

* Système de connexion et d'inscription 🔒
* Ajouter, supprimer, modifier et récupérer les éléments d'une liste de course 🛍️
* Ajouter, supprimer et récupérer une liste de catégorie d'aliments 🍔 🍉 🍺

## Installation & configuration ⚙️

### 1. Installer la base de donnée

> Requis : Base de donnée MySQL

Récupérer le fichier `my_shopping_list.sql` dans le dossier `sql`, puis l'executer dans l'interface MySQL ou à l'aide de l'interface web PhpMyAdmin.

*Si tout c'est bien passé une base de donnée `shoppinglist` avec les tables `users`, `list`, `categories` ont été créé.*

### 2. Configuration MySQL

Puis modifier le fichier `src/config/DatabaseConfig.js` avec les bonnes valeurs.

Exemple de configuration: 
```json
{
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'shoppinglist',
    //port: '8889' à définir si différent du port par défaut
  }
```

### 3. NodeJS : installation du projet

> Requis : NodeJS et npm

Executer la commande `npm i` pour installer les packages nécessaires au bon fonctionnement du projet

Si tous est bon, vous pouvez alors lancer l'application à l'aide de la commande :

```bash
npm start
```
Vous devriez avoir un retour du style : 
```
Shopping List app listening at http://localhost:3000
Connected!
```
