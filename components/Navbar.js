import styles from '@/styles/Navbar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'

export default function Navbar({user, role, name, surname}) {

    const logout = async ()=>{
        const response = await axios.post("/api/auth/logout");        
    }
    
    //detalle estetico solo con fines de presentacion del dashboard
    //esta constante pasa un valor entre 0 y 3 para que se seleccione
    //al azar un avatar en el dashboard. Cuando se implemente esto se debe 
    //eliminar ya que ira la imagen que seleccione el usuario.
    const avatarImageRandom = Math.floor(Math.random() * 4);

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
            {/* la imagen en produccion sera la que elija el usuario y debera almacenarse en la DB (crear atributo para tal fin) */}
            <Image                
                src={"/avatar" + avatarImageRandom + ".png"}
                alt="avatar"
                width={72}
                height={72}
                className={styles.avatar}
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
                        <Link href="/api/usuarios/">Listar Usuarios</Link>
                    </div>
                }                
                
            </ul>
        </div>
    </div>    
    )
}