import { verify } from 'jsonwebtoken'
import { serialize } from 'cookie'

export default function logoutHandler(req, res) {
    const {ciceToken} = req.cookies;        

    //verify that the token exists
    if(!ciceToken){
      return res.status(401).json({error: "No existe token"});
    }
    
    //I set the token to null and assign it time 0
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
