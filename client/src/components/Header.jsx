import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectItems } from '../slices/basketSlice'

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

    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = ()=>{
        localStorage.clear()
        navigate("/")
    }

    const items = useSelector(selectItems);



  return (
    <header className='nav'>
        {/* Top nav */}
        <div className='nav__top'>
            <Link to="/">
                <div className='logo-container'>
                    <img loading="lazy" className='logo' src="amazon-logo.png" alt=""/>
                </div>
            </Link>

            {/* Search */}

            <div className='nav__search'>
                <input type="text" />
                <FontAwesomeIcon className='nav__search-icon' icon={faSearch} />
            </div>

            {/* Right */}
                <div className="nav__right">
                    {/* {user && user.name && <p onClick={handleLogout} >logout</p>}  */}
                    <div onClick={()=>user ? handleLogout() : navigate("/login")} className='nav__right__1'>
                        <p>{user && user.name || "login"}</p>  
                        <p style={{"fontWeight":"700"}}>Account & Lists</p>
                    </div>
                    <Link to="/orders">
                    <div className='nav__right__2'>
                        <p>Returns</p>
                        <p style={{"fontWeight":"700"}}>& Orders</p>
                    </div>
                    </Link>
                    <Link to="/checkout">
                        <div className='nav__right__3'>
                        <span className='total-cart-items'>{items.length}</span>

                            <FontAwesomeIcon className='nav__cart-icon' icon={faCartShopping} />
                            <p style={{"fontWeight":"700"}}>Basket</p>
                        </div>
                    </Link>
                </div>
        </div>

        {/* Bottom nav */}
        <div className='nav__bottom'>
           <p style={{"display":"flex", "alignItems":"center"}}>
                <FontAwesomeIcon className='nav__bottom__menu' icon={faBars} />
                All
           </p>
           {bottomNavbarLinks.map((link,index)=>{
            if(index>5) return <p key={index} className={`nav__bottom__link--group-4`}>{link}</p>
            if(index>3) return <p key={index} className={`nav__bottom__link--group-3`}>{link}</p>
            else if(index>2) return <p key={index} className={`nav__bottom__link--group-2`}>{link}</p>
            else return <p key={index} >{link}</p>
           })}
        </div>
    </header>

  )
}

export default Header