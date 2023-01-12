import React from 'react'
import { useSelector } from 'react-redux'
import CheckoutProduct from '../components/CheckoutProduct';
import { selectItems, subTotal } from '../slices/basketSlice'
import { loadStripe } from "@stripe/stripe-js"
import { getCheckoutSession } from '../api-services/stripe';
const stripePromise = loadStripe("pk_test_51MP2FcSIUTDommGOqTX694gbG9bJVhgvlDz6BfUjCxWA4MW4RofHreB5sBrTPGKMmTUxc7XBeboV5nauyuhNqgRp00E1rCZWcS")

function Checkout() {

  const items = useSelector(selectItems);
  const itemsSubtotal = useSelector(subTotal)
  const user = JSON.parse(localStorage.getItem('user'));

  const createCheckoutSession = async()=>{
    const stripe = await stripePromise;
    
    // call the backend to create a checkout session
    const { data: checkoutSession} = await getCheckoutSession(items, user.email)

    // Redirect user/customer to stripe checkout page
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.id
    })

    if(result.error) alert(result.error.message);
  }

  return (
    <div className='bg-gray-100'>
      <main className='checkout'>

        {/* Left part */}
        <div className="checkout__left">
          <img loading="lazy" className='checkout__banner' style={{"maxWidth":"1020px", "maxHeight": "250px", "objectFit":"contain"}} src="https://links.papareact.com/ikj"/>
          <div className="checkout__basket">
            <h1 className='title title--underline'>{items.length ? "Your Shopping basket": "Your Amazon basket is empty"}</h1>

            {items.map((item, index)=>{
              return <CheckoutProduct key={index} item={item} />
            })}
          </div>
        </div>

        {/* Right Part */}
        {
          items.length ? 
            <div className='checkout__right'>
            <h5 className='checkout__right__subtotal'>Subtotal ({items.length} Items): <span style={{"fontWeight":"bolder"}}> ${itemsSubtotal}</span></h5>
              {user ?
              <button onClick={createCheckoutSession} role="link" className='btn btn--atc btn--checkout' >Proceed to Checkout</button> : 
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