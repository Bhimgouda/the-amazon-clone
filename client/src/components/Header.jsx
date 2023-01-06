import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'

function Header() {

    const [bottomNavbarLinks,setBottomNavbarLinks] = useState(["Amazon miniTV",
        "Sell",
        "Best Sellers",
        "Mobiles",
        "Today's Deals",
        "Customer Service",
        "Electronics",
        "Prime",
        "Fashion",
        "Amazon Pay",
        "Home & Kitchen"])


  return (
    <header className='nav'>
        {/* Top nav */}
        <div className='nav__top'>
            <div className='logo-container'>
                <img className='logo' src="amazon-logo.png" alt=""/>
            </div>

            {/* Search */}

            <div className='nav__search'>
                <input type="text" />
                <FontAwesomeIcon className='nav__search-icon' icon={faSearch} />
            </div>

            {/* Right */}
                <div className="nav__right">
                    <div className='nav__right__1'>
                        <p>Hello, Bhimgouda D Patil</p>
                        <p style={{"font-weight":"700"}}>Account & Lists</p>
                    </div>
                    <div className='nav__right__2'>
                        <p>Returns</p>
                        <p style={{"font-weight":"700"}}>& Orders</p>
                    </div>
                    <div className='nav__right__3'>
                    <span className='total-cart-items' >0</span>

                        <FontAwesomeIcon className='nav__cart-icon' icon={faCartShopping} />
                        <p style={{"font-weight":"700"}}>Basket</p>
                    </div>
                </div>
        </div>

        {/* Bottom nav */}
        <div className='nav__bottom'>
           <p style={{"display":"flex", "alignItems":"center"}}>
                <FontAwesomeIcon className='nav__bottom__menu' icon={faBars} />
                All
           </p>
           {bottomNavbarLinks.map((link,index)=>{
            if(index>5) return <p className={`nav__bottom__link--group-4`}>{link}</p>
            if(index>3) return <p className={`nav__bottom__link--group-3`}>{link}</p>
            else if(index>2) return <p className={`nav__bottom__link--group-2`}>{link}</p>
            else return <p>{link}</p>
           })}
        </div>
    </header>

  )
}

export default Header