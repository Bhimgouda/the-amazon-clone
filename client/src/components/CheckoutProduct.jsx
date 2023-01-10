import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useDispatch} from 'react-redux'
import React from 'react'
import { removeFromBasket } from '../slices/basketSlice';

function CheckoutProduct({item}) {

  const dispatch = useDispatch();

  const handleRemoveItem = ()=>{
    dispatch(removeFromBasket(item.id))
  }

  return (
    <div className='checkout__product'>
        <img loading="lazy" className='checkout__product__image' src={item.image} alt="" />
        <div className='checkout__product__info'>
          <p className='product__title checkout__product__title'>{item.title}</p>
          <div>
              {Array(item.rating)
                .fill()
                .map((star,index)=>{
                    return <FontAwesomeIcon key={index} style={{"color":"#facc15"}} icon={faStar}/>
              })}
          </div>
          <p className='product__description checkout__product__description line-clamp-3'>{item.description}</p>
          <div className='product__price'>
            <span>${item.price}</span>
          </div>
          {item.hasPrime && 
            <div className='product__prime-container'>
                <img loading="lazy" className='product__prime-logo' src="https://links.papareact.com/fdw" alt="" />
                <p>FREE Next-day Delivery</p>
            </div>
          }
        </div>
        <div className='checkout__product__buttons'>
            <button className='btn btn--atc'>Add to Basket</button>
            <button onClick={handleRemoveItem} className='btn btn--atc'>Remove from Basket</button>
        </div>
    </div>
  )
}

export default CheckoutProduct