import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Order from '../components/Order';

function Orders() {
    const [orders, setOrders] = useState([])

    const user = JSON.parse(localStorage.getItem('user'));
    
    async function getOrders(user){
        const {data} = await axios.get(`/api/${user.user_id}/orders`)
        setOrders(data)
    }

    useEffect(()=>{
        getOrders(user)
    }, [])
    

return (
    <div className='orders'>
        <h1 className='title title--underline'>Your Orders</h1>

        {user ? 
            (<p className='title title--small'>{orders.length} orders</p>) :
            (<p>Please Sign in to see your orders</p>)
        }

        <div className='orders__display'>
            {orders && orders.map((order, index)=>{
               return <Order order={order} />
            })}
        </div>
    </div>
  )
  
}

export default Orders;