import axios from "axios";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/users`,
        {
          params: {
            role: roleFilter !== "all" ? roleFilter : undefined,
            search: searchQuery,
          },
        }
      );
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [roleFilter, searchQuery]);

  const handleDelete = async (userToDelete) => {
    const { isConfirmed } = await Swal.fire({
      title: `Are you sure?`,
      text: `Delete ${userToDelete.email}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!isConfirmed) return;

    try {
      // Delete from users collection
      await axios.delete(
        `http://localhost:3000/users/${userToDelete.email}`
      );

      // If guide, also delete from tour-guides
      if (userToDelete.role === "guide") {
        await axios.delete(
          `http://localhost:3000/tour-guides/${userToDelete.email}`
        );
      }

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: `${userToDelete.email} has been removed.`,
      });

      fetchUsers(); // refresh the list
    } catch (err) {
      console.error("Error deleting user:", err);
      Swal.fire("Error", "Failed to delete user", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        {/* Search Input */}
        <div className="form-control w-full md:w-1/2">
          <label className="input input-bordered flex items-center gap-2">
            <FaSearch />
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="grow"
            />
          </label>
        </div>

        {/* Role Filter Dropdown */}
        <select
          className="select select-bordered"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="tourist">Tourist</option>
          <option value="guide">Tour Guide</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => (
              <tr key={u._id}>
                <td>{idx + 1}</td>
                <td title={`${u.firstName} ${u.lastName}`}>
                  {u.firstName || "N/A"}
                </td>
                <td>{u.email}</td>
                <td className="capitalize">{u.role}</td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-sm btn-error"
                    disabled={
                      (u.role === "admin" &&
                        users.filter((u) => u.role === "admin").length === 1) ||
                      user?.email === u.email
                    }
                    onClick={() => handleDelete(u)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="text-center text-gray-500 mt-6">No users found.</div>
        )}
      </div>
    </div>
  );
}
