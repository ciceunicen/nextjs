import {verify} from "jsonwebtoken";

export default function profileHandler(req, res) {
  
  const { ciceToken } = req.cookies;
 
  
  if (!ciceToken) {
    return res.status(401).json({ error: "Usuario no logueado" });
  }else{
    try {
        const { email, role } = verify(ciceToken, process.env.JWT_SECRET);
        res.json({ email, role });
        return res;
    } catch (error) {
        return res.status(401).json({error: "Token Invalido"});
    }  
  }
  
}
