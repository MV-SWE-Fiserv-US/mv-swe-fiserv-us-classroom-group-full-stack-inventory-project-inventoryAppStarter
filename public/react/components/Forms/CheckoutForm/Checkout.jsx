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
  console.log(clientSecret);
  

  if (!clientSecret) return null;

  const appearance = {
    theme: "night",
    variables: {
      fontFamily: "Sohne, system-ui, sans-serif",
      fontWeightNormal: "500",
      borderRadius: "8px",
      colorBackground: "#0A2540",
      colorPrimary: "#EFC078",
      accessibleColorOnColorPrimary: "#1A1B25",
      colorText: "white",
      colorTextSecondary: "white",
      colorTextPlaceholder: "#ABB2BF",
      tabIconColor: "white",
      logoColor: "dark",
    },
    rules: {
      ".Input": {
        backgroundColor: "#212D63",
        border: "1px solid var(--colorPrimary)",
      },
    },
  };
  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </>
  );
};

export default Checkout;
