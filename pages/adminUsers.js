/* import { connection } from "@/models/db";
import { ShowUsers } from "components/ShowUsers";

export default function adminUsers() {
  return (
    <ShowUsers></ShowUsers>
  );
}

//TODO
export const getServerSideProps = async (context) => {
  const res = await connection.get("http://localhost:3000/api/users");

  return {
    props: {
      users: res.data,
    },
  };
}; */