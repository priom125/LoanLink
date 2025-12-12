import { useQuery } from '@tanstack/react-query';

import useAxios from '../hooks/useAxios';

function ManagerDashBoard() {


const axiosInstance = useAxios();

const {data:allUser = []} = useQuery({
    queryKey: ['allUser'],
    queryFn: async () => {
        const res = await axiosInstance.get("all-users");
        return res.data;
    },
});

console.log(allUser);
  return (
    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {allUser.map((user) => (
        <tr key={user._id}>
          <td>{user.name}</td>
          <td>
            <div className="font-bold">{user.email}</div>
           
          </td>

          <td>
            {user.role}
          </td>
          <td className="space-x-2">
            <button className="btn btn-success btn-sm">Update</button>
          </td>
        </tr>
      ))}

    </tbody>
  </table>
</div>
  )
}

export default ManagerDashBoard