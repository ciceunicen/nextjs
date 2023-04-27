import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import ShowUsers from "@/components/ShowUsers";
import styles from "/styles/Dashboard.module.css";

/**
* @author JuanMolfese
* @function Dashboard That code represents a dashboard with user information, and the possible
* actions that can be carried out depending on the role that is assigned. 
* @returns returns a JSX element with a container that includes a navigation
* bar component and an info zone component that displays various information 
* based on the user's role. If the user's role is 1 (i.e., an administrator), 
* a list of users and administrators is displayed using another custom 
* component ShowUsers. The code also uses CSS styles to apply some styling to
* the components.
*/
 export default function Dashboard() { 

   const [user, setUser] = useState({
       email: "",
       role: "",
       name: "",
       surname: "",
   });

  /**  
  * The effect hook useEffect is used to perform an asynchronous HTTP GET request
  * to the /api/profile endpoint when the component is mounted. The response data
  * is then used to set the value of the user state using the setUser() function.
  */
  useEffect( () => {
    const fetchData = async () =>{
    const response = await axios.get("/api/profile");        
    setUser(response.data);    
  }
  fetchData(); 
  }, []);
  
  return (    
      <>
        <div className={styles.container}>
          <Navbar user= {user.email} role= {user.role} name={user.name} surname={user.surname}/>
          <div className={styles.infoZone}>
            <div className={styles.infoZone_title}> </div>
            <div className={styles.center}>                              
              {user.role === 1 && <div className={styles.title}>Lista de Usuarios y Administradores</div>}
              {user.role === 1 && <ShowUsers></ShowUsers>}              
            </div>
          </div>
        </div>     
      </>
    );
    
}