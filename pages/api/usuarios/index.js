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
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

function validateEmail(email){
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}

const saveUser = async (req, res) => {
  
  const { email, password, name, surname} = req.body;

  const isValidEmail = validateEmail(email);
  
  if (password.length < 8 || password.length > 20){
      res.status(401).json({
          error: "La contraseña debe tener al menos 8 caracteres y 20 como maximo",
      });
      return;
  }

  if (!isValidEmail){
      res.status(402).json({
          error: "Email no valido",
      });
      return;
  }

  if (!email || !password) {
      res.status(400).json({
      error: "Falta email o password",
      });
      return;
  }

  const verifExistMail = await connection.query("SELECT * FROM user WHERE email = ?", [email]);
  if (verifExistMail.length > 0){
      res.status(409).json({
          error: "Email ya esta siendo utilizado",
      });
  }
  else {    
      try{ 
          const salt = bcryptjs.genSaltSync(10);
          const hash = bcryptjs.hashSync(password, salt);

          const result = await connection.query("INSERT INTO user ( email, password, name, surname, role) VALUES (?, ?, ?, ?, ?)",
              [ email, hash, name, surname, 4 ]);            
          
          return res.status(200).json({ ...req.body, id: result.insertId });
          
      }catch (error) {
          return res.status(500).json({ message: error.message });
      }     
  }
}