import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Login.module.css'
import { useRouter } from "next/router";
import { toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export default function Register() {

  const router = useRouter();
  const customId = "custom-id-yes";

  const notifyErrorPassword = () => {
    toast.error("Usuario y/o contraseña erroneos", {
      position: toast.POSITION.TOP_CENTER,
      toastId: customId,
      theme: 'colored'
    });     
  };

  const notifyErrorAccUsed = () => {
    toast.error("El mail ingresado está en uso", {
      position: toast.POSITION.TOP_CENTER,
      toastId: customId,
      theme: 'colored'
    });     
  };

  const notifyErrorServerError = () => {
    toast.error("Error interno del servidor", {
      position: toast.POSITION.TOP_CENTER,
      toastId: customId,
      theme: 'colored'
    });     
  };

  const notifySuccesRegister = () => {
    toast.success("Te has registrado correctamente", {
      position: toast.POSITION.TOP_CENTER,
      toastId: customId,
      theme: 'colored'
    });     
  };

    const handleSubmit = async(e)=>{
        e.preventDefault();      
        const data = new FormData(e.currentTarget);
        const response = await fetch("/api/auth/register",{
            method:'POST',
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: data.get('name'),
                surname: data.get('surname'),
                email: data.get('email'),
                password: data.get('password'),
            }),
        })
        

        if (response.ok) {    
            {notifySuccesRegister()};
            router.push("/");           
        }else {
            switch (response.status) {
            case 400:          
                {notifyErrorPassword()}
                break;
            case 409:
                {notifyErrorAccUsed()}
                break;
            case 500:
                {notifyErrorServerError()}
                break;
            default:           
                break;
            }    
        };
    }



    
return (
<>      
<main>    

<div className={styles.main}>
    <div className={styles.login_container}>
        <div className={styles.info_login}>
            <Image
            src="/logo cice con slogan.png"
            alt="CICE Logo"
            className={styles.logo_Cice}
            width={300}
            height={150}
            priority
            />
        </div>

        <div className={styles.login_form_container}>

            <form className={styles.form_login} onSubmit={handleSubmit}>
                <div className={styles.titulo}>
                    <h2>REGISTRO</h2>
                </div>
                
                <div className={styles.inputLog}>   

                    <div className={styles.register_name_surname}>
                        <div className={styles.labInput}>
                            <label className={styles.label} htmlFor="">
                                Nombre
                            </label>
                            <input
                                className={styles.input}
                                type="text"
                                name="name"
                                required
                            />
                        </div> 

                        <div className={styles.labInput}>
                            <label className={styles.label} htmlFor="">
                                Apellido
                            </label>
                            <input 
                                className={styles.input}
                                type="text"
                                name="surname"
                                required
                            />
                        </div> 
                    </div>
                
                    <div className={styles.labInput}>
                        <label className={styles.label} htmlFor="">
                            Email
                        </label>
                        <input
                            className={styles.input}
                            type="email"
                            name="email" 
                            required
                        />
                    </div>                                
                    
                    <div className={styles.labInput}>
                        <label className={styles.label} htmlFor="">
                        Contraseña
                        </label>
                        <input
                            className={styles.input}
                            type="password"
                            name="password"                            
                            minLength={8}
                            maxLength={20}
                            id="password_input"
                            required
                        />
                    </div> 

                </div>
                
                <div className={styles.buttons}>                    
                    <button type="submit" className={styles.button}>Registrarse</button>              
                </div>
              
                <div className={styles.already_have_an_account}>                                    
                    <Link href="/" passHref legacyBehavior>
                    <a className={styles.FgPass} href="">
                        ¿Ya tienes una cuenta?
                    </a>
                    </Link>                           
                </div>                       

                </form>
            </div>
        </div>

    </div>  

</main>  
</>
)
}
