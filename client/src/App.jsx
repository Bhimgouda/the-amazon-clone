import Header from "./components/Header";
import Banner from "./components/Banner";
import ProductFeed from "./components/ProductFeed";
import axios from "axios"
import { useEffect, useState } from "react";

function App() {

  const [products,setProducts] = useState([])

  useEffect(()=>{
      const getPorducts = async()=>{
          const {data} = await axios.get("https://fakestoreapi.com/products");
          setProducts(data)
      }
      getPorducts()
  },[]);

  return (
    <div style={{"backgroundColor":"#f3f4f6"}}>
       {/* Header */}
       <Header/>

       <main className="main">
       {/* Banner */}
          <Banner/>
          <ProductFeed products={products}/>
       </main>
    </div>
  )
}

export default App;
