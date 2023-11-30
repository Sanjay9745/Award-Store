import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SERVER_URL from "../config/SERVER_URL";
import "../assets/css/Payment.css";
import Navbar from "../components/Navbar";
function Payment() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .get(SERVER_URL + "/user/protected", {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.status !== 200) {
            navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("token");
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);
  const handleSubmit = () => {
    axios.post(SERVER_URL + "/create-checkout-session");
  };
  return (
    <>
    <div className="container">
        <Navbar/>
      <div className="payment-container">
        <div className="order-details">
          <div className="order-head">
            <h3>Order Details</h3>
            <h4>Order ID: 123456</h4>
          </div>
          <div className="order-body">
            <div className="order-body-top">
              <div className="order-body-top-img">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="img"
                />
              </div>
              <div className="order-body-top-content">
                <p>Product Name</p>
                <p>Price</p>
                <p>Quantity</p>
              </div>
              <div className="order-body-top-price">
                <p>$599</p>
              </div>
            </div>
            <div className="order-body-bottom">
              <div className="order-body-bottom-img">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="img"
                />
              </div>
              <div className="order-body-bottom-content">
                <p>Product Name</p>
                <p>Price</p>
                <p>Quantity</p>
              </div>
              <div className="order-body-bottom-price">
                <p>$599</p>
              </div>
            </div>
            <div className="order-body-top">
              <div className="order-body-top-img">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="img"
                />
              </div>
              <div className="order-body-top-content">
                <p>Product Name</p>
                <p>Price</p>
                <p>Quantity</p>
              </div>
              <div className="order-body-top-price">
                <p>$599</p>
              </div>
            </div>
          </div>
          <div className="order-footer">
            <div className="order-footer-left">
              <p>Subtotal</p>
              <p>Tax</p>
              <p>Total</p>
            </div>
            <div className="order-footer-right">
              <p>$599</p>
              <p>$599</p>
              <p>$599</p>
            </div>
          </div>
          <div className="order-button">
            <button className="button-27" role="button" onClick={handleSubmit}>
              Pay Now
            </button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default Payment;
