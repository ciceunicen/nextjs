import { connection } from "models/db"
import bcryptjs from "bcryptjs";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

/**
* @author JuanMolfese
* @function loginHandler 
* This code has a function that handles a user login request. It first imports the required 
* dependencies, including the database connection and encryption tools. It then checks if 
* the email and password are provided, sending a 400 error if not. 
* The code queries the database; if it returns an error, it sends a 500 error. If there are no matching
* email and password or the password does not match the encrypted version in the database, the code sends
* a 401 error. If the login was successful, the code creates a JWT token, signs it, and creates a 
* secure HTTP-only cookie containing the token. The code then sends a success message with user 
* information in a JSON format. Finally, the connection is closed.
* @constant NINE_HOURS_IN_SECONDS
* @param {*} req 
* @param {*} res 
*/

const NINE_HOURS_IN_SECONDS = 32400;

export default function loginHandler(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      error: "Missing email or password",
    });
    return;
  }

  connection.query(
    "SELECT * FROM user WHERE email = ?",
    [email],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error });        
      }else{
        
        if (results.length === 0 || !bcryptjs.compareSync(password, results[0].password)) {          
          return res.status(401).json({ error: "Invalid email or password" });
        }else{
          const user = results[0];   
          const role = user.role;
          const name = user.name;
          const surname = user.surname;       
         
          const token = sign(
            {
              exp: Math.floor(Date.now() / 1000) + NINE_HOURS_IN_SECONDS, // 9 HORAS
              email,
              role,
              name,
              surname,              
            }, process.env.JWT_SECRET);
         
          const serialized = serialize('ciceToken', token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict',
            maxAge: NINE_HOURS_IN_SECONDS,
            path: '/',  
          });
          const data = {
            user_id: user.id,
            user_email: user.email,
            user_name: user.name,
            user_surname: user.surname,
            user_rol: user.role,
          };
          res.setHeader('Set-Cookie', serialized);          
          return res.status(200).json(data);   
        }
      }   
    }
  );
  connection.end();
}