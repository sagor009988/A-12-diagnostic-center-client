import { FaTrash } from "react-icons/fa6";
import useTest from "../../Hooks/useTest";
import SectionTitel from "../../Shared/Serction Titel/SectionTitel";
import { FaEdit } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
const ManageTestsByAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [tests, , refetch] = useTest();

  // delete
  const handleDelete = (testss) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You you want to delete a test",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/tests/${testss._id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${testss.testName} has benn deleted`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };
  return (
    <div>
      <SectionTitel
        subHeading="hallo admin manage this"
        Heading="All Tests manage by Admin"
      ></SectionTitel>
      <h2 className="text-3xl font-bold text-orange-600">
        Total Available Test : {tests.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-yellow-600 text-black">
            <tr>
              <th>No:</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Update</th>
              <th>Delate</th>
            </tr>
          </thead>
          <tbody>
            {tests?.map((test, index) => (
              <tr key={test._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={test.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{test.testName}</td>
                <td>{test.price} taka</td>
                <th>
                  <Link to={`/dashBoard/updateTest/${test._id}`}><button
                    // onClick={() => handleDelete(user)}
                    className="btn btn-warning"
                  >
                    <FaEdit />
                  </button></Link>
                </th>
                <th>
                  <button
                    onClick={() => handleDelete(test)}
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

export default ManageTestsByAdmin;
