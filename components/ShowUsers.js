/* export default function ShowUsers( {props} ){
    return(
        //TODO
        <h2>Muestra lista de usuarios</h2>
    );
}


export const getServerSideProps = async (context) => {
  const res = await connection.get("http://localhost:3000/api/usuarios");

  return {
    props: {
      users: res.data,
    },
  };
}; 

*/