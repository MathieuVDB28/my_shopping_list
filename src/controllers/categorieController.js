const { Router } = require('express')
const { isValidToken }  = require('../middleware/ValidTokenMiddleware')
const { connection } = require('../config/DatabaseConfig')

const router = Router();

const getCategories = async (req, res) => {
    console.log("[ShoppingList] Called API get Categories");
    connection.query("SELECT id_categorie, name_categorie from categories", (err, rows, fields)=>{
        if(err)console.log("Echec de recu des categories");
        else{
          console.log("Categories recup");
          res.send(rows);
        }
      });
}

const addCategorie = async (req, res) => {
    console.log("[ShoppingList] Called API add Categories");
    const data={name_categorie:req.body.name_categorie};
    var sql="insert into categories set ? ";
  
    if(data.name_categorie != undefined && data.name_categorie != "" ) {
      connection.query(sql,[data],(err,fields)=>{
        if(err){
          console.log("Echec d'enregistrement à BD");
          console.log(err);
      }
        else{
            console.log("Enregistrement effectuee");
            resp.sendStatus(201);
        }
    });
    } else {
      console.log("pas de nom de categorie");
      resp.status(400).json({message: "Veuillez rentrer un nom de catégorie" });
    }
}

const deleteCategorie = async (req, res) => {
    console.log("[ShoppingList] Called API delete Categories");
    connection.query('DELETE FROM categories WHERE id_categorie = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Supprimé avec succès.');
        else
            console.log(err);
    })
}

router.get('/', isValidToken, getCategories)
router.post('/', addCategorie)
router.delete('/:id', deleteCategorie)

module.exports = router;
