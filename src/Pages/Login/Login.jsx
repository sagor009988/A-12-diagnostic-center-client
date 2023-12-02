
import login1 from '../../assets/login.jpg'

import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const Login = () => {
  const navigate=useNavigate();
  const location=useLocation()
  const {login}=useAuth()
  const from = location.state?.from?.pathname || "/";
    const handleLogin=(e)=>{
      
        e.preventDefault()
        const form=e.target;
        const email=form.email.value;
        const password=form.password.value;
        console.log(email,password);
        login(email,password)
        .then(result=>{
          console.log(result.user);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "user Login successfull",
            showConfirmButton: false,
            timer: 1500
          });
          navigate(from,{replace:true})
        })
        .catch(error=>{
          console.log(error.message);
          Swal.fire("Please input valid email and password");
        })
    }
   
   
  return (
    <div className="hero min-h-screen bg-lime-400">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
           <img src={login1} alt="" />
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name='email'
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name='password'
                placeholder="password"
                className="input input-bordered"
                required
              />
              
            </div>
            
            <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit" value="Login" />
            </div>
          </form>
          <p className='text-center mb-6'>New Here? please <Link to='/register' className='text-3xl font-semibold text-blue-700'>Register Now</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
