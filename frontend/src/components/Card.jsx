/* eslint-disable react/prop-types */
import "../assets/css/Home.css"
import { useNavigate } from 'react-router-dom';
function Card({product,handleAddCart}) {
    const navigate = useNavigate()
  return (
    <>
     <div className="card-container">
        <div className="card-image">
            <img src={product?.image} alt="" />
        </div>
        <div className="card-content">
            <h1>{product?.name}</h1>
            <p>{product?.description}</p>
        </div>
            <div className="card-buttons">
                <button className="add-to-cart" onClick={()=>handleAddCart(product._id)}>Add to cart</button>
                <button className="buy-now" onClick={()=>navigate("/product/"+product._id)}>Buy Now</button>
            </div>
        </div> 
    </>
  )
}

export default Card
