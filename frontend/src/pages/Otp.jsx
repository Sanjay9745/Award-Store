import React from 'react'
import Navbar from '../components/Navbar'
import "../assets/css/Otp.css"
function Otp() {
  return (
    <>
        <div className="container">
        <Navbar active=""/>
            <div className="otp-container">
                <header>
                    <img src="https://cdn-icons-png.flaticon.com/128/95/95454.png" alt="" />
                </header>
                <h4>Enter OTP Code</h4>
                <form action="#">
                    <div className="input-field">
                        <input type="number" />
                    </div>
                    <button>Verify OTP</button>
                </form>
            </div>

        </div>
    </>
  )
}

export default Otp