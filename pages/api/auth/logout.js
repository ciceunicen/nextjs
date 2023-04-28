import { verify } from 'jsonwebtoken'
import { serialize } from 'cookie'

/**
*@author JuanMolfese
* @function logoutHandler 
* The logoutHandler function first extracts the ciceToken cookie from the request's cookies.
* It checks if the ciceToken cookie is present, and will return a 401 error response with an 
* error message if it is not. Next, it attempts to verify the JWT token using the jsonwebtoken 
* library and the JWT_SECRET environment variable. If the token is verified successfully, it 
* creates a serialized cookie with the same name as the original cookie but with the value null
* and some additional configuration options. These options include setting the cookie's maxAge 
* to 0 which will immediately expire the cookie, setting a path to /, and setting the httpOnly 
* flag to true which will prevent client-side JavaScript from accessing the cookie. Finally, it
* sets the serialized cookie in the response's headers using the Set-Cookie header and returns
* a 200 response with the message "logout realizado correctamente". If there is an error verifying
* the token or any other error is encountered, it will return a 401 error response with an error 
* message "token invalido".
* @param {*} req 
* @param {*} res 
*/
export default function logoutHandler(req, res) {
    const {ciceToken} = req.cookies;        
    
    if(!ciceToken){
      return res.status(401).json({error: "No existe token"});
    }
    try{
        verify(ciceToken, process.env.JWT_SECRET)
        const serialized = serialize('ciceToken', null,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict',
        maxAge: 0,
        path: '/',  
        });
        res.setHeader('Set-Cookie', serialized)
        return res.status(200).json('logout realizado correctamente');    
    }catch(error){
        return res.status(401).json({error: 'token invalido'})
    }
}