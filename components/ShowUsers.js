import axios from "axios";
import { useState, useEffect } from "react";
import styles from "/styles/Table.module.css"
import ButtonAdmin from "./ButtonAdmin";

export default function ShowUsers(){

  const [data, setData] = useState([]);

  const [order, setOrder] = useState("");

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