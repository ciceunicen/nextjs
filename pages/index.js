import { Inter } from 'next/font/google'
import Image from 'next/image'
import styles from '@/styles/Login.module.css'
import { useRouter } from "next/router";
import { useState } from 'react';
import { toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
  const router = useRouter();
  const customId = "custom-id-yes";

  function validateEmail(email){
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  }  

  const forgotPass = () => {
    if (credentials.email!=""){
      if(validateEmail(credentials.email)){        
          toast.success(`Te enviamos un mail a ${credentials.email} para que generes tu contraseña`, {
            position: toast.POSITION.TOP_CENTER,
            toastId: customId,
            theme: 'colored',
            draggable : false
          });        
      }else{
        toast.error("El email tiene un formato invalido", {
          position: toast.POSITION.TOP_CENTER,
          toastId: customId,
          theme: 'colored',
          draggable : false
        });  
      }
    }else{
      toast.error("Por favor ingresá el email", {
        position: toast.POSITION.TOP_CENTER,
        toastId: customId,
        theme: 'colored',
        draggable : false
      }); 
    } 
  }

  const notifyErrorPass = () => {
    toast.error("Usuario y/o contraseña erroneos", {
      position: toast.POSITION.TOP_CENTER,
      toastId: customId,
      theme: 'colored',
      draggable : false
    });     
  };

  const notifyErrorServer = () => {
    toast.error("Error interno del servidor", {
      position: toast.POSITION.TOP_CENTER,
      toastId: customId,
      theme: 'colored',
      draggable : false
    });     
  };
  
  
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
          {notifyErrorPass()}
          break;
        case 500:
          {notifyErrorServer()}
          break;
        case 400:
          console.log("Se deben completar todos los campos");
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
                <h2>INICIAR SESION</h2>
            </div>
              
            <div className={styles.inputLog}>          
              <div className={styles.labInput}>
                <label className={styles.label} htmlFor="">
                  Email
                </label>
                  <input
                    className={styles.input}
                    type="email"
                    name="email"
                    onChange={handleChange}
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
                  id="password"
                  onChange={handleChange}
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
              
            <div className={styles.forgotPass} onClick={forgotPass}>                                    
                ¿Olvidaste tu contraseña?
            </div>  

            <div className={styles.buttons}>               
              <button className={styles.button}>Ingresar</button>              
              
              <div className={styles.notUser}>                       
                <p>¿No sos usuario?</p>
              </div>
              
              <button type="button" onClick={() => router.push('/register')} className={styles.button}>Registrarse</button>              
            </div>  
          </form>          
        </div>
      </div>
    </div>
  </main>  
  </>
  );
}
