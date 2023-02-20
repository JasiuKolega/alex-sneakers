import React from "react";
import Card from "../components/Card";
import axios from "axios";
import AppContext from "../Context";

function Orders() {
  const { onAddToCart, onAddToFavorite } = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://63efce834d5eb64db0d16ba0.mockapi.io/order');
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert('Не удалось загрузить заказы')
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>


      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(2)] : orders).map((item, index) => (
          <Card key={index}
            loading={isLoading}
            {...item}
          />
        ))}
      </div>


    </div>
  );
}

export default Orders;