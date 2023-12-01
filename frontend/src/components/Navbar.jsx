import { Link } from "react-router-dom"
import "../assets/css/Navbar.css"
function Navbar({active}) {
  return (
    <>
      <div className="navbar">
        <ul>
            <li>
                <Link to="/" className={active === "home" ? "active": "" } ><i className="fa-solid fa-house" ></i>
                <p>Home</p>
                </Link>
            </li>
            <li>
                <Link to="/cart" className={active === "cart" ? "active": "" }>
                <i className="fa-solid fa-shopping-cart"></i>
                <p>Cart</p>
                </Link>
            </li>
            <li>
                <Link to="/orders" className={active === "orders" ? "active": "" }><i className="fa-solid fa-truck-fast"></i>
                <p>Orders</p>
                </Link>
            </li>
            <li className="profile-nav-list">
                <Link to="/profile" className={active === "profile" ? "active": "" }>
                <i className="fa-solid fa-user"></i>
                <p>Profile</p>
                </Link>
            </li>
        </ul>
      </div>
    </>
  )
}

export default Navbar
