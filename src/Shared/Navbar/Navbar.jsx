import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo (2).png";
import useAuth from "../../Hooks/useAuth";
import { FaUserDoctor } from "react-icons/fa6";
import useUserTest from "../../Hooks/useUserTest";
import useAdmin from "../../Hooks/useAdmin";


const Navbar = () => {
  const [test]=useUserTest()
  const { user, logout } = useAuth();
  const [isadmin]=useAdmin()
  
  const handleLogOut = () => {
    logout()
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const Navlinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allTest">All Test</NavLink>
      </li>
      {
        user && isadmin &&  <li> <NavLink to="/dashBoard/admin">
        <button className="flex gap-2">
        <FaUserDoctor className="text-xl"/>
          <div className="badge badge-secondary">+{test.length}</div>
        </button>
      </NavLink></li>
      }
      
      {
        user && !isadmin && <li> <NavLink to="/dashBoard/cart">
        <button className="flex gap-2">
        <FaUserDoctor className="text-xl"/>
          <div className="badge badge-secondary">+{test.length}</div>
        </button>
      </NavLink></li>
      }

      {user ? (
        <>
          <li>
            <button onClick={handleLogOut}>Logout</button>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="navbar fixed z-20 bg-slate-600 opacity-80 text-white max-w-7xl mx-auto rounded-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {Navlinks}
          </ul>
        </div>
        <Link className=" normal-case text-xl">
          <img className=" h-14 lg:w-32" src={logo} alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{Navlinks}</ul>
      </div>
      <div className="navbar-end mr-4">{user ? <>
      <p className="mr-4 text-green-500">{user.email}</p>
      
      <img className="w-12 h-12 rounded-full " src={user.photoURL} alt="" />
      </> : <>No user</>}</div>
    </div>
  );
};

export default Navbar;
