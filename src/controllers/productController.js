const { Router } = require('express')
const { isValidToken }  = require('../middleware/ValidTokenMiddleware')
const { connection } = require('../config/DatabaseConfig')

const router = Router();

const getProducts = async (req, res) => {
  console.log("[ShoppingList] Called API get Products");
    connection.query("SELECT id_produit, nom_produit, name_categorie, quantité from list AS p, categories AS c WHERE p.id_categorie = c.id_categorie", (err, rows, fields)=>{
        if(err)console.log("Echec de recup");
        else{
          console.log("Tout a été recup");
          res.send(rows);
        }
    });
}

const addProduct = async (req, res) => {
  console.log("[ShoppingList] Called API add Product");
    const data={nom_produit:req.body.nom_produit,id_categorie:req.body.id_categorie,quantité:req.body.quantité};
    var sql="insert into list set ? ";
  
    if(data.nom_produit != undefined && data.nom_produit != "" && data.quantité != undefined && data.quantité > 0 && data.id_categorie != undefined) {
      connection.query(sql,[data],(err,fields)=>{
        if(err){
          console.log("Echec d'enregistrement à BD");
          console.log(err);
      }
        else{
            console.log("Enregistrement effectuee");
            res.sendStatus(201);
        }
    });
    } else {
      console.log("pas de categorie");
      res.status(400).json({message: "Certains champs ne sont pas valides ( ex: nom vide, quantité <= 0 )" });
    }
}

const deleteProduct = async (req, res) => {
  console.log("[ShoppingList] Called API delete Product");
    connection.query('DELETE FROM list WHERE id_produit = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Supprimé avec succès.');
        else
            console.log(err);
    })
}

const updateProduct = async (req, res) => {
  console.log("[ShoppingList] Called API update Product");
    connection.query("UPDATE `list` SET ? WHERE id_produit = ? ", [req.body,req.params.id], (err, rows, fields)=>{
        if(err)console.log("Echec update");
        else{
          console.log("Update effectuee");
          res.send(rows);
        }
      });
}

router.get('/', isValidToken, getProducts)
router.post('/', addProduct)
router.delete('/:id', deleteProduct)
router.put('/:id', updateProduct)

module.exports = router;