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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-24 pb-32 px-4 sm:px-6 lg:px-12 max-w-[1200px] mx-auto w-full">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Your <span className="text-blue-600">Cart</span>
          </h1>
          <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2.5 py-1 rounded-full">
            {productList.length} ITEMS
          </span>
        </div>

        {productList.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* 1. PRODUCT LIST SECTION (Left Column) */}
            <div className="lg:col-span-2 space-y-4">
              {productList.map((item) => (
                <CartProduct
                  key={item.id}
                  productId={item.id}
                  qty={item.quantity}
                  setRefresh={setRefresh}
                />
              ))}
            </div>

            {/* 2. ORDER SUMMARY SECTION (Right Column) */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 sticky top-28">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">{productList.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold uppercase text-xs">Free</span>
                </div>
                <div className="border-t border-slate-100 pt-4 flex justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-black text-blue-600">{productList.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}</span>
                </div>
              </div>

              <button
                className="w-full py-4 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl font-bold transition-all duration-300 shadow-lg shadow-slate-200 active:scale-95"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </button>

              <p className="text-[10px] text-center text-slate-400 mt-4 uppercase tracking-widest font-bold">
                🔒 Secure Checkout Guaranteed
              </p>
            </div>

          </div>
        ) : (
          /* Empty Cart State */
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <div className="text-6xl mb-4 opacity-20">🛒</div>
            <p className="text-slate-500 font-medium mb-6">Your cart is feeling a bit lonely...</p>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all"
            >
              Start Shopping
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Cart