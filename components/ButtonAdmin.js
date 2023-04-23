 // Define the initial config object in a constant variable, since it doesn't depend on state
import styles from '../styles/Table.module.css';
import { useState } from'react';
import axios from 'axios';

export default function ButtonAdmin( {id, role}) {

 // Define the initial config object in a constant variable, since it doesn't depend on state
  const initialConfig = {
    id: id,
    role: role,
    className: role === 2 ? styles.buttonAdmin : styles.buttonNoAdmin,
  };

    // Use initialConfig as the initial state value
  const [config, setConfig] = useState(initialConfig);

  async function toggle() {
    // Access the current role directly from the config object
    const newRole = config.role === 2 ? 4 : 2;
    // Pass the new config object directly to setConfig
    setConfig({
      id: config.id,
      role: newRole,
      className: newRole === 2 ? styles.buttonAdmin : styles.buttonNoAdmin,
    });
    
    // Use the id parameter directly, not wrapped in an object
    const res = await axios({
      method: 'put',
      url: `/api/usuarios/${id}`,
      data:{
        id : config.id,
        role : newRole
      }
    });
    console.log(res);
  };



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