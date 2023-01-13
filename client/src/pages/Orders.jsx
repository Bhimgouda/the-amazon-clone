import { useSelector } from 'react-redux';
import Order from '../components/Order';
import { getUser } from '../slices/userSlice';

function Orders() {
    const user = useSelector(getUser);
    const {orders} = user
    
return (
    <div className='orders'>
        <h1 className='title title--underline'>Your Orders</h1>

        {user._id ? 
            (<p className='title title--small'>{orders && orders.length} orders</p>) :
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