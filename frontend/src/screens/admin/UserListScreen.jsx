import { Link } from "react-router-dom";
import { FaEdit, FaTimes, FaCheck } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import Message from "../../components/Message";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/usersApiSlice";
import { toast, Flip } from "react-toastify"; 
import Loader from "../../components/Loader";

const UserListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (user) => {
    if (window.confirm(`Are you sure you want to delete user:\n${user.name}`)) {
      try {
        await deleteUser(user._id);
        toast.success(`User "${user.name}" deleted successfully`, {
          position: "bottom-center",
          autoClose: 500,
          hideProgressBar: true,
          transition: Flip,
          theme: "colored",
        });
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error, {
          position: "bottom-center",
          autoClose: 500,
          hideProgressBar: true,
          transition: Flip,
          theme: "colored",
        });
      }
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold pb-4">All Users</h1>

      {isLoading || loadingDelete ? (
        <div className="w-full h-[50vh] my-auto">
          <Loader />
        </div>
      ) : error ? (
        <Message color="red">{error}</Message>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-500 bg-blue-300">
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody className="text-center">
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b border-gray-500 h-10 hover:bg-gray-300 odd:bg-gray-200 select-none"
              >
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  <div className="flex justify-center">
                    {user.isAdmin ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </div>
                </td>
                <td>
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <button className="flex gap-1 items-center border border-gray-400 bg-gray-200 rounded p-1 hover:bg-gray-300">
                      <span className="text-sm">Edit</span>
                      <FaEdit className="text-[15px] text-gray-700" />
                    </button>
                  </Link>
                </td>
                <td>
                  {!user.isAdmin && (
                    <button
                      className="flex gap-1 items-center border border-gray-400 bg-gray-200 rounded p-1 hover:bg-gray-300"
                      onClick={() => deleteHandler(user)}
                    >
                      <span className="text-sm">Delete</span>
                      <FaTrashCan className="text-[15px] text-red-700" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UserListScreen;
