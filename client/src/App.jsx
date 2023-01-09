import {Routes, Route, useNavigate} from "react-router-dom"
import Home from "./pages/Home";
import WithoutNav from "./components/WithoutNav";
import WithNav from "./components/WithNav";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import axios from "axios";
import { getTokenUser } from "./api-services/user";

function App() {
  const [user,setUser] = useState({name: "", email: ""});

  // This is to check whether the user has unexpired token and get the user data from server if he refreshes the app and makes everthing re-render
  const getUser = async(token)=>{
    const {data} = await getTokenUser(token);
    setUser(data)
  }

  // After a user sign's in or registering a new user
  const updateUser = (user)=>{
    if(!user){
      localStorage.removeItem("token")
      setUser({ name: "", email: ""})
    }
    setUser(user);
  }


  useEffect(()=>{
    const token = localStorage.getItem("token");
    getUser(token)
    // if(token){
    //   const user = jwt.decode(token);
    //   if(!user){
    //     localStorage.removeItem("token")
    //     return navigate('/login')
    //   }
    // }
  },[])

return (
  <Routes>
    <Route element={<WithoutNav  />}>
      <Route path="/login" element={<Login updateUser={updateUser} />} />
      <Route path="/register" element={<Register updateUser={updateUser} />} />
    </Route>
    <Route element={<WithNav updateUser={updateUser} user={user} />}>
      <Route path="/" element={<Home />} />
    </Route>
</Routes>
)

}

export default App;
