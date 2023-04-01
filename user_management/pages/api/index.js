import { pool } from "config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getUsers(req, res);
    case "POST":
      return await saveUser(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}

const getUsers = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM user");
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const saveUser = async (req, res) => {
  try {
    
    //OJO ACA VER LOS CAMPOS QUE CORRESPONDEN AL POST
    const { name, description, price } = req.body;

    const result = await pool.query("INSERT INTO user SET ?", {
    //OJO ACA VER LOS CAMPOS QUE CORRESPONDEN AL POST
      name,
      description,
      price,
    });

    return res.status(200).json({ ...req.body, id: result.insertId });//insertId ??????
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};