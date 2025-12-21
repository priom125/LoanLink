import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';
import { NavLink } from 'react-router';
import AddUserByAdmin from '../Components/AddUserByAdmin';

function ManagerDashBoard() {
  const axiosInstance = useAxios();

  const { data: allUser = [] } = useQuery({
    queryKey: ['allUser'],
    queryFn: async () => {
      const res = await axiosInstance.get('all-users');
      return res.data;
    },
  });

const pendingUsers = allUser.filter(
  (user) => user.roleStatus === "Pending"
);

console.log(pendingUsers)
  return (
    <div className="overflow-x-auto">
      <AddUserByAdmin />
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
          {pendingUsers.length > 0 ? (
  pendingUsers.map((user) => (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>
        <div className="font-bold">{user.email}</div>
      </td>
      <td>{user.role}</td>
      <td className="space-x-2">
        <NavLink to={`/dashboard/manage-users/update-user-role/${user._id}`}>
          <button className="btn btn-info btn-sm">Update</button>
        </NavLink>
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="4" className="text-center font-semibold">
      No user to show
    </td>
  </tr>
)}
        </tbody>
      </table>
    </div>
  );
}

export default ManagerDashBoard;