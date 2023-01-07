import React from 'react'
import { Link } from 'react-router-dom'
import "../css/auth.css"

function Login() {
  return (
    <div className='auth'>
        <div>
            <img className='logo' src="amazon-logo.png" alt=""/>
        </div>
        <div className='auth__box'>
            <span className='auth__title'>Sign in</span>
            <form className='auth__form'>
                <label className='auth__label' htmlFor="email">Enter your Email</label>
                <input className='auth__input' type="email" />
                <button type="submit" className='btn btn--atc'>Continue</button>
            </form>
            <p className='auth__notice'>By continuing, you agree to Amazon's Conditions of <br />
            Use and Privacy Notice.</p>
        </div>

        <div className='auth__alternative'>
            <p className='auth__alternative__title'>New To Amazon?</p>
            
                <Link to="/register">
                    <button className='btn'>Create Your Amazon Account</button>
                </Link>  
        </div>
    </div>
  )
}

export default Login