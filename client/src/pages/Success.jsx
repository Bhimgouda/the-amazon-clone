import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function Success() {
    
  return (
    <div className='success'>
        <div className='success__top'>
            <FontAwesomeIcon className='success__check-circle' icon={faCircleCheck} />
            <p className='title'>Thank you, your order has been confirmed!</p>
        </div>
        <div className="success__bottom">
            <p className='success__thankyou-message'>
                Thank you for shopping with us. We'll send a confirmation once the item has
                shipped. If you would like to check the status of you order(s) please press
                the link below.
            </p>
            <Link to="/orders">
                <button className="btn btn--atc">Go to my orders</button>
            </Link>
        </div>
    </div>
  )
}

export default Success