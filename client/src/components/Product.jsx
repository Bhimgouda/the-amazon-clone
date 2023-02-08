import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import {useDispatch} from "react-redux"
import { addTobasket } from '../slices/basketSlice';



function Product({product}) {
   const {id,title,price,description, category, image} = product;

   // here dispatch fuction is gun and the slice actions are the bullet that make changes to the state
   const dispatch = useDispatch();

   const [rating] = useState(
        Math.floor(Math.random()*(5-1+1)) + 1
   )
   const [hasPrime] = useState(Math.random()<0.5)


   const handleAddToBasket = ()=>{
    // dispatch an action and sending the product to the redux store ... bakset slice here
    dispatch(addTobasket({...product,hasPrime, rating, quantity: 1}))
   }

  return (
    <div className='product'>
        <p className='product__category'>{category}</p>

        <img loading="lazy" className='product__image' src={image} alt="" />

        <h4 className='product__title line-clamp-2'>{title}</h4>

        <div>
            {Array(rating)
            .fill()
            .map((star,index)=>{
                return <FontAwesomeIcon key={index} style={{"color":"#facc15"}} icon={faStar}/>
            })}
        </div>

        <p className='line-clamp-2 product__description'>{description}</p>

        <div className='product__price'>
            <span>₹{price}</span>
        </div>
        <div style={{"marginTop": "auto", "width": "100%"}}>
            {hasPrime && 
                <div className='product__prime-container'>
                    <img loading="lazy" className='product__prime-logo' src="https://links.papareact.com/fdw" alt="" />
                    <p>FREE Next-day Delivery</p>
                </div>
            }
            <button onClick={handleAddToBasket} className='btn btn--atc'>Add to basket</button>
        </div>
    </div>
  )
}

export default Product