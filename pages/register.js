import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Login.module.css'
import { useRouter } from "next/router";


export default function Register() {

  const router = useRouter();
    
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

            <form className={styles.form_login} action="/api/auth/register" method='POST'>
                <div className={styles.titulo}>
                    <h2>REGISTRO</h2>
                </div>
                
                <div className={styles.inputLog}>   

                    <div className={styles.register_name_surname}>
                        <div className={styles.labInput}>
                            <label className={styles.label} htmlFor="">
                                Nombre
                            </label>
                            <input className={styles.input} type="text" name="name" required/>
                        </div> 

                        <div className={styles.labInput}>
                            <label className={styles.label} htmlFor="">
                                Apellido
                            </label>
                            <input className={styles.input} type="text" name="surname"/>
                        </div> 
                    </div>
                
                    <div className={styles.labInput}>
                        <label className={styles.label} htmlFor="">
                            Email
                        </label>
                        <input className={styles.input} type="text" name="email" required/>
                    </div>                                
                    
                    <div className={styles.labInput}>
                        <label className={styles.label} htmlFor="">
                        Contraseña
                        </label>
                        <input className={styles.input} type="password" name="password" id="password_input" required/>
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
