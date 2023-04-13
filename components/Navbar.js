import styles from '@/styles/Navbar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'

export default function Navbar({props}) {

    const logout = async ()=>{
        const response = await axios.post("/api/auth/logout");        
    }
    
    return(    
    <div className={styles.section}>
        
            <Image
            src="/logo cice con slogan.png"
            alt="CICE Logo"
            className={styles.logo_Cice}
            width={100}
            height={50}
            priority
            />        
        <ul className={styles.ul}>
            <li className={styles.li}><Link href="#">Proyectos</Link></li>
            <li className={styles.li}><p>{ props }</p></li>
            <li className={styles.li}><Link href="/" onClick={()=>logout()}>Logout</Link></li>
        </ul>
    </div>    
    )
}