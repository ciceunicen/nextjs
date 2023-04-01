import { connection } from "models/db";
import bcryptjs from "bcryptjs";

export default async function register(req, res) {
    console.log(req.body)
    const { email, password, name, surname} = req.body;
    
    
    if (!email || !password) {
        res.status(400).json({
        error: "Falta email o password",
        });
        return;
    }
    try {
        const result = await connection.query("SELECT * FROM user WHERE email = ?", [email]);
        if (result.length > 0){
            res.status(409).json({
                error: "Email ya esta siendo utilizado",
              });
        }
        else {
            const salt = bcryptjs.genSaltSync(10);
            const hash = bcryptjs.hashSync(password, salt);

            connection.query("INSERT INTO user ( email, password, name, surname, role) VALUES (?, ?, ?, ?, 2)",
                [ email, hash, name, surname, 2],
                
                (error, results) => {            
                    if (error) {
                        res.status(500).json({ error });
                        return;
                    }
                    res.status(200).json({
                        user: {
                        id: results.insertId,
                        email,
                        },
                    });
                }
            );
        }

    }catch (error) {
        return res.status(500).json({ message: error.message });
    }     
}