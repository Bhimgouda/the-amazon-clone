import {Routes, Route, useNavigate} from "react-router-dom"
import Home from "./pages/Home";
import WithoutNav from "./components/WithoutNav";
import WithNav from "./components/WithNav";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import jwt from 'jsonwebtoken'
import Checkout from "./pages/Checkout";
import { useDispatch } from "react-redux";
import Success from "./pages/Success";
import Orders from "./pages/Orders";
import axios from "axios";
import { setUser } from "./slices/userSlice";

function App() {
  const dispatch = useDispatch()
  const [products,setProducts] = useState([])

  useEffect(()=>{
      const getPorducts = async()=>{
          const {data} = await axios.get("/api/products");
          setProducts(data)
      }
      getPorducts()
  },[]);

  
  // isLoggedIn Check at client side with JWT token
  useEffect(()=>{
    async function requestUser(){
      const token = localStorage.getItem("token");
      if(token){
        const userData = jwt.decode(token);
        const {data:user} = await axios.get(`/api/user/${userData.user_id}`)
        dispatch(setUser(user))
      }
    }
    requestUser()
  },[])

  


return (
 
    <Routes>
      <Route element={<WithoutNav />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<WithNav />}>
        <Route path="/success" element={<Success />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/" element={<Home products={products} />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>
    </Routes>

)

}

export default App;
