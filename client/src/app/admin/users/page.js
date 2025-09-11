"use client";

import Swal from "sweetalert2";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { MdDelete } from "react-icons/md";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const UserPage = () => {
  const axiosSecure = useAxiosSecure();
  const [updatingUserId, setUpdatingUserId] = useState(null);
  const { users, userIsLoading, userError, userRefetch } = useUser();

  const handleToggleRole = async (userId, currentRole) => {
    const newRole = currentRole === "user" ? "admin" : "user";
    const result = await Swal.fire({
      title: `Change role to ${newRole}?`,
      text: "Are you sure you want to change this user's role?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00a88f",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, make ${newRole}`,
    });
    if (result.isConfirmed) {
      try {
        setUpdatingUserId(userId);
        await axiosSecure.patch(`/api/users/${userId}/role`, {
          role: newRole,
        });
        Swal.fire("Updated!", `User role changed to ${newRole}.`, "success");
        userRefetch();
      } catch (error) {
        Swal.fire("Error!", "Failed to change role.", "error");
        console.error("Failed to update role:", error);
      } finally {
        setUpdatingUserId(null);
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00a88f",
      cancelButtonColor: "#d33",
      confirmButtonText: "delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/api/users/${userId}`);
        Swal.fire("Deleted!", "User has been deleted.", "success");
        userRefetch();
      } catch (error) {
        Swal.fire("Error!", "Failed to delete user.", "error");
        console.error("Failed to delete user:", error);
      }
    }
  };

  if (userIsLoading) return <p>Loading...</p>;
  if (userError) return <p>Error loading users</p>;

  return (
    <div className="w-11/12 mx-auto min-h-screen">
      <h1 className="text-center text-lg sm:text-xl md:text-3xl lg:text-5xl 2xl:text-7xl font-bold my-10">
        User list
      </h1>

      {/* Responsive Table */}
      <div className="w-full overflow-hidden">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-2 text-[10px] sm:text-xs md:text-sm lg:text-base text-left">
                Name
              </th>
              <th className="px-2 py-2 text-[10px] sm:text-xs md:text-sm lg:text-base text-left">
                Email
              </th>
              <th className="px-2 py-2 text-[10px] sm:text-xs md:text-sm lg:text-base text-center">
                Action
              </th>
              <th className="px-2 py-2 text-[10px] sm:text-xs md:text-sm lg:text-base text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-2 py-2 text-[10px] sm:text-xs md:text-sm lg:text-base">
                  {user.name}
                </td>
                <td className="px-2 py-2 text-[10px] sm:text-xs md:text-sm lg:text-base">
                  {user.email}
                </td>
                <td className="px-2 py-2 text-center">
                  {user?.role === "admin" ? (
                    <h1 className="sm:text-xs md:text-sm lg:text-base">
                      {user.role}
                    </h1>
                  ) : (
                    <button
                      disabled={updatingUserId === user._id}
                      onClick={() => handleToggleRole(user._id, user.role)}
                      className="px-2 py-1 sm:px-3 lg:py-1.5 lg:px-4 2xl:py-2 text-[10px] sm:text-xs md:text-sm lg:text-base bg-[#00a88f] text-white rounded-md hover:bg-[#1a7f73] transition"
                    >
                      {user.role === "user" ? "Make Admin" : "Make User"}
                    </button>
                  )}
                </td>
                <td className="px-2 py-2 text-center">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 text-[10px] sm:text-xs md:text-sm lg:text-base bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                  >
                    <MdDelete className="text-base" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPage;
