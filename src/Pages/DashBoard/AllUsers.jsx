import { useQuery } from "react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import SectionTitel from "../../Shared/Serction Titel/SectionTitel";

import Swal from "sweetalert2";

import { FaTrash, FaUser } from "react-icons/fa6";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users",);
       console.log(res.data);
      return res.data;
    },
  });

  //   create Admin
  const handleAdmin = async (user) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure make a admin?",
        text: "Making a admin to control the side",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, create it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
              if (result.isConfirmed) {
                refetch();
                swalWithBootstrapButtons.fire({
                  title: "Created",
                  text: "create Admin Successfull .",
                  icon: "success",
                });
              }
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "admmin create cancelled",
                icon: "error",
              });
            }
          });
        }
      });
  };
  //   details
  const handleDetails = async (id) => {
    try {
      const res = await axiosSecure.get(`/users/${id}`);
      const userDetails = res.data;
      // use details
      Swal.fire({
        title: "User Details",

        html: `
          <p>Name: ${userDetails._id}</p>
          <p>Name: ${userDetails.name}</p>
          <p>Email: ${userDetails.email}</p>
          <p>District: ${userDetails.district}</p>
          <p>Upazila: ${userDetails.upazila}</p>
          <p>BloodGroup: ${userDetails.bloodGroup}</p>
          
          <img src="${userDetails.image}" alt="User Image" style="max-width: 200px; height: 200px justify-content:center">
          `,
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
      // Handle error, show an alert, etc.
    }
  };
  // delete
  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch()
            Swal.fire({
              title: "Deleted!",
              text: "user has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <SectionTitel Heading="all users section"></SectionTitel>
      <div className="flex justify-evenly my-4">
        <h1 className="text-2xl font-bold text-black">ALL Users</h1>
        <h1 className="text-2xl font-bold text-black">
          Total Users: {users.length}
        </h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-pink-300 text-black">
              <th>
                <label>No:</label>
              </th>
              <th>Image</th>
              <th>Name</th>

              <th>Admin</th>
              <th>Details</th>
              <th>Block</th>
              
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={user._id} className="bg-lime-300">
                <th>
                  <label>{index + 1}</label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={user.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td className=" text-black font-medium">{user.name}</td>

                <th>
                  {user.role === "admin" ? (
                    "admin"
                  ) : (
                    <button
                      onClick={() => handleAdmin(user)}
                      className="btn btn-warning"
                    >
                      <FaUser></FaUser>
                    </button>
                  )}
                </th>
                <th>
                  <button
                    onClick={() => handleDetails(user._id)}
                    className="btn btn-primary"
                  >
                    details
                  </button>
                </th>
                <th>
                  <button className="btn btn-secondary">Block</button>
                </th>
                
                <th>
                  <button
                    onClick={() => handleDelete(user)}
                    className="text-2xl text-red-600 "
                  >
                    <FaTrash></FaTrash>
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
