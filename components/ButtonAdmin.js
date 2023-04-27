import styles from '../styles/Table.module.css';
import { useState } from'react';
import axios from 'axios';

/**
* @author JuanMolfese
* @async @function ButtonAdmin
* It initializes a constant variable called "initialConfig" that holds an object 
* containing props passed in as parameters such as id and role, as well as conditional
* styling based on the passed in "role" prop.
* The function then utilizes the hook useState to initialize a new constant variable called 
* "config," which will hold the value of the "initialConfig."
* The function continues with an asynchronous function called "toggle," which calls the 
* "handleClick" function and stores it in a constant variable called "newRole." It then calls
* another constant variable called "setConfig," which update "config" object with new values. 
* Additionally, it uses axios to update the "role" attribute of the "props.id" parameter in 
* the database.Finally, the function returns a button with the values obtained from 
* "initialConfig." When the button is clicked, it will trigger the "toggle" function to update
* the "config" object and role attribute in the database.
* @callback handleClick
* The function initializes another constant variable called "handleClick" that gets triggered
* when the button is clicked. It then calls the props.onChange function, which passes a new
* order and a corresponding set of states.
* @param {*} props 
*/
export default function ButtonAdmin( props ) {
  
  const [config, setConfig] = useState(initialConfig);
  
  const initialConfig = {
    id: props.id,
    role: props.role,
    className: props.role === 2 ? styles.buttonAdmin : styles.buttonNoAdmin,
  };

  const handleClick = () => {    
    const newOrder = 1;    
    props.onChange(newOrder);  
  };

  async function toggle() {    
    handleClick();
    const newRole = config.role === 2 ? 4 : 2;    
    
    setConfig({
      id: config.id,
      role: newRole,
      className: newRole === 2 ? styles.buttonAdmin : styles.buttonNoAdmin,      
    }); 
    
    const res = await axios({
      method: 'put',
      url: `/api/usuarios/${props.id}`,
      data:{
        id : config.id,
        role : newRole
      }
    });
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