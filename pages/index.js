import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Login.module.css'
import { useRouter } from "next/router";
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const router = useRouter();

  const [credentials, setCredentials] = useState ({
    email: '',
    password: ''
  });

  const handleChange = (e)=> {  
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();  
    const data = new FormData(e.currentTarget);
    const response = await fetch("/api/auth/login",{
      method:'POST',
      headers:{ 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.get('email'),
        password: data.get('password'),
      }),
    })
  

    if (response.ok) {           
      router.push("/dashboard");            
    } else {
      switch (response.status) {
        case 401:
          console.log("Email o contraseña invalidos");
          break;
        case 500:
          console.log("(Error interno del servidor");
          break;
        case 400:
          console.log("Se deben completar todos los campos");
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
                <h2>INICIAR SESION</h2>
            </div>
              
            <div className={styles.inputLog}>          
              <div className={styles.labInput}>
                <label className={styles.label} htmlFor="">
                  Email
                </label>
                  <input
                    className={styles.input}
                    type="text"
                    name="email"
                    onChange={handleChange}
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
                  onChange={handleChange}
                  required
                />
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
              <button className={styles.button}>Ingresar</button>              
              
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
  );
}
