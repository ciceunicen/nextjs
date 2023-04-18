import { connection } from "models/db";
  
export default async function handler(req, res) {
    switch (req.method) {
      case "GET":
        return await getUsers(req, res);
      default:
        return res.status(400).send("Metodo no soportado");
    }
  }
  
  const getUsers = async (req, res) => {
    try {
      const results = await connection.query("SELECT * FROM user");
      return res.status(200).json(results);
    } catch (error) {
      return res.status(500).json({ error });
    }
};