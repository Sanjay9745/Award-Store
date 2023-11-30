
import Navbar from './../components/Navbar';
import '../assets/css/Profile.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import SERVER_URL from '../config/SERVER_URL';
import { useNavigate } from 'react-router-dom';
function Profile() {
  const [profile, setProfile] = useState({});
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

  useEffect(()=>{
    axios.get(SERVER_URL + "/user/details", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
    .then((res) => {
      if (res.status === 200) {
      setProfile(res.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  })
  return (
    <>
  <div className="container">
    <Navbar/>
    <div className="profile-container">
      <div className="profile-card">
      
        <div className="profile-details">
          <p>Hello {profile.username}</p>
          <p>{profile.email}</p>
        </div>

      </div>
      <div className="profile-settings">
        <h2 onClick={()=>navigate("/shipping-address")}>Edit Shipping</h2>
      </div>
      <div className="profile-settings">
        <h2>Reset Password</h2>
      </div>
      <div className="profile-settings">
        <h2 onClick={()=>(
          localStorage.removeItem("token"),
          navigate("/login")
        )}
        >SignOut</h2>
      </div>
    </div>
  </div>
    </>
  )
}

export default Profile
