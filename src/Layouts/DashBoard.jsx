import {
    FaAddressBook,
  FaBookMedical,
  FaCalendarCheck,
  FaCalendarDay,

  FaFileMedical,
  FaHouse,
  FaHouseMedical,
  FaList,
  FaNode,
  FaPhone,
  FaUsers,
} from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import { PiFlagBannerDuotone } from "react-icons/pi";
import useAdmin from "../Hooks/useAdmin";



const DashBoard = () => {
  const [isAdmin] = useAdmin()
  // const isAdmin=true;
  console.log(isAdmin);
  return (
    <div className="md:flex  my-5">
      <div className="w-64 bg-orange-500">
        <ul className="menu p-4 gap-5 ">
          {isAdmin ? (
            <>
              <li>
                <NavLink className="bg-amber-300" to="/dashBoard/adminHome">
                  <FaHouseMedical></FaHouseMedical> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink className="bg-amber-300" to="/dashBoard/allUsers">
                  <FaUsers></FaUsers> All Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="bg-amber-300"
                  to={"/dashBoard/addTest"}
                >
                  <FaAddressBook></FaAddressBook> Add A Test
                </NavLink>
              </li>
              <li>
                <NavLink className="bg-amber-300" to="/dashBoard/allTest">
                  <FaList></FaList> All Test
                </NavLink>
              </li>
              <li>
                <NavLink className="bg-amber-300" to="/dashBoard/reservation">
                  <FaCalendarDay></FaCalendarDay> ReserVation
                </NavLink>
              </li>
              <li>
                <NavLink className="bg-amber-300" to="/dashBoard/addBanner">
                <PiFlagBannerDuotone /> Add Banner
                </NavLink>
              </li>
              <li>
                <NavLink className="bg-amber-300" to="/dashBoard/allBanner">
                  <FaBookMedical></FaBookMedical> All Banner
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink className="bg-amber-300" to="/dashBoard/myHome">
                  <FaHouseMedical></FaHouseMedical> My Home
                </NavLink>
              </li>
              <li>
                <NavLink className="bg-amber-300" to="/dashBoard/myBooking">
                  <FaCalendarCheck></FaCalendarCheck> My Booking
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="bg-amber-300"
                  to={"/dashBoard/myTestResult"}
                >
                  <FaFileMedical></FaFileMedical> My Test Result
                </NavLink>
              </li>
              <li>
                <NavLink className="bg-amber-300" to="/dashBoard/cart">
                  <FaBookMedical></FaBookMedical> My Booking Test
                </NavLink>
              </li>
            </>
          )}
          {/* divider */}
          <div className="divider">OR</div>
          {/* main page */}
          <li>
            <NavLink className="bg-amber-300" to="/">
              <FaHouse></FaHouse> Home
            </NavLink>
          </li>
          <li>
            <NavLink className="bg-amber-300" to="/allTest">
              <FaNode></FaNode> All Test
            </NavLink>
          </li>
          <li>
            <NavLink className="bg-amber-300" to="/contact">
              <FaPhone></FaPhone> Contact
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1 bg-red border-2 ">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoard;
