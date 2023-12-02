import { Link } from "react-router-dom";


// eslint-disable-next-line react/prop-types
const AllTestCard = ({test}) => {
    
    // eslint-disable-next-line react/prop-types
    const {image,testName,price,testDetails,_id}=test
  return (
    <div>
      <div className="card bg-base-300 shadow-xl">
        <figure>
          <img className="h-96 w-full"
            src={image}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{testName}</h2>
          <p>{testDetails}</p>
          <p className="text-xl font-bold">Price:{price}</p>
          <div className="card-actions justify-center">
           <Link to={`/details/${_id}`}> <button className="btn  btn-outline bg-slate-100  border-0 border-b-4 border-orange-600">See Details</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTestCard;
