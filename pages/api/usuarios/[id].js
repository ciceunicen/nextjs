import { connection } from "models/db";

/**
* @author JuanMolfese
* @function handler
*This code exports a default async function which handles HTTP
*requests coming to the server. The function checks the request
*method and calls the appropriate function for handling the request.
*If the request method is GET, it calls the getUser function, and if
*the request method is PUT, it calls the updateUser function.
*If the request method is not GET or PUT, it returns a "bad request" response
*with a status code of 400. 
*Finally, the functions close the database
*connection using the .end() method on the connection object after executing
*their respective queries to prevent resource leaks.
* @param {*} req 
* @param {*} res 
*/
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
  
  /**
  *@author JuanMolfese
  *@function getUser
  *The getUser function retrieves a user from a database using the
  *user's ID that is passed as a query parameter in the request. 
  *It uses a connection object that is imported from a "models/db" module
  *to make a SELECT query on the user table in the database. If the query
  *is successful, it sends a JSON response with the retrieved user data, and
  *if there is an error, it sends a 500 status code with an error message.
  * @param {*} req 
  * @param {*} res 
  */
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
  /**
  *@author JuanMolfese
  *@function updateUser
  *The updateUser function updates a user's role in the database using the
  *user's ID and the new role that are passed as part of the request body. 
  *It uses the same connection object to execute an UPDATE query on the user
  *table in the database, and if the query is successful, it sends a JSON 
  *response with a message confirming that the update was successful. 
  *If there is an error, it sends a 500 status code with an error message.
  * @param {*} req 
  * @param {*} res 
  */ 
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