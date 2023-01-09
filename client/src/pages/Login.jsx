import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import "../css/auth.css"
import { loginUser } from '../api-services/user'

function Login({setUser}) {

    const navigate = useNavigate()

    const handleLogin = async(e)=>{
        e.preventDefault();
        const {email, password} = e.target;
        const user = {
            email : email.value,
            password: password.value
        }
        const {data:userData} = await loginUser(user);
        if(userData){
            localStorage.setItem("token", userData.token);
            console.log(setUser);
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
            <span className='auth__title'>Sign in</span>
            <form onSubmit={handleLogin} className='auth__form'>
                <label className='auth__label' htmlFor="email">Enter your Email</label>
                <input className='auth__input' name='email' type="email" />
                <label className='auth__label' name="password" htmlFor="password">Password</label>
                <input className='auth__input' name="password" type="password" />
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