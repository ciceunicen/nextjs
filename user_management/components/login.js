import Image from 'next/image'
import styles from '@/styles/Login.module.css'

export default function Login(){

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
                                    <input className={styles.input} type="text" name="" id="" />
                                </div>
                                <div className={styles.labInput}>
                                    <label className={styles.label} htmlFor="">
                                    Contraseña
                                    </label>
                                    <div className={styles.eye_password}>
                                        <input
                                            className="input-eye"
                                            type="password"
                                            name=""
                                            id="password-input"
                                        />
                                        <svg
                                            id="eye"
                                            onclick="showpassword()"
                                            width={35}
                                            height={35}
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            >
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <path d="M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6z" />
                                        </svg>
                                    </div>
                                    <a id="FgPass" href="">
                                        ¿Olvidaste tu contraseña?
                                    </a>
                                </div>                            
                            </div>
                            <div className={styles.button_volver}>
                                <button class="button">INGRESAR</button>
                                <a>¿No sos usuario?</a>
                                <button class="button">REGISTRARSE</button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* <div>
                    <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    By{' '}
                    <Image
                        src="/vercel.svg"
                        alt="Vercel Logo"
                        className={styles.vercelLogo}
                        width={100}
                        height={24}
                        priority
                    />
                    </a>
                </div> */}

            </div>  
        </>
        )
}