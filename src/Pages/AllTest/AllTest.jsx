import Cover from "../../Components/Cover";
import useTest from "../../Hooks/useTest";
import AllTestCard from "./AllTestCard";




const AllTest = () => {
    
    const [tests]=useTest()
    return (
        <div className="">
            <Cover></Cover>
            <div className="grid drid-cols-1 md:grid-cols-3 gap-8 my-8">
            {
                tests?.map(test=><AllTestCard key={test._id} test={test}></AllTestCard>)
            }
            </div>
        </div>
    );
};

export default AllTest;