import "../assets/css/Card.css"
function Card() {
  return (
    <>
     <div className="card-container">
        <div className="card-image">
            <img src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg" alt="" />
        </div>
        <div className="card-content">
            <h1>hi</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam, aliquid!</p>
        </div>
            <div className="card-buttons">
                <button className="add-to-cart">Add to cart</button>
                <button className="buy-now">Buy Now</button>
            </div>
        </div> 
    </>
  )
}

export default Card
