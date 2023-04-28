import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Login.module.css'
import { useRouter } from "next/router";
import { useState } from 'react';
import { toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export default function Register() {

    const router = useRouter();
    const customId = "custom-id-yes";

    const notifyErrorPassword = () => {
        toast.error("Usuario y/o contraseña erroneos", {
            position: toast.POSITION.TOP_CENTER,
            toastId: customId,
            theme: 'colored',
            draggable : false
        });     
    };

    const notifyErrorAccUsed = () => {
        toast.error("El mail ingresado está en uso", {
            position: toast.POSITION.TOP_CENTER,
            toastId: customId,
            theme: 'colored',
            draggable : false
        });     
    };

    const notifyErrorServerError = () => {
        toast.error("Error interno del servidor", {
            position: toast.POSITION.TOP_CENTER,
            toastId: customId,
            theme: 'colored',
            draggable : false
        });     
    };

    const notifyErrorPasswordLength = () => {
        toast.error("La contraseña debe tener al menos 8 caracteres y 20 como máximo", {
            position: toast.POSITION.TOP_CENTER,
            toastId: customId,
            theme: 'colored',
            draggable : false
        });     
    };

    const notifyErrorEmail = () => {
        toast.error("El mail no es valido", {
            position: toast.POSITION.TOP_CENTER,
            toastId: customId,
            theme: 'colored',
            draggable : false
        });     
    };
    
    const notifySuccesRegister = () => {
        toast.success("Bienvenido/a ! Te has registrado correctamente", {
            position: toast.POSITION.TOP_CENTER,
            toastId: customId,
            theme: 'colored',
            draggable : false
        });     
    };

    async function registerToLogin(user, password) {                
        const response = await fetch("/api/auth/login",{
            method:'POST',
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: user,
                password: password,
            }),
        })
        router.push("/dashboard");
    };
    
    const handleSubmit = async(e)=>{
        e.preventDefault();      
        const data = new FormData(e.currentTarget);
        const response = await fetch("/api/usuarios/",{
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
            registerToLogin(data.get('email'), data.get('password'));
        }else {
            switch (response.status) {
            case 400:          
                {notifyErrorPassword()}
                break;
            case 401:          
                {notifyErrorPasswordLength()}
                break;
            case 402:          
                {notifyErrorEmail()}
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

    const [passwordType, setPasswordType] = useState("password");    
    const togglePassword =()=>{
      if(passwordType==="password")
      {
        setPasswordType("text")
        return;
      }
      setPasswordType("password")
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
            width={350}
            height={220}
            priority
            />
            <div className={styles.info_Dom_Tel_Email}>
                <p className={styles.p}>Campus Universitario</p>
                <p className={styles.p}>Paraje Arroyo Seco S/N</p>
                <p className={styles.p}>0249 438 5522</p>
                <a href="mailto:info@cice.unicen.edu.ar" className={styles.a}>info@cice.unicen.edu.ar</a>
          </div>
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
                            type="text"
                            name="email" 
                            required
                        />
                    </div>                                
                    
                    <label className={styles.label} htmlFor="">
                    Contraseña
                    </label>

                    <div className={styles.passContainer}>
                        <input
                            className={styles.input}
                            type={passwordType}
                            name="password"                            
                            id="password_input"
                            maxLength={20} 
                            required
                        />
                     
                        <div className={styles.passwordEye}>
                            <button type='button'
                                onClick={togglePassword}
                            >
                            {passwordType==="password" ? 
                            <Image
                                src="/eye_closed.svg"
                                alt="eye close"
                                id="eye_closed"
                                className={styles.PasswordEyeClosed}
                                width={20}
                                height={20}
                                priority 
                            />
                            :                                     
                            <Image
                                src="/eye_open.svg"
                                alt="eye open"
                                id="eye_open"
                                className={styles.PasswordEyeOpen}
                                width={20}
                                height={20}                    
                                priority 
                            /> }
                            </button>
                        </div>
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
