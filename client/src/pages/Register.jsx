import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../css/auth.css"
import axios from "axios"
import { registerUser } from '../api-services/user'

function Register({setUser}) {
  const navigate = useNavigate()

  const handleRegister = async(e) =>{
    e.preventDefault();
    const {email, name, password} = e.target;
    const user = {
      email: email.value,
      name: name.value,
      password: password.value
    }
    const {data:userData} = await registerUser(user)

    if(userData){
      localStorage.setItem("token", userData.token);
      console.log(setUser)
      setUser()
      return navigate("/")
  }
}

  return (
    <div className='auth'>
        <div>
            <img className='logo' src="amazon-logo.png" alt=""/>
        </div>
        <div className='auth__box'>
            <span className='auth__title'>Create Account</span>
            <form onSubmit={handleRegister} className='auth__form'>
                <label className='auth__label' name="name" htmlFor="name">Your name</label>
                <input className='auth__input' name="name" type="text" />
                <label className='auth__label'  htmlFor="email">Email</label>
                <input className='auth__input' name="email" type="email" />
                <label className='auth__label' name="password" htmlFor="password">Password</label>
                <input className='auth__input' name="password" type="password" />
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