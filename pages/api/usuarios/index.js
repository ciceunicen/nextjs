import { connection } from "models/db";
import bcryptjs from "bcryptjs";

export default async function handler(req, res) {
    switch (req.method) {
      case "GET":
        return await getUsers(req, res);
      case "POST":
          return await saveUser(req, res);  
      default:
        return res.status(400).send("Metodo no soportado");
    }
}
  
const getUsers = async (req, res) => {
  try {
    const results = await connection.query("SELECT * FROM user");
    connection.end();    
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

//verify email address vality (formatted)
function validateEmail(email){
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}

//Register a new user
const saveUser = async (req, res) => {
  
  const { email, password, name, surname} = req.body;

  const isValidEmail = validateEmail(email);
  
  //verify password lenght
  if (password.length < 8 || password.length > 20){
      res.status(401).json({
          error: "La contraseña debe tener al menos 8 caracteres y 20 como maximo",
      });
      return;
  }
  
  //check email validity
  if (!isValidEmail){
      res.status(402).json({
          error: "Email no valido",
      });
      return;
  }

  //check email and password completeness
  if (!email || !password) {
      res.status(400).json({
      error: "Falta email o password",
      });
      return;
  }

  //check email is in use ?
  const verifExistMail = await connection.query("SELECT * FROM user WHERE email = ?", [email]);
    connection.end();
  if (verifExistMail.length > 0){
      res.status(409).json({
          error: "Email ya esta siendo utilizado",
      });
  }
  else {    
      try{ 
          const salt = bcryptjs.genSaltSync(10);
          const hash = bcryptjs.hashSync(password, salt);

          //insert new user in the database, default role is DEFAULT ... and his code is number 4 (code from role table definition)
          //CICEDEV-174
          const result = await connection.query("INSERT INTO user ( email, password, name, surname, role) VALUES (?, ?, ?, ?, ?)",
            [ email, hash, name, surname, 4 ]);                      
          
          connection.end();  
          
          const data = {
            email:email,
            password:hash,
          }
          
          return res.status(200).json(data);
          
      }catch (error) {
          return res.status(500).json({ message: error.message });
      }     
  }
}