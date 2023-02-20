import { Link } from "react-router-dom";
import React from 'react';
import { useCart } from "../hooks/useCart";

function Header(props) {
    const { totalPrice } = useCart();

    return (
        <header className="d-flex justify-between align-center p-40">
            <div className="d-flex align-center">
                <Link to="/">
                    <img src="/img/logo.png" className="logoImg" alt="" />
                </Link>
                <div>
                    <h3 className="text-uppercase">Alex Sneakers</h3>
                    <p className="opacity-5">Магазин лучших кроссовок</p>
                </div>
            </div>

            <ul className="d-flex">
                <li onClick={props.onClickCart} className="mr-30 cu-p">
                    <img width={18} height={18} src="/img/cart.png" alt="" />
                    <span>{totalPrice} грн.</span>
                </li>
                <li>
                    <Link to="/orders">
                        <img width={18} height={18} src="/img/user.png" alt="" />
                    </Link>
                </li>
            </ul>
        </header>
    );
}

export default Header;