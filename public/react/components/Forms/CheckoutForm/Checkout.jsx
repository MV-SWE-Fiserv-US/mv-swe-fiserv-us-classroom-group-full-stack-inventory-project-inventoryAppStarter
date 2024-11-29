import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PnpHMHhakPdLWpHhaLoKXWPfVJ68G8zL6NppfEAOTwKhLCX5bouScnBrQTmblP59Zmp1Z5qm0p43DAxWO7cqX7n00RgS3nVBc"
);

const Checkout = () => {
  const { clientSecret } = useContext(AuthContext);

  if (!clientSecret) return null;

  const options = {
    clientSecret: clientSecret,
  };

  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </>
  );
};

export default Checkout;
