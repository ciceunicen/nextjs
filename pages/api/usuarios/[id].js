import { connection } from "models/db";

export default async function handler(req, res) {
    switch (req.method) {
      case "GET":
        return await getUser(req, res);
        case "PUT":
          return await updateUser(req, res);    
      default:
        return res.status(400).json({ message: "bad request" });
    }
  }
  
  const getUser = async (req, res) => {
    try {
      const result = await connection.query("SELECT * FROM user WHERE id = ?", [
        req.query.id,
      ]);
      connection.end();
      return res.status(200).json(result[0]);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  const updateUser = async (req, res) => {    
    try {      
      await connection.query("UPDATE user SET role = ? WHERE id = ?", [
        req.body.role,        
        req.body.id,
      ]);
      connection.end();
      return res.status(200).json({ message: "Se actualizo correctamente el rol"});
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }; 