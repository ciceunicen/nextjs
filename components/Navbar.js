import styles from '@/styles/Navbar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'

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
            <div className={styles.option_title}>
                <p>AREA DE USUARIO</p>
            </div>
            <ul className={styles.ul}>
                
                <div className={styles.li}>
                    <Link href="#">Proyectos</Link>
                </div>                
                
                {role===1 && 
                    <div className={styles.li}>
                        <Link href="#">Listar Usuarios</Link>
                    </div>
                }
                {(role===1 || role === 2) && 
                    <div className={styles.li}>
                        <Link href="#">Turnos Solicitados</Link>
                    </div>
                }
                {role===3 && 
                    <div className={styles.li}>
                        <Link href="#">Solicitar Entrevista</Link>
                    </div>
                }                     
                
            </ul>
        </div>
    </div>    
    )
}