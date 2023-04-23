//In React, need to render individuals buttons in a table instead. each button must contain the id and the role that the component receives by parameter?
import styles from '../styles/Table.module.css';
import { useState, useEffect } from'react';

export default function ButtonAdmin( {id, role}) {

  const [config, setConfig] = useState({
    id: id,
    role: role,
    className: role === 2 ? styles.buttonAdmin : styles.buttonNoAdmin
  });

  function toggle(id, role){ 
    const newRole = config.role === 2 ? 4 : 2;    
      setConfig({ ...config, role: newRole, className: newRole === 2 ? styles.buttonAdmin : styles.buttonNoAdmin });
    
  }

  return (
    <div>      
        <button type="button"
          key={config.id}          
          onClick={toggle}
          className={config.className}
        >          
          {config.role === 2 ? "Quitar Admin" : "Ser Admin"}
        </button>
    </div>
  )
};

