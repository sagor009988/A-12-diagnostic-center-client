import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckOutForm = () => {
    const stripe=useStripe();
    const elements=useElements()
    const [wrong,setWrong]=useState('')

    const handleSubmit=async(event)=>{
        event.preventDefault()
        if(!stripe || ! elements){
            return
        }
        const card=elements.getElement(CardElement)
        if(card == null){
            return
        }
        const {error,paymentMethod}=await stripe.createPaymentMethod({
            type:'card',
            card
        })
        if(error){
            console.log('error for payment',error);
            setWrong(error.message)
        }
        else{
            console.log('payment method',paymentMethod);
           setWrong('')
        }
    }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      ></CardElement>
     
      <button className="btn btn-error my-5" type="submit" disabled={!stripe}>Pay</button>
      <p className="text-2xl text-red-600">{wrong}</p>
    </form>
  );
};

export default CheckOutForm;
