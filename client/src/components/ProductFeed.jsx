import React, { useEffect, useState } from 'react'
import Product from './Product'

function ProductFeed({products}) {


  return (
    <div className='product-feed'>
        {products.slice(0,4).map((product,index)=>{
           return <Product product={product} key={index}/>
        })}

      <img className='product-feed__banner' src="https://links.papareact.com/dyz" alt="" />
    
      <div className="take-2-rows">
        {products.slice(4,5).map((product,index)=>{
           return <Product product={product} key={index}/>
        })}
      </div>

      {products.slice(0,4).map((product,index)=>{
           return <Product product={product} key={index}/>
        })}

    </div>

  )
}

export default ProductFeed