import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import ShowUsers from "@/components/ShowUsers";
import styles from "/styles/Dashboard.module.css";

 export default function Dashboard() { 

   const [user, setUser] = useState({
       email: "",
       role: "",
       name: "",
       surname: "",
   });

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
              {/* <h2> Seccion Dashboard del usuario {user.email} 
              , Rol: {user.role === 1 && "Super Admin"}
                {user.role === 2 && "Admin"} 
                {user.role === 3 && "Emprendedor"}
                {user.role === 4 && "Defecto"}
              </h2> */}
              {user.role === 1 && <div className={styles.title}>Lista de Usuarios y Administradores</div>}
              {user.role === 1 && <ShowUsers></ShowUsers>}
              
            </div>

          </div>
        </div>     
      </>
    );
    
}