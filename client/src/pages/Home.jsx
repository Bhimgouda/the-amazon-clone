import React from 'react'
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import axios from "axios"
import { useEffect, useState } from "react";

function Home({products}) {

  
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