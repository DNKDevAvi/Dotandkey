import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../store/cartSlice";
import "./cart.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faIndianRupee,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  closeCartDrawer,
  openCartDrawer,
  removeItem,
} from "../store/cartSlice";
import CartImg from "../images/bag.png";

const Cart = ({ item }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  let cartCount = useSelector((state) => state.cart.count);
  
  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };
  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };
  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };
  const isOpen = useSelector((state) => state.cart.isOpen);
  const handleCloseCart = () => {
    dispatch(closeCartDrawer());
  };
  const handleOpenCart = () => {
    dispatch(openCartDrawer());
  };
  const handleRemoveItem = (item) => {
    if (item && item.quantity) {
      dispatch(removeItem({ quantity: item.quantity }));
    } else {
      console.error("Item quantity is missing or undefined.");
    }
  };

  // Function to calculate total MRP
  const calculateTotalMRP = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const totalMRP = calculateTotalMRP();

  return (
    <>
      <div className="cart-drawer">
        <div className="counter-head">
          <FontAwesomeIcon icon={faBagShopping} onClick={handleOpenCart} />
          <span className="count">{cartCount}</span>
        </div>
        <div className={isOpen ? "cart slide" : "cart"}>
          <ul className="item-list">
            <div className="cart-head d-flex justify-content-between p-2">
              <div className="cart-counter">
                Your Bag:<span>{cartCount}</span>
              </div>
              <div className="cart-message"></div>
              <FontAwesomeIcon icon={faTimes} onClick={handleCloseCart} />
            </div>
            {cartCount !== 0 ? (
              <>
                {cart.map((item) => (
                  <li key={item.id}>
                    <div className="cart-img-wrap">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-dtls">
                      <h3>{item.name}</h3>
                      <div className="dtl-wrap">
                        <div className="counter">
                          <button onClick={() => handleDecreaseQuantity(item.id)}>
                            -
                          </button>
                          <span>{item.quantity}</span>
                          {item.quantity !== 10 ? (
                            <button onClick={() => handleIncreaseQuantity(item.id)}>
                              +
                            </button>
                          ) : (
                            <button
                              onClick={() => handleIncreaseQuantity(item.id)}
                              disabled
                            >
                              +
                            </button>
                          )}
                        </div>
                        <span><FontAwesomeIcon icon={faIndianRupee} />{item.quantity * item.price}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        handleRemoveFromCart(item.id);
                        handleRemoveItem(item);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </li>
                ))}
                <div className="summery">
                  <h5>Order summary</h5>
                  <ul>
                    <li>
                      <div className="each-sum">
                        Total MRP: <span className="sum-dtls"><FontAwesomeIcon icon={faIndianRupee} />{totalMRP}</span>
                      </div>
                    </li>
                    <li>
                      <div className="each-sum">
                        Discount:<span className="sum-dtls"></span>
                      </div>
                    </li>
                    <li>
                      <div className="each-sum">
                        Shipping Fee:<span className="sum-dtls"></span>
                      </div>
                    </li>
                  </ul>
                  <button className="checkout">Checkout</button>
                </div>
              </>
            ) : (
              <div className="empty-cart">
                <img src={CartImg} alt="empty-cart" />
                <p>Your cart is empty!</p>
                <button>Shop Now</button>
              </div>
            )}
          </ul>
        </div>
      </div>
      <div
        className={isOpen ? "backdrop active" : "backdrop"}
        onClick={handleCloseCart}
      ></div>
    </>
  );
};

export default Cart;