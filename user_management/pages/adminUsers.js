import axios from "axios";
import { ShowUsers } from "components/ShowUsers";

function adminUsers() {
  return (
    <ShowUsers></ShowUsers>
  );
}
export default adminUsers;

export const getServerSideProps = async (context) => {
  const res = await axios.get("http://localhost:3000/api/users");

  return {
    props: {
      users: res.data,
    },
  };
};