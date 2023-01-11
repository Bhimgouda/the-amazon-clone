import {Routes, Route, useNavigate} from "react-router-dom"
import Home from "./pages/Home";
import WithoutNav from "./components/WithoutNav";
import WithNav from "./components/WithNav";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import jwt from 'jsonwebtoken'
import Checkout from "./pages/Checkout";
import { Provider } from "react-redux";
import {store} from "./app/store"

function App() {
  const navigate = useNavigate()

  const setUser = ()=>{
    const token = localStorage.getItem("token");
    if(token){
      const userData = jwt.decode(token);

      if(!userData){
        console.log(userData)
        localStorage.removeItem("token")
        return navigate('/login')
      }

      else{
        localStorage.setItem("user", JSON.stringify(userData))
      }
    }
  }


  useEffect(()=>{
    setUser()
  },[])

return (
  <Provider store={store}>
    <Routes>
      <Route element={<WithoutNav />}>
        <Route path="/login" element={<Login setUser={setUser}/>} />
        <Route path="/register" element={<Register  setUser={setUser} />} />
      </Route>
      <Route element={<WithNav />}>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>
    </Routes>
  </Provider>
)

}

export default App;
