import cover from '../assets/slider2.jpg'
const Cover = () => {
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            `url('${cover}')`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">All Our Tests</h1>
            <p className="mb-5">
             we are providing the most important tests there .we are providing best test service in cheap rate.
             please see the details and book for ur needed tests here.
            </p>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cover;
