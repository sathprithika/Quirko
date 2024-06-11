import React, { useEffect, useState } from 'react';

import {
    PaymentElement,
    useElements,
    useStripe,
    LinkAuthenticationElement
} from "@stripe/react-stripe-js";


export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);
    const [isloading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe){
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret){
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payemnt success!");
                    break;
                case "processing":
                    setMessage("Payment processing...");
                    break;
                case "requires_payment_method":
                    setMessage("Payment method was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong");
                    break;

            }
    });




    },[stripe]);

    const handleSubmit = async e => {
        e.preventDefault();

        if (!stripe || !elements){
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:5173/paymentsuccess"
            }

        });

        if (error.type === "card_error" || error.type === "validation_error"){
            setMessage(error.message);
        }else{
            setMessage("An error occurred. Please try again");
        }

        setIsLoading(false);




    };

    const handleEmailChange = event => {
        console.log(event);
    };

    const paymentElementOptions =  {
        layout: "tabs"
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <LinkAuthenticationElement
            id="link-authentication-elelmnt"
            onChange={handleEmailChange}
            />

            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <button id="submit" disabled={isloading || !stripe || !elements}>
                <span id="button-text">
                    {isloading? <div className="spinner" id ="spinner"></div> : "Pay Now"}
                </span>
                
            </button>

            {message && <div id ="payment-message">{message}</div>}

        </form>

    );
}
