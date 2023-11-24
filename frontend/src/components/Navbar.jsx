import { Link } from "react-router-dom"
import "../assets/css/Navbar.css"
function Navbar() {
  return (
    <>
      <div className="navbar">
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/cart">cart</Link>
            </li>
            <li>
                <Link to="/orders"></Link>
            </li>
            <li>
                <Link to="/profile">profile</Link>
            </li>
        </ul>
      </div>
    </>
  )
}

export default Navbar
