import React from "react";
import Info from "../components/Info";
import axios from "axios";
import { useCart } from "../hooks/useCart";
import styles from './Drawer.module.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, items = [], onRemove, opened }) {
    const { cartItem, setCartItem, totalPrice } = useCart();
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);


    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post('https://63efce834d5eb64db0d16ba0.mockapi.io/order', {
                items: cartItem,
            });
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItem([]);

            for (let i = 0; i < cartItem.length; i++) {
                const item = cartItem[i];
                await axios.put('https://63d96abc5a330a6ae17b6eee.mockapi.io/card' + item.id);
                await delay(1000);
            }

        } catch (error) {

        }
        setIsLoading(false)
    }

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>
                <h2 className="mb-30 d-flex justify-between align-center">Корзина <img onClick={onClose} className={styles.close} width={17} height={17} src="/img/remove.png" alt="" /> </h2>

                {items.length > 0 ? (
                    <>
                        <div className={styles.items} >
                            {items.map((obj) => (
                                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                    <img className="mr-20" width={70} height={70} src={obj.imageUrl} alt="" />
                                    <div className="mr-20">
                                        <p className="mb-5">{obj.name}</p>
                                        <b>{obj.price} грн</b>
                                    </div>
                                    <button onClick={() => onRemove(obj.id)} className="button removeBtn">
                                        <img width={11} height={11} src="/img/remove.png" alt="" />
                                    </button>
                                </div>
                            ))}


                        </div>



                        <div className={styles.price}>
                            <ul className={styles.cartTotalBlock}>
                                <li className="d-flex">
                                    <span>Итого: </span>
                                    <div></div>
                                    <b>{totalPrice} грн</b>
                                </li>
                                <li className="d-flex">
                                    <span>Налог 5%: </span>
                                    <div></div>
                                    <b>{totalPrice / 100 * 5} грн</b>
                                </li>
                            </ul>
                            <div className={styles.divOrderButton}>
                                <button disabled={isLoading} onClick={onClickOrder} className={styles.orderButton}>Оформить заказ</button>
                            </div>
                        </div> </>) : (<Info title={isOrderComplete ? "Заказ оформлен" : "Корзина пустая"}
                            description={isOrderComplete ? `Ваш заказ №${orderId} скоро будет доставлен курьером` : "Добавьте хотя бы одину пару кроссовок что бы сделать заказ"}
                            image={isOrderComplete ? "/img/order-complete.png" : "/img/drawernothing.png"}
                        />)}


            </div>
        </div>
    );
}

export default Drawer;