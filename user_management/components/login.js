import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Login.module.css'
/* import { useSession, signIn, signOut } from "next-auth/react"; */
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Login(){
    
    const router = useRouter();
    
    /* const { data: session } = useSession()

    useEffect(() => {
        if (session) {
        router.push("/")
        }
    }, [session])

     
    function iniciarSesionGoo(e){
        e.preventDefault();
        signIn('google', {callbackUrl:'https://paginaxxxxxx'})
    } */

   
    return(
        <>
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

                        <form className={styles.form_login} action="">
                            <div className={styles.titulo}>
                                <h2>INICIAR SESION</h2>
                            </div>
                            
                            <div className={styles.inputLog}>                            
                            
                                <div className={styles.labInput}>
                                    <label className={styles.label} htmlFor="">
                                        Email
                                    </label>
                                    <input className={styles.input} type="text" name="" />
                                </div>                                
                                
                                <div className={styles.labInput}>
                                    <label className={styles.label} htmlFor="">
                                    Contraseña
                                    </label>
                                    <input className={styles.input} type="password" name="" id="password_input"/>
                                </div> 

                            </div>
                            
                            <div className={styles.forgotPass}>                                    
                                <Link href="/forgotPass" passHref legacyBehavior>
                                    <a className={styles.FgPass} href="">
                                        ¿Olvidaste tu contraseña?
                                    </a>
                                </Link>                           
                            </div>  

                            <div className={styles.buttons}> 
                                
                                <button type="button" onClick={() => router.push('/api/auth')} className={styles.button}>Ingresar</button>
                                
                                <div className={styles.notUser}>                       
                                    <p>¿No sos usuario?</p>
                                </div>    
                                
                                <button type="button" onClick={() => router.push('/register')} className={styles.button}>Registrarse</button>

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
                                    <button onClick={iniciarSesionGoo} type="submit" className={styles.btnSubmit}>Iniciar Sesion</button>
                                </div>
                                ))
                            }   */}   

                        </form>
                    </div>
                </div>

            </div>  
        </>
        )
}