import { useEffect, useState } from "react";
import apiURL from "../../api";
import { useParams } from "react-router";

const Success = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const getOrder = async () => {
    const response = await fetch(`${apiURL}/orders/${id}`);
    const order = await response.json();
    setOrder(order);
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase!</p>
      <p>Your order number is: {order && order.id}</p>
      <p>Your order total is: ${order && order.total.toFixed(2)}</p>
      <p>Your order status is: {order && order.status}</p>
      {order &&
        order.items.map((item) => (
          <div key={item.id}>
            <p>
              {item.name} - ${item.price.toFixed(2)}
            </p>
          </div>
        ))}
    </div>
  );
};

export default Success;
