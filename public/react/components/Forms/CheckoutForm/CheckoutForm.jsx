import {
  CardElement,
  useStripe,
  useElements,
  PaymentElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router";

const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    // const { error, paymentIntent } = await stripe.confirmCardPayment(
    //   clientSecret,
    //   {
    //     payment_method: { card: elements.getElement(CardElement) },
    //   }
    // );

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setError(error.message);
    } else {
      setError("An unexpected error occurred.");
    }

    navigate("/success");
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={loading || !stripe || !elements} id="submit">
        <span id="button-text">
          {loading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {error && <div id="payment-error">{error}</div>}
    </form>
  );
};

export default CheckoutForm;
