const RecoCard = ({ rec }) => {
  const { dr_Name, health_recommendation, img } = rec;
  return (
    <div className="my-5">
      <div className="relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full  flex-row">
        <div className="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
          <img
            src={img}
            alt="card-image"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-6">
          <h6 className="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
            {dr_Name}
          </h6>
          
          <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
         Health Tips {health_recommendation}
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default RecoCard;
