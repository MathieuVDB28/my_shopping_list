const { Router } = require('express')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { connection } = require('../config/DatabaseConfig')
const JWTConfig = require('../config/JWTConfig')

const router = Router();

const saltRounds = 10;

const loginAccount = async (req, res) => {
    console.log("[ShoppingList] Called API login");
    const data={email:req.body.email,password:req.body.password};
    connection.query("SELECT * from users WHERE email = ?", [data.email], (err, rows, fields)=>{
        if(rows.length > 0){
          bcrypt.compare(data.password, rows[0].password, function(err, result) {
            if(result){
              const token = jwt.sign({ id: rows[0].id }, JWTConfig.SECRET_TOKEN, { expiresIn: 86400 });
              res.status(200).json({user_token: token });
            }
            else res.status(400).json({message: "Utilisateur ou mot de passe incorrect" });
        });
        }
       else {
          res.status(400).json({message: "Utilisateur ou mot de passe incorrect" });
      }
    });
}

const registerAccount = async (req, res) => {
    console.log("[ShoppingList] Called API register");
    const data={pseudo:req.body.pseudo,email:req.body.email,password:req.body.password};
    connection.query("SELECT * from users WHERE email = ?", [data.email], async (err, rows, fields)=>{
      if(err)console.log("Echec de recup de l'email");
      else{
        console.log("Email recup");
        if(rows.length > 0){
          console.log("email existant");
          res.status(400).json({message: "Un compte existe déjà avec cet email" });
        }else{
          if(data.password.length < 8){
            res.status(400).json({message: "Mot de passe trop court ( Inférieur à 8 )" });
          }else{
            var sql="insert into users set ? ";
  
            const hashedPass = await bcrypt.hash(req.body.password, saltRounds);
            data.password = hashedPass;
  
            connection.query(sql,[data],(err,fields)=>{
                if(err)console.log("Echec d'enregistrement à BD");
                else{
                    console.log("Enregistrement effectuee");
                    res.sendStatus(201);
                }
            });
          }
        }
      }
    });
}

router.post('/login', loginAccount)
router.post('/register', registerAccount)

module.exports = router;