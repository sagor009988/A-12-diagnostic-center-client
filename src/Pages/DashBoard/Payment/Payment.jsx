import { loadStripe } from "@stripe/stripe-js";
import SectionTitel from "../../../Shared/Serction Titel/SectionTitel";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";


// add publishable Key
const stripePromise=loadStripe(import.meta.env.VITE_PAYMENT_PK)
const Payment = () => {
    return (
        <div>
            <SectionTitel subHeading='--please playmet to test' Heading={'WellCome to Payment Section'}></SectionTitel>
            <div>
                <Elements stripe={stripePromise}>
                        <CheckOutForm></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;