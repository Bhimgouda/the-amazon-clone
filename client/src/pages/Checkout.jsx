import React from 'react'
import { useSelector } from 'react-redux'
import CheckoutProduct from '../components/CheckoutProduct';
import { selectItems, subTotal } from '../slices/basketSlice'

function Checkout() {

  const items = useSelector(selectItems);
  const itemsSubtotal = useSelector(subTotal)
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className='bg-gray-100'>
      <main className='checkout'>

        {/* Left part */}
        <div className="checkout__left">
          <img loading="lazy" className='checkout__banner' style={{"maxWidth":"1020px", "maxHeight": "250px", "objectFit":"contain"}} src="https://links.papareact.com/ikj"/>
          <div className="checkout__basket">
            <h1 className='checkout__basket__title'>{items.length ? "Your Shopping basket": "Your Amazon basket is empty"}</h1>

            {items.map((item, index)=>{
              return <CheckoutProduct key={index} item={item} />
            })}
          </div>
        </div>

        {/* Right Part */}
        {
          items.length ? 
            <div className='checkout__right'>
            <h5>Subtotal ({items.length} Items): <span style={{"fontWeight":"bolder"}}> ${itemsSubtotal}</span></h5>
              {user ?
              <button className='btn btn--atc btn--checkout' >Proceed to Checkout</button> : 
              <button disabled={!user} className='btn btn--grey'>Sign in to Checkout</button>
              }
            </div>
            : null
        }


      </main>
    </div>

  )
}

export default Checkout