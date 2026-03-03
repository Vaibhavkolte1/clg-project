import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import Swal from 'sweetalert2';

const CartProduct = ({ productId, qty = 1, setRefresh }) => {
    const [pDetail, setPDetail] = useState(null)
    const [loading, setLoading] = useState(true)
    const [processing, setProcessing] = useState(false)

    useEffect(() => {
        const getProductDetails = async () => {
            try {
                setLoading(true)

                const cartRes = await api.get(`/cart/get-item/${productId}`)

                const productRes = await api.get(
                    `/product/get-by-name/${cartRes.data.name}`
                )

                setPDetail({
                    ...cartRes.data,
                    image: productRes.data.image,
                    price: productRes.data.price
                })

            } catch (error) {
                console.error("Error fetching cart product:", error)
                alert("Failed to load product details")
            } finally {
                setLoading(false)
            }
        }

        if (productId) {
            getProductDetails()
        }
    }, [productId])

    const handleRemoveFromCart = async () => {
        try {
            setProcessing(true)

            await api.delete(`/cart/delet-item/${productId}`)
            setPopup("removed")
            setRefresh(prev => !prev)

        } catch (error) {
            console.error("Error removing product:", error)
            alert("Failed to remove product")
        } finally {
            setProcessing(false)
        }
    }

    const handleOrder = async () => {
        try {
            setProcessing(true)

            await api.post('/order/order-product', {
                cartProductId: productId
            })

            setPopup("ordered")
            setRefresh(prev => !prev)

        } catch (error) {
            console.error("Error placing order:", error)
            alert("Order failed. Please try again.")
        } finally {
            setProcessing(false)
        }
    }

    const setPopup = (type) => {
        Swal.fire({
            toast: true,
            position: "top-end",
            icon: type === "ordered" ? "success" : "info",
            title: type === "ordered" ? "Order Placed Successfully 🎉" : "Item Removed from Cart 🚫",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: "#1f2937",
            color: "#fff",
            customClass: {
                popup: "rounded-xl shadow-lg"
            }
        });
    }

    if (loading) {
        return (
            <div className='p-4 m-4 rounded max-w-sm text-white'>
                Loading...
            </div>
        )
    }

    if (!pDetail) return null

    return (
        <div className="obj-bg max-w-sm sm:max-w-md m-4 p-4 rounded-lg 
                  flex items-center justify-between gap-4
                  shadow-sm hover:shadow-md
                  transition-all duration-200
                  text-black hover:bg-purple-500 hover:text-white">

            {/* Left: Image + Name */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <img
                    src={pDetail.image || "/placeholder.png"}
                    alt="Product"
                    className="h-12 w-12 object-cover rounded-md"
                />
                <span className="font-semibold truncate">
                    {pDetail.name}
                </span>
            </div>

            {/* Middle: Qty + Price */}
            <div className="flex flex-col text-sm">
                <span className="opacity-80">Qty: {qty}</span>
                <span className="font-medium">
                    Rs. {pDetail.price ? pDetail.price * qty : 0}
                </span>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-col gap-2">
                <button
                    className="px-4 py-2 rounded-md text-sm font-medium 
                   bg-blue-500 text-white 
                   hover:bg-blue-600 
                   disabled:opacity-50 
                   transition-colors"
                    onClick={handleOrder}
                    disabled={processing}
                >
                    Order
                </button>

                <button
                    className="px-4 py-2 rounded-md text-sm font-medium 
                    text-white
                   bg-red-500
                   hover:bg-red-600
                   disabled:opacity-50 
                   transition-colors"
                    onClick={handleRemoveFromCart}
                    disabled={processing}
                >
                    Remove
                </button>
            </div>

        </div>
    );
}

export default CartProduct