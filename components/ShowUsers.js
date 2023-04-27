import axios from "axios";
import { useState, useEffect } from "react";
import styles from "/styles/Table.module.css"
import ButtonAdmin from "./ButtonAdmin";

/**
 * @author JuanMolfese
 * @function ShowUsers
 * Within the component, the "useState" hook is used to create a state variable called "data", which is 
 * initialized to an empty array. Another state variable called "order" is created and initialized as an empty string. 
 * The function "handleChange" receives a parameter called "newOrder" that is used to update the "order" state variable
 * with a random number multiplied by the passed in parameter.
 * The "useEffect" Hook is used to make an HTTP GET request once the component mounts to get data from an API of "/api/usuarios".
 * The received data is filtered for only the "admins" and "default users". The filtered data is then set to the "data" state.
 * Finally, the "return" statement displays a table containing the API data with columns named "Id", "Nombre", "Apellido", "Email",
 * "Rol Actual", and "Acciones". Each row contains a user that has gone through the filters. The "ButtonAdmin" component makes it
 * possible for the user to have an updated role when clicked. 
 */
export default function ShowUsers(){

  const [data, setData] = useState([]);

  const [order, setOrder] = useState(0);

  /**
   * @function handleChange
   * function created to force the update of this component when a role change button is pressed. 
   * Method: the handleChange function is included in the onChange property of each role change button.
   * @param {*} newOrder 
   */
  const handleChange = (newOrder) => {
    setOrder(Math.random()*newOrder);
  };

  useEffect( () => {
    const getData = async () =>{
      const response = await axios.get("/api/usuarios");
      const users = response.data;        
      //filter the users that role are admin or users default
      const usersFilter = users.filter(function(user) {
        return (user.role === 2 || user.role === 4); });        
      //set the list of users filtered
      setData(usersFilter);
    }
  getData(); 
  }, [order]);  
  
  return(        
        <>
        <div className={styles.wrapper}>                
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Id</th>          
              <th>Nombre</th>      
              <th>Apellido</th>      
              <th>Email</th>
              <th>Rol Actual</th>
              <th>Acciones</th>
            </tr> 
          </thead>
          <tbody>
            {data.map(user => (
              <tr key={user.id} className={styles.row}>
                <td>{user.id}</td>              
                <td>{user.name}</td>              
                <td>{user.surname}</td>              
                <td className={styles.th}>{user.email}</td>              
                <td>{user.role === 2 ? "Admin" : "Usuario"}</td>                
                <td><ButtonAdmin 
                      key={user.id}
                      id={user.id}
                      role={user.role}
                      onChange={handleChange}
                    />
                </td>
              </tr> ))
            }
          </tbody>
        </table>
        </div>
        
        </>
    );
}