//In React, need to render individuals buttons in a table instead. each button must contain the id and the role that the component receives by parameter?
import styles from '../styles/Table.module.css';
import { useState, useEffect } from'react';

export default function ButtonAdmin( {id, role}) {

const [config, setConfig] = useState({
  id: id,
  role: role
});

useEffect(()=>{
  setConfig({id:id, role:role});
}, [id, role])



/* function toggle(id, role){
    setConfig({
      id: id,
      role: role
    });
  } */
  return (
    <div>      
        <button type="button"
          //className={styles.buttonAdmin}
          key={config.id}
          //onClick={() => toggle(id, role)}
        >
          {/* {role === 0 ? "Cambiar a Admin" : "Quitar Admin" } */}
          {config.id}, 
          {config.role}
        </button>
      
      {/* <div style={{ color: 'white' }}>         */}
      
    </div>
  )
};
