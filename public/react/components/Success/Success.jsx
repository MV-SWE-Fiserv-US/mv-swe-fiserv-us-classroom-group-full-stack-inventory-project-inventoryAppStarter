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
    <>
      <section className="max-w-6xl h-full mx-auto bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-200 flex mt-4">
        <div className="p-4 flex flex-col justify-around flex-wrap ">
          <div className="grid grid-cols-2">
            <h2 className="text-xl font-semibold text-gray-800">
              Your order has been placed!
            </h2>

            <p>Your order number is: {order && order.id}</p>
            <p>Thank you for your purchase!</p>
          </div>
          <p className="text-gray-600 mt-2"></p>
          <div className="mt-4 flex flex-col justify-between items-center">
            {order &&
              order.items.map((item) => (
                <div key={item.id} className="flex outline w-full">
                  <img src={item.image} alt="" width={200} height={200} />
                  <div>
                    <p>{item.name}</p>
                    <p>${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            <div className="grid w-full">
              <p>
                Your order status is:
                <span className="float-right">{order && order.status}</span>
              </p>
              <p>
                Your subtotal is:{" "}
                <span className="float-right">
                  ${order && (order.total * 0.93).toFixed(2)}
                </span>
              </p>
              <p>
                Your tax total is:
                <span className="float-right">
                  ${order && (order.total * 0.07).toFixed(2)}
                </span>
              </p>
              <p>
                Your order total is:
                <span className="float-right">
                  ${order && order.total.toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <button type="button">Back to Home</button>
    </>
  );
};

export default Success;
