import styles from '@/styles/Navbar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'

/**
 * @author JuanMolfese
 * @async @function Navbar 
 * This function prints a vertical menu on the screen that allows the user to interact with the application
 * @param {*} 
 * user, role, name and surname
 * @returns 
 */
export default function Navbar({user, role, name, surname}) {

    const logout = async ()=>{
        const response = await axios.post("/api/auth/logout");        
    }

    return(    
    <div className={styles.section}>
        <div className={styles.userInf}>
            <Image
            src="/logo cice con slogan.png"
            alt="CICE Logo"
            className={styles.logo_Cice}
            width={100}
            height={50}
            priority
            />
            <div className={styles.userName}>
                { name } { surname }
            </div>
            <div className={styles.user}>
                { user } 
            </div>
        </div>

        <div className={styles.avatarContainer}>           
            <Image                
                src={"/avatar0.png"}
                alt="avatar"
                width={72}
                height={72}
                className={styles.avatar}
                priority
            />
        </div>
        <div className={styles.options}>
            <div className={styles.option_title}>
                <p>ACCESO</p>
            </div>
            <div className={styles.logout}>
                <Link href="/" onClick={()=>logout()}>Logout</Link>
            </div>

            {(role===1 ||role===2) && <div className={styles.option_title}>
                <p>PROYECTOS</p>
            </div>}
                {(role===1 ||role===2) && <ul className={styles.ul}>                
                    <div className={styles.li}>
                        <Link href="#">Listar Proyectos</Link>
                    </div> 
                </ul>}

            {(role===1 ||role===2) && <div className={styles.option_title}>
                <p>EMPRENDEDORES</p>
            </div>}

                {(role===1 ||role===2) && <ul className={styles.ul}>                
                    <div className={styles.li}>
                        <Link href="#">Listar Emprendedores</Link>
                    </div> 
                </ul>}

            {(role===1 ||role===2) && 
                <div className={styles.option_title}>
                    <p>UTILIDADES</p>
                </div>}
            
            {(role===3 || role===4) && 
                <div className={styles.option_title}>
                    <p>AREA DE USUARIO</p>
                </div>}
                { (role===1 || role === 2) && 
                    <ul className={styles.ul}> 
                        <div className={styles.li}>
                            <Link href="#">Turnos Solicitados</Link>
                        </div>
                    </ul>}
                
                { (role===1 ) && 
                    <ul className={styles.ul}> 
                    <div className={styles.li}>
                        <Link href="#">Listar Usuarios</Link>
                    </div>
                    </ul>}
                
                { role===3 && 
                    <ul className={styles.ul}> 
                        <div className={styles.li}>
                            <Link href="#">Mis Proyectos</Link>
                        </div>
                        <div className={styles.li}>
                            <Link href="#">Solicitar Entrevista</Link>
                        </div>                                                
                    </ul>
                }                

                { role===4 && 
                    <ul className={styles.ul}> 
                        <div className={styles.li}>
                        {/* Show menu/screen to register as an entrepreneur */}
                            <Link href="#">Quiero presentar proyecto</Link>
                        </div>  
                    </ul>
                }             
        </div>
    </div>    
    )
}