import React from 'react'
import { Link } from 'react-router-dom'

function Register() {

  return (
    <div className='auth'>
        <div>
            <img className='logo' src="amazon-logo.png" alt=""/>
        </div>
        <div className='auth__box'>
            <span className='auth__title'>Create Account</span>
            <form className='auth__form'>
                <label className='auth__label' htmlFor="name">Your name</label>
                <input className='auth__input' type="text" />
                <label className='auth__label' htmlFor="email">Email</label>
                <input className='auth__input' type="email" />
                <label className='auth__label' htmlFor="password">Password</label>
                <input className='auth__input' type="password" />
                <button type="submit" className='btn btn--atc'>Continue</button>
            </form>
            <p className='auth__notice'>By enrolling your mobile phone number, you consent <br /> to receive automated security notifications via text <br /> message from Amazon. Message and data rates may <br /> apply.</p>
            <div className='auth__alternative'>
                <p className='auth__alternative__title'>Already have an account</p>
                <Link style={{"width":"100%"}} to="/login" >
                  <button style={{"width":"100%"}} className='btn' >
                      Sign in
                  </button>
                </Link>
            </div>
        </div>

    </div>
  )
}

export default Register