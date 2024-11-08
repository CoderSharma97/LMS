import React from "react";
import "../payment gateway/css/style.css";
import cardImage from "../payment gateway/images/card_img.png";

const PaymentGateway = ({ checkoutHandler, setShowPayment }) => {
  // Handle click outside the modal content to close the payment modal
  const handleOutsideClick = (e) => {
    if (e.target.className === "payment-overlay") {
      setShowPayment(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await checkoutHandler();
    setShowPayment(false);
    console.log("Form submitted");
  };

  return (
    <div className="payment-overlay" onClick={handleOutsideClick}>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <h3 className="title">Billing Address</h3>

              <div className="inputBox">
                <span>Full Name :</span>
                <input type="text" placeholder="John Doe" />
              </div>
              <div className="inputBox">
                <span>Email :</span>
                <input type="email" placeholder="example@example.com" />
              </div>
              <div className="inputBox">
                <span>Address :</span>
                <input type="text" placeholder="Room - Street - Locality" />
              </div>
              <div className="inputBox">
                <span>City :</span>
                <input type="text" placeholder="Mumbai" />
              </div>

              <div className="flex">
                <div className="inputBox">
                  <span>State :</span>
                  <input type="text" placeholder="India" />
                </div>
                <div className="inputBox">
                  <span>Zip Code :</span>
                  <input type="text" placeholder="123 456" />
                </div>
              </div>
            </div>

            <div className="col">
              <h3 className="title">Payment</h3>

              <div className="inputBox">
                <span>Cards Accepted :</span>
                <img src={cardImage} alt="Accepted Cards" />
              </div>
              <div className="inputBox">
                <span>Name on Card :</span>
                <input type="text" placeholder="Mr. John Doe" />
              </div>
              <div className="inputBox">
                <span>Credit Card Number :</span>
                <input type="text" placeholder="1111-2222-3333-4444" />
              </div>
              <div className="inputBox">
                <span>Exp Month :</span>
                <input type="text" placeholder="January" />
              </div>

              <div className="flex">
                <div className="inputBox">
                  <span>Exp Year :</span>
                  <input type="number" placeholder="2022" />
                </div>
                <div className="inputBox">
                  <span>CVV :</span>
                  <input type="text" placeholder="1234" />
                </div>
              </div>
            </div>
          </div>

          <input
            type="submit"
            value="Proceed to Checkout"
            className="submit-btn"
          />
        </form>
      </div>
    </div>
  );
};

export default PaymentGateway;
