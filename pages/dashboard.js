import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
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
              <h2> Seccion Dashboard del usuario {user.email} 
              , Rol: {user.role === 1 && "Super Admin"}
                {user.role === 2 && "Admin"} 
                {user.role === 3 && "Emprendedor"}
                {user.role === 4 && "Defecto"}
              </h2>
              <br/>
              <h4> En la consola de desarrollador del navegador (f12), se puede verificar </h4>
              <br/>
              <h4> en la pestaña aplicacion -  almacenamiento - cookies, tendria que mostarse el token cifrado</h4>
              <br/>
              <h4> En la pagina <a href="https://jwt.io/" target="_blank"> JWT.io</a> podes pegar el token cifrado para verificar su contenido</h4>
              <br/>
              <h4>Si presionas logout, se destruye el token y redirecciona a la pantalla de login</h4>
            </div>

          </div>
        </div>     
      </>
    );
    
}