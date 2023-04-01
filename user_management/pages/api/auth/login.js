import { connection } from "models/db";

export default async function Login(req, res) {
    switch (req.method) {
        case "POST":
        return await logUser(req, res);        
        default:
        return res.status(400).json({ message: "Requerimiento Erroneo" });
    }
}


//TODO
const logUser = async (req, res) => {
    try {
      const result = await connection.query("SELECT ? FROM user", [
        req.query.email,
      ]);
      return res.status(200).json(result[0]);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };