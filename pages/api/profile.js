import {verify} from "jsonwebtoken";

/**
* @author JuanMolfese
* @function profileHandler 
* The code imports a function named verify from the jsonwebtoken library.
* The function takes in a request and response object as parameters.
* @param {*} req 
* @param {*} res 
* @returns If the cookie exists, the verify function is called with the ciceToken and JWT_SECRET 
* environment variable as parameters. If the token is valid, the function extracts the 
* user's email, role, name, and surname and returns them in a JSON response with a 200 status.
* If the token is invalid, the function returns a JSON response with a 401 status and an error 
* message of "Token Invalido".
*/
export default function profileHandler(req, res){
  
  const { ciceToken } = req.cookies; 
  
   //verify that the token exists
  if (!ciceToken) {
    return res.status(401).json({ error: "Usuario no logueado" });
  }else{
    //if the token is valid I extract the user, the role and return them
    try {
        const { email, role, name, surname } = verify(ciceToken, process.env.JWT_SECRET);
        res.json({ email, role, name, surname });
        return res;
    } catch (error) {
        return res.status(401).json({error: "Token Invalido"});
    }  
  }  
}
