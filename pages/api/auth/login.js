import { connection } from "models/db"
import bcryptjs from "bcryptjs";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

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
          //make the token
          const token = sign(
            {
              exp: Math.floor(Date.now() / 1000) + NINE_HOURS_IN_SECONDS, // 9 HORAS
              email,
              role,               
            },
            process.env.JWT_SECRET);
          
          //For greater security I apply security to the cookie with the serialize method
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
               
          // Set the cookie header and return a success message          
          res.setHeader('Set-Cookie', serialized);
          return res.status(200).json(data);          
        }
      }   
    }
  );
}