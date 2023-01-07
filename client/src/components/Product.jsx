import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'


function Product({product}) {
   const {id,title,price,description, category, image} = product;

   const [rating] = useState(
        Math.floor(Math.random()*(5-1+1)) + 1
   )

    const [hasPrime] = useState(Math.random()<0.5)

  return (
    <div className='product'>
        <p className='product__category'>{category}</p>

        <img className='product__image' src={image} alt="" />

        <h4 className='product__title'>{title}</h4>

        <div>
            {Array(rating)
            .fill()
            .map((star,index)=>{
                return <FontAwesomeIcon key={index} style={{"color":"#facc15"}} icon={faStar}/>
            })}
        </div>

        <p className='line-clamp product__description'>{description}</p>

        <div className='product__price'>
            <span>${price}</span>
        </div>

        {hasPrime && 
            <div className='product__prime-container'>
                <img className='product__prime-logo' src="https://links.papareact.com/fdw" alt="" />
                <p>FREE Next-day Delivery</p>
            </div>
        }

        <button className='btn btn--atc'>Add to basket</button>
    </div>
  )
}

export default Product