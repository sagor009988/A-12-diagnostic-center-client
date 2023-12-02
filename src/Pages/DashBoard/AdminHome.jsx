import SectionTitel from "../../Shared/Serction Titel/SectionTitel";

const AdminHome = () => {
  return (
    <div>
      <SectionTitel Heading="wellcome To Admin Home"></SectionTitel>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://i.ibb.co/ZfPgdxT/download.png)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello Admin? Have a Good Day</h1>
            <p className="mb-5">
            Welcome to the Team, Admin Extraordinaire!
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
