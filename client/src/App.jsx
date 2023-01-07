import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home";
import WithoutNav from "./components/WithoutNav";
import WithNav from "./components/WithNav";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
return (
  <Routes>
    <Route element={<WithoutNav />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>
    <Route element={<WithNav />}>
      <Route path="/" element={<Home />} />
    </Route>
</Routes>
)

}

export default App;
