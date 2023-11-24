import { Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css"
import Carts from "./pages/Carts";
function App() {


  return (
    <>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Carts />} />
      {/* <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} /> */}
     </Routes>
    </>
  )
}

export default App
