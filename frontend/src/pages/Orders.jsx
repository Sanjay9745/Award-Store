import Navbar from "../components/Navbar"
import "../assets/css/Orders.css"
import OrderItem from "../components/OrderItem"
function Orders() {
  return (
    <>
      <div className="container">
        <Navbar/>
        <div className="order-container">
            <div className="order-cards-container">
                <OrderItem/>
                <OrderItem/>
                <OrderItem/>
                <OrderItem/>
                <OrderItem/>
            </div>
        </div>
      </div>
    </>
  )
}

export default Orders
