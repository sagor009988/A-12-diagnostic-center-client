
import useUserTest from "../../../Hooks/useUserTest";
import SectionTitel from "../../../Shared/Serction Titel/SectionTitel";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Cart = () => {
  const axiosSecure = useAxiosSecure();
  const [test,refetch] = useUserTest();
  console.log(test);
  const totalcost = test.reduce((item, test) => item + test.price, 0);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you Want to cancle appoinment?",
      text: "If you Want canle please press the cancle button",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancle!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/testBook/${id}`).
        then((res) => {
          if (res.data.deletedCount > 0) {
            if (result.isConfirmed) {
                refetch()
              Swal.fire({
                title: "Cancle!",
                text: "Your Test Apionment cancled successfully.",
                icon: "success",
              });
            }
          }
        });
      }
    });
  };

  return (
    <section>
      <SectionTitel Heading="MY UP Coming Dr. Appionment"></SectionTitel>
      <div className="flex justify-evenly rounded-t-xl m-6 bg-lime-300 py-4">
        <h1 className="text-2xl font-bold text-orange-400 ">
          Total Appionment : {test.length}
        </h1>
        <h1 className="text-2xl font-bold text-orange-400 ">
          Total Cost : {totalcost}{" "}
        </h1>
        {test.length? <Link to={'/dashBoard/payment'}>
        <button className="btn btn-secondary">Paymet</button>
        </Link>: <button disabled className="btn btn-secondary">Paymet</button>}
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-xl bg-slate-400 text-black">
              <th>
                <label>No:</label>
              </th>
              <th>Image</th>
              <th>Test Name</th>
              <th>Test Date</th>
              <th>Test Time</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {test?.map((item, index) => (
              <tr className="text-lg font-semibold" key={item._id}>
                <th>
                  <label>{index + 1}</label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.testName}</td>
                <td>{item.selectedOption}</td>
                <td>{item.selectedOption2}</td>
                <td>${item.price}</td>
                <th>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn bg-red-600 btn-sm text-xl text-white"
                  >
                    Cancle
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Cart;
