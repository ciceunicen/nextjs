export default function dashboard() {
    return (
      <>
        <div className='center'>          
          <h2> Seccion Dashboard del usuario logueado</h2>          
          <h4> En la consola de desarrollador del navegador (f12), se puede verificar </h4>
          <h4> en la pestaña aplicacion -  almacenamiento - cookies, tendria que mostarse el token cifrado</h4>
        </div>

        <style jsx>{`
            .center{                            
              text-align: center;
              margin-top: 3rem;
            }            
        `}
        </style>


      </>
    );
}