import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useTestBook from "../../Hooks/useTestBook";
import SectionTitel from "../../Shared/Serction Titel/SectionTitel";

const AllReserVation = () => {
    const axiosPublic=useAxiosPublic()
  const [testBook, , refetch] = useTestBook();
  console.log(testBook);
  const handleCancle=book=>{
   Swal.fire({
  title: "Are you sure?",
  text: "You Want to Cancle booking",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, cancle it!"
}).then((result) => {

  if (result.isConfirmed) {
    axiosPublic.delete(`/testBook/${book._id}`)
    .then(res=>{
        if(res.data.deletedCount){
            refetch()
            Swal.fire({
                title: "Deleted!",
                text:`${book.email} boook has been cancle` ,
                icon: "success"
              });
        }
    })
    
  }
});
  }
  return (
    
    <div>
      <SectionTitel Heading="ALl User ReserVation Control By admin"></SectionTitel>
      <h1 className="text-4xl font-semibold ">
        total reservation :{testBook.length}
      </h1>
      <div className="overflow-x-auto py-4">
        <table className="table">
          {/* head */}
          <thead className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <tr className="text-black">
              <th>
                Test Nmb
              </th>
              <th>Image</th>
              <th>Test Nmae</th>
              <th>Email</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
                testBook.map((book,index)=><tr key={book._id}>
                    <th>
                      {index+1}
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={book.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                    {book.testName}
                    </td>
                    <td>{book.email}</td>
                    <th>
                      <button onClick={()=>handleCancle(book)} className="btn btn-error btn-xs">cancle</button>
                    </th>
                    <th>
                      <button className="btn btn-warning btn-xs">submit the result</button>
                    </th>
                  </tr>)
            }
            
           
          
          </tbody>
         
        </table>
      </div>
    </div>
  );
};

export default AllReserVation;
