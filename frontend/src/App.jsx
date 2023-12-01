import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Carts from "./pages/Carts";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SingleProduct from "./pages/SingleProduct";
import ShippingAddress from "./pages/ShippingAddress";
import Payment from "./pages/Payment";
import EditPassword from "./pages/EditPassword";
import Otp from "./pages/Otp";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Carts />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/product/:id" element={<SingleProduct/>} />
        <Route path="/shipping-address" element={<ShippingAddress/>} />
        <Route path="/payment" element={<Payment/>} />
        <Route path="/edit-password" element={<EditPassword/>} />
        <Route path="/otp" element={<Otp/>} />
        <Route path="*" element={<Home />} />

      </Routes>
    </>
  );
}

export default App;
