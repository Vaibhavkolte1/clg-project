import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import CartProduct from '../components/CartProduct'
import Navbar from '../components/Navbar'

const Cart = () => {
  const [productList, setProductList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getCart = async () => {
      await api.get('/cart/get')
        .then(res => { setProductList(res.data.cartProductList || []) })
        .catch(e => console.log("error to fetch cart:", e))
    }

    getCart();
  }, [refresh])

  return (
    <div className='main-bg text-white min-h-screen overflow-scroll'>
      <Navbar />
      <h1 className='text-3xl font-bold m-4 text-slate-800'>Your Cart</h1>
      {
        productList.map(item => {
          return (<CartProduct
            key={item.id}
            productId={item.id}
            qty={item.quantity}
            setRefresh={setRefresh} />)
        })
      }
    </div>
  )
}

export default Cart