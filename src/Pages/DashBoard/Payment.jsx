import SectionTitel from "../../Shared/Serction Titel/SectionTitel";
import { Elements } from "@stripe/react-stripe-js";

import {loadStripe} from '@stripe/stripe-js';
import CheckOutForm from "./CheckOutForm";

const stripePromise=loadStripe(import.meta.env.VITE_PAYMENT_PK)
const Payment = () => {
    return (
        <div>
            <SectionTitel subHeading='--pay to test--'Heading='Wellcome to payment side'></SectionTitel>
           
            <Elements stripe={stripePromise}>
               <CheckOutForm></CheckOutForm>
            </Elements>
        </div>
    );
};

export default Payment;