import "../assets/css/Orders.css";
function OrderItem() {
  return (
    <>
      <div className="order-card">
        <div className="order-card-left">
            <div className="order-card-img">

            <img src="https://m.media-amazon.com/images/I/71FuTI7ggAL._AC_AA180_.jpg" alt="" />
            </div>
            <div className="order-item-details">
                <h3>Apple iPhone 11 (64GB) - Black</h3>
                <p>₹ 49,999.00</p>
                <p>Qty: 1</p>
            </div>
        </div>
        <div className="order-card-right">
            <div className="order-card-shipping">
                <h3>Shipping Address</h3>
                <p>John Doe</p>
                <p>123, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, dolorum.</p>
                <p>City, State, 12345</p>
            </div>
            <div className="order-card-button">
                <button>Cancel</button>
            </div>
        </div>
      </div>
    </>
  )
}

export default OrderItem
