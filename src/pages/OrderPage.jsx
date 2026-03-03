import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import api from '../api/axios'
import Orders from '../components/Orders'

const OrderPage = () => {
    const [productList, setProductList] = useState([])
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const getCart = async () => {
            await api.get('/order/get-all')
                .then(res => { console.log(res.data.orderList); setProductList(res.data.orderList || []) })
                .catch(e => console.log("error to fetch cart:", e))
        }

        getCart();
    }, [refresh])

    return (
        <div className='main-bg text-white min-h-screen overflow-scroll'>
            <Navbar />
            <h1 className='text-3xl font-bold m-4 text-slate-800'>Your Orders</h1>
            {
                productList.map(item => {
                    return (
                        <Orders
                            key={item.id}
                            qty={item.quantity}
                            orderId={item.id}
                            setRefresh={setRefresh}
                        />)
                })
            }
        </div>
    )
}

export default OrderPage