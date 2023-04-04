import { connection } from "models/db"
import bcryptjs from "bcryptjs";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

const ONE_DAY_IN_SECONDS = 86400;

export default function loginHandler(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      error: "(B)Missing email or password",
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
          return res.status(401).json({ error: "(B)Invalid email or password" });
        }else{
          const user = results[0];
          
          //make the token
          const token = sign(
            {
              exp: Math.floor(Date.now() / 1000) + ONE_DAY_IN_SECONDS, // 1 dia
              email, 
            },
            process.env.JWT_SECRET);
          
          //For greater security I apply security to the cookie with the serialize method
          const serialized = serialize('ciceToken', token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'lax',
            maxAge: ONE_DAY_IN_SECONDS,
            /* path: '/'  *///ruta donde sera entregado
          }); 
          // Set the cookie header and return a success message          
          res.setHeader('Set-Cookie', serialized);
          res.status(200).json({message: '(B)login succesfully',});
          return;
        }
      }   
    }
  );
}