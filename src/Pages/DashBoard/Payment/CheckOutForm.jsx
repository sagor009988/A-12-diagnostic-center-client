import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useUserTest from "../../../Hooks/useUserTest";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const CheckOutForm = () => {
  const [transactionId,setTransactionId]=useState('')
  const [clientsecret,setClientSecret]=useState();
  const [error,setError]=useState('');
    const stripe=useStripe();
    const {user}=useAuth()
    const elements=useElements()
    const axiosSecure=useAxiosSecure()
    const [test,refetch] = useUserTest();
    const navigate=useNavigate()
  console.log(test);
  const totalPrice = test.reduce((item, test) => item + test.price, 0);

    useEffect(()=>{
       if(totalPrice>0){
         axiosSecure.post("/create-payment-intent",{price:totalPrice})

        .then(res=>{
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret)
        })
       }

    },[axiosSecure,totalPrice])

const handleSubmit=async(event)=>{
    event.preventDefault()
    if(!stripe || !elements){
        return
    }
    const card=elements.getElement(CardElement)
    if (card == null) {
        return;
      }
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });
      if (error) {
        console.log('[error]', error);
        setError(error.message)
      } else {
        console.log('[PaymentMethod]', paymentMethod);
        setError('')
      }

      // confirm Payment
      const {paymentIntent,error :confirmError}=await stripe.confirmCardPayment(clientsecret,{
        payment_method:{
          card:card,
          billing_details:{
            email:user?.email || 'anonymous',
            name:user?.displayName || 'anonymous'
          }
        }
      })
      if(confirmError){
        console.log(confirmError,'error');
      }
      else{
       
        if(paymentIntent.status == 'succeeded'){
          console.log('tranjaction',paymentIntent.id);
          setTransactionId(paymentIntent.id)
 
          // now save to the paymnt into the database
          const payment={
            email:user?.email,
            transactionId:paymentIntent.id,
            price:totalPrice,
            date:new Date(), 
            testIds:test?.map(testId=>testId._id),
            testItemIds:test?.map(item=>item.testId),
            status :'pending'
          }
          const res=await axiosSecure.post('/payments',payment)
          console.log('payment save',res.data);
          refetch()
          if(res.data.paymentResult.insertedId){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Thank You for your Payment",
              showConfirmButton: false,
              timer: 1500
            })
            navigate('/dashBoard/paymentHistory')
          }

        }
      }
      
}

    return (
         <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button className="btn btn-secondary mt-5" type="submit" disabled={!stripe || !clientsecret}>
          Pay
        </button>
        <p className="text-2xl text-red-600">{error}</p>
        {transactionId && <p className="text-2xl text-blue-600">your Transaction Id : <span className="text-orange-500">{transactionId}</span></p>}
      </form>
    );
};

export default CheckOutForm;