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
      <div className="text-[0.75rem] sm:text-[0.8rem] md:text-[0.85rem] lg:text-[1rem]">
        <h1 className="text-[1.5em] font-bold pb-4">All Users</h1>

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
                <th className="hidden md:table-cell">ID</th>
                <th className="hidden md:table-cell">NAME</th>
                <th className="hidden md:table-cell">EMAIL</th>
                <th className="hidden md:table-cell">ADMIN</th>
                <th className="hidden md:table-cell"></th>
                <th className="hidden md:table-cell"></th>
              </tr>
            </thead>

            <tbody className="md:text-center">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="md:h-10 hover:bg-gray-300 odd:bg-gray-100 even:bg-gray-200 select-none"
                >
                  <td className='block py-1 px-2 before:content-["ID\:"] before:pr-2 before:font-bold before:text-left md:before:hidden md:table-cell'>{user._id}</td>
                  <td className='block py-1 px-2 before:content-["NAME\:"] before:pr-2 before:font-bold before:text-left md:before:hidden md:table-cell'>{user.name}</td>
                  <td className='block py-1 px-2 before:content-["EMAIL\:"] before:pr-2 before:font-bold before:text-left md:before:hidden md:table-cell'>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td className='block py-1 px-2 before:content-["ADMIN\:"] before:pr-2 before:font-bold before:text-left md:before:hidden md:table-cell'>
                    <div className="inline md:flex justify-center">
                      {user.isAdmin ? (
                        <FaCheck className="text-green-500 inline" />
                      ) : (
                        <FaTimes className="text-red-500 inline" />
                      )}
                    </div>
                  </td>
                  <td className='block py-1 px-2 md:table-cell'>
                    <Link to={`/admin/user/${user._id}/edit`}>
                      <button className="flex gap-1 items-center border border-gray-400 bg-gray-200 rounded p-1 hover:bg-gray-300">
                        <span className="text-[0.875em]">Edit</span>
                        <FaEdit className="text-[1em] text-gray-700" />
                      </button>
                    </Link>
                  </td>
                  <td className='block py-1 px-2 md:table-cell'>
                    {!user.isAdmin && (
                      <button
                        className="flex gap-1 items-center border border-gray-400 bg-gray-200 rounded p-1 hover:bg-gray-300"
                        onClick={() => deleteHandler(user)}
                      >
                        <span className="text-[0.875em]">Delete</span>
                        <FaTrashCan className="text-[1em] text-red-700" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default UserListScreen;
