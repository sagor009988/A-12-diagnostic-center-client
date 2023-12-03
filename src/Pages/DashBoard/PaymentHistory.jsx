import usePaymentHistory from "../../Hooks/usePaymentHistory";
import SectionTitel from "../../Shared/Serction Titel/SectionTitel";


const PaymentHistory = () => {
    const [payments,]=usePaymentHistory()
    console.log(payments);
    return (
        <div>
            <SectionTitel subHeading={'--history--'} Heading={'wellcome to your payment history'}></SectionTitel>
           <div>
           <h1 className="text-3xl font-semibold text-orange-400">your total Payment number : {payments.length}</h1>
           
           </div>
           
           <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Email</th>
        <th>price</th>
        <th>Transaction Id</th>
        <th>status</th>
      </tr>
    </thead>
    <tbody>
    {
            payments?.map((pay,index)=><tr key={pay._id} className="bg-base-200">
            <th>{index+1}</th>
            <th>{pay.email}</th>
            <td>{pay.price}.00 tk</td>
            <td>{pay.transactionId}</td>
            <td className="text-blue-600">{pay.status}</td>
          </tr>)
           }
      
      
     
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default PaymentHistory;