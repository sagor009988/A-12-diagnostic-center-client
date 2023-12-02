import { useEffect, useState } from "react";
import reg from "../../assets/reg.png";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Register = () => {
  const axiosPublic=useAxiosPublic()
  const navigate=useNavigate()
const {createUser,updateUserProfile}=useAuth()
  const {register,handleSubmit,reset, formState: { errors },setValue} = useForm({
    defaultValues: {
      district: "", 
      upazila: "", 
      bloodGroup:"",
    },
  });
  const onSubmit = (data) => {
    if (data.district == "" || data.upazila == "" || data.bloodGroup =="") {
      // Display an alert or handle the error in your preferred way
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select a district and upazila.",
      });
      return;
    }
    // create user
    createUser(data.email,data.password)
    .then(result=>{
      console.log(result.user);
      // update user Profile
      updateUserProfile(data.name,data.photoURL)
      .then(()=>{
        
          // user informate post to mongodb
        const userInfo={
          name:data.name,
          image:data.photoURL,
          email:data.email,
          district:data.district,
          upazila:data.upazila,
          bloodGroup:data.bloodGroup
        }
        
          axiosPublic.post('/users',userInfo)
          .then(res=>{
            if(res.data.insertedId){
              reset()
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "User create successfully",
              showConfirmButton: false,
              timer: 1500
            });
            navigate('/')
            }
          })
          
      })
      .catch(error=>console.log(error.message))
    })
  };
 
 

  // district
  const [districts, setDestricts] = useState([]);
  useEffect(() => {
    fetch("district.json")
      .then((res) => res.json())
      .then((data) => setDestricts(data));
  }, []);
  // upazilas
  const [upazilas, setUpazilas] = useState([]);
  useEffect(() => {
    fetch("upazilas.json")
      .then((res) => res.json())
      .then((data) => setUpazilas(data));
  }, []);
  return (
    <div className="hero min-h-screen bg-lime-400">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign in</h1>
          <p className="py-6">
            <img src={reg} alt="" />
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-amber-200">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            {/* name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                {...register("name", { required: true })}
                placeholder="Name"
                className="input input-bordered"
              />
              {errors.name && <p className="text-red-600">Name is required.</p>}
            </div>
            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                {...register("email", { required: true })}
                placeholder="email"
                className="input input-bordered"
              />
              {errors.email && (
                <p className="text-red-600">email is required.</p>
              )}
            </div>
            {/* file */}
            <div>
              <label className="label">
                <span className="label-text">Image Url</span>
              </label>
              <input
                type="url"
                placeholder="Image URL"
                name="photoURL"
                {...register("photoURL", { required: true })}
                className="input input-bordered"
              />
              {errors.photoURL && <p className="text-red-600">file is required.</p>}
            </div>
                {/* district */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-semibold">Your District</span>
              </label>
              <select
              
                className="select select-bordered "
                name="district"
                {...register("district", { required: true })}
              >
                <option  selected>
                  Select Here
                </option>
                {districts?.map((district) => (
                  <option key={district.id}>{district.name}</option>
                ))}
              </select>

              {errors.district && (
                <p className="text-red-600">district is required.</p>
              )}
            </div>
            {/* upazila */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-semibold">Your upazila</span>
              </label>
              <select
              
                className="select select-bordered "
                name="upazila"
                {...register("upazila", { required: true })}
              >
                <option  selected>
                  Select Here
                </option>
                {upazilas?.map((upazila) => (
                  <option key={upazila.id}>{upazila.name}</option>
                ))}
              </select>

              {errors.upazila && (
                <p className="text-red-600">district is required.</p>
              )}
            </div>
            {/* bloodGroup */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Blood Group</span>
              </label>
              <select
                className="select select-bordered "
                name="bloodGroup"
                {...register("bloodGroup", { required: true })}
              >
                <option  selected>
                  Select A blOOd group
                </option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
              {errors.bloodGroup && (
                <p className="text-red-600">Name is required.</p>
              )}
            </div>
            {/* password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                name="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                })}
              />
              {errors.password?.type === "required" && (
                <p className="text-red-600">password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">imput  6 or more 6 character required</p>
              )}
            </div>
            {/* confirm password TODO */}
            {/* <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                className="input input-bordered"
                name="confirmPassword"
                {...register("confirmPassword", { required: true })}
              />
              {errors.confirmPassword && <p className="text-red-600">Name is required.</p>}
            </div> */}
            <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit" value="Register now" />
              
            </div>
          </form>
          <p className='text-center mb-6'>Have an Account? please <Link to='/login' className='text-3xl font-semibold text-blue-700'>Login Here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
