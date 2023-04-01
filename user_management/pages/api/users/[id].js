import { connection } from "models/db";

export default async function handler(req, res) {
    switch (req.method) {
      case "GET":
        return await getUser(req, res);
      case "DELETE":
        return await deleteUser(req, res);
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
      return res.status(200).json(result[0]);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  const deleteUser = async (req, res) => {
    try {
      await connection.query("DELETE FROM user WHERE id = ?", [req.query.id]);
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  const updateUser = async (req, res) => {
    try {
      console.log(req.body)
      await connection.query("UPDATE user SET ? WHERE id = ?", [
        req.body,
        req.query.id,
      ]);
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };