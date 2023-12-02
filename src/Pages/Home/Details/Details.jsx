import { useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useUserTest from "../../../Hooks/useUserTest";


const Details = () => {
  const axiosSecure=useAxiosSecure()
  const [couponCode, setCouponCode] = useState("");
  const { user } = useAuth();
  const testData = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();
  const [,refetch]=useUserTest()
  const { testName, testDetails, image, available_Dates, slots, price, _id } =
    testData;
  const [selectedOption, setSelectedOption] = useState(
    available_Dates[0].value
  );
  const [selectedOption2, setSelectedOption2] = useState(slots[0].value);
 const [dis,setDis]=useState()
  const handleBook = (test) => {
    const { testName, testDetails, image, price } = test;
    let discountPrice = price;
    
    if (couponCode == "MY-20") {
      discountPrice = price * 0.8;
      setDis(discountPrice)
    }
    // const testData = {
    //   testName,
    //   testDetails,
    //   image,
    //   price,
    //   selectedOption,
    //   selectedOption2,
    // };
    if (user && user.email) {
      // Check if the user has already booked the test
      axiosSecure
        .get(`/checkTestBooking/${user.email}/${_id}`)
        .then((response) => {
          if (response.data.alreadyBooked) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "You have already booked this test!",
            });
          } else {
            // If not booked, proceed with the booking
            const bookTest = {
              testId: _id,
              email: user.email,
              testName,
              testDetails,
              image,
              price: discountPrice,
              selectedOption,
              selectedOption2,
            };

           axiosSecure
              .post("/testBook", bookTest)
              .then((result) => {
                console.log(result.data);
                if (result.data.insertedId) {
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Test booking Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  // refetch
                  refetch()
                }
              })
              .catch((error) => {
                console.error("Error booking test:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error checking test booking:", error);
        });
    } else {
      // ...
      return navigate('/login',{state:{from:location}})
    }
    if(!setSelectedOption){
      alert('insert a opton')
    }
  };
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img src={image} className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">{testName}</h1>
            <p className="py-6">{testDetails}</p>
            <div>
              <label className="label">
                <span className="label-text font-semibold">Available date</span>
              </label>
              <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                
                className="select select-bordered w-full max-w-xs font-bold" required
              >
                <option disabled selected>
                  select test date
                </option>
                {available_Dates?.map((date) => (
                  <option key={date.date}>{date}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">
                <span className="label-text font-semibold">
                  Select time for test
                </span>
              </label>
              <select
                value={selectedOption2}
                onChange={(e) => setSelectedOption2(e.target.value)}
                className="select select-bordered w-full max-w-xs font-bold"
              >
                <option disabled selected>
                  select test time
                </option>
                {slots?.map((time) => (
                  <option key={time.date}>{time}</option>
                ))}
              </select>
            </div>
            <h1 className="text-xl text-green-600">
              use this code for 20% discount{" "}
                <span className="text-2xl font-semibold text-blue-600">
                MY-20
              </span>
            </h1>
            <div>
              <label className="label">
                <span className="label-text font-semibold">Coupon Code</span>
              </label>
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="input input-bordered w-full max-w-xs font-bold"
              />
            </div>
            <p className="py-6 text-2xl font-semibold text-amber-500">
              Test cost :$ {price}
            </p>
            <p className="py-6 text-2xl font-semibold text-blue-700">
             Discount Test cost : $ {dis}
            </p>

            <button
              onClick={() => handleBook(testData)}
              className="btn btn-warning"
            >
              Book now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
