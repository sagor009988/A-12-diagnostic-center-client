import SectionTitel from "../../Shared/Serction Titel/SectionTitel";

const Advertise = () => {
  return (
    <div>
        <SectionTitel subHeading="--Our service--" Heading='Visit Ousr clinic'></SectionTitel>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/74DWwSxsVSs?si=OY_RQwJVmky2jplM"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div>
            <h1 className="text-5xl font-bold"> Our Service</h1>
            <p className="py-6">
              provide a good and beautyful behaviour Service.all material is
              update to test
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advertise;
