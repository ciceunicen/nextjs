import { connection } from "models/db";
import bcryptjs from "bcryptjs";

export default async function handler(req, res) {
    switch (req.method) {
        /* case "GET":
          return await getUsers(req, res); */
        case "POST":
          return await saveUser(req, res);
        default:
          return res.status(400).send("Metodo no habilitado");
      }
}

const saveUser = async (req, res) => {
    
    const { email, password, name, surname} = req.body;

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




