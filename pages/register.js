import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Login.module.css'
import { useRouter } from "next/router";
/* import { useSession, signIn, signOut } from "next-auth/react"; */
/* import { useEffect } from "react"; */


export default function Register() {

  const router = useRouter();
    
  /* const { data: session } = useSession()
      useEffect(() => {
          if (session) {
          router.push("/")
          }
      }, [session])
   
      function iniciarSesionGoogle(e){
          e.preventDefault();
          signIn('google', {callbackUrl:'https://paginaxxxxxx'})
      } */

return (
<>      
<main>    

<div className={styles.main}>
    <div className={styles.login_container}>
        <div className={styles.info_login}>
            <Image
            src="/logo cice con slogan.png"
            alt="CICE Logo"
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
              
                <div className={styles.forgotPass}>                                    
                    <Link href="/" passHref legacyBehavior>
                    <a className={styles.FgPass} href="">
                        ¿Ya tienes una cuenta?
                    </a>
                    </Link>                           
                </div> 

                    {/* {(session) ? (
                        (  
                        <div className={styles.contentSubmit }>
                            <button onClick={() => signOut('google')} type="submit" className={styles.btnInicioSesion}>Cerrar Sesion Google</button>
                        </div>
                        )
                        ) : (                        
                        (    
                        <div className={styles.contentSubmit}>
                            <button onClick={iniciarSesionGoogle} type="submit" className={styles.btnSubmit}>Iniciar Sesion</button>
                        </div>
                        ))
                    }   */}   

                </form>
            </div>
        </div>

    </div>  

</main>  
</>
)
}
