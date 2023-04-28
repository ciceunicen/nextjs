import { connection } from "models/db";
import bcryptjs from "bcryptjs";

/**
* @author JuanMolfese
* @function handler 
* This code defines a default async function named 'handler' that takes in a
* request and response object. It uses a switch statement to handle HTTP method calls.
* If the method is GET, it calls a function named 'getUsers', else if the method is POST,
* it calls a function named 'saveUser', else it sends a 400 status error.
* @param {*} req 
* @param {*} res 
*/
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

/**
* @author JuanMolfese
* @function getUsers 
* The 'getUsers' function retrieves all entries from the 'user' table in a MySQL database
* using a connection object, sending a 500 status error if there's an error in the process. 
* If successful, it sends a 200 status response with a JSON object containing the result. 
* @param {*} req 
* @param {*} res 
*/  
const getUsers = async (req, res) => {
  try {
    const results = await connection.query("SELECT * FROM user");
    connection.end();    
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

/**
* @author JuanMolfese
* @function validateEmail 
*The 'validateEmail' function checks the validity of an email address using a regular expression. 
* @param {*} email 
*/
function validateEmail(email){
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}

/**
* @author JuanMolfese
* @function saveUser 
* The 'saveUser' function retrieves data from the request body, checks for validity
* using 'validateEmail' and password length, and checks if both fields are complete. 
* It queries the MySQL database to check if the email already exists and sends a 409
* status error if it does. If the email doesn't exist, the password is hashed using 
* bcryptjs and stored in the database along with the email, name, surname, and role ID. 
* If successful, it sends a 200 status response with a JSON object containing email and 
* the hashed password. If there's an error, it sends a 500 status error. 
* Finally, the functions close the database connection using the .end() method on the connection object after executing
* their respective queries to prevent resource leaks.
* @param {*} req 
* @param {*} res 
*/
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