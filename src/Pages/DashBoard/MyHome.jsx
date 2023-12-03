
import useAuth from "../../Hooks/useAuth";
import SectionTitel from "../../Shared/Serction Titel/SectionTitel";


const MyHome = () => {
   const {user}=useAuth()
   console.log(user);
   
    return (
        <div>
           <SectionTitel subHeading={'--my Home--'} Heading={'Wellcome to my home'}></SectionTitel>
          <p className="text-4xl text-orange-500 text-center font-bold">My Login Email =   {user.email}</p>
        </div>

    );
};

export default MyHome;