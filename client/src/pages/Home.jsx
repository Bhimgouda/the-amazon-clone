import React from 'react'
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import axios from "axios"
import { useEffect, useState } from "react";

function Home() {
    const [products,setProducts] = useState([])

    useEffect(()=>{
        const getPorducts = async()=>{
            const {data} = await axios.get("/api/products");
            setProducts(data)
        }
        getPorducts()
    },[]);
  
    return (
      <div style={{"backgroundColor":"#f3f4f6"}}>
  
         <main className="main">
         {/* Banner */}
            <Banner/>
            <ProductFeed products={products}/>
         </main>
      </div>
    )
}

export default Home