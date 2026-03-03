import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

const Orders = ({ productId, qty = 1, orderId, setRefresh }) => {
	const [pDetail, setpDetail] = useState(null)
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()

	useEffect(() => {
		const getProductDetails = async () => {
			try {
				setLoading(true)
				const orderRes = await api.get(`/order/get/${orderId}`)

				const productRes = await api.get(
					`/product/get-by-name/${orderRes.data.name}`
				)

				setpDetail({
					...orderRes.data,
					image: productRes.data.image,
					price: productRes.data.price
				})

			} catch (e) {
				console.log("Error fetching order/product:", e)
			} finally {
				setLoading(false)
			}
		}

		if (orderId) {
			getProductDetails()
		}
	}, [orderId])

	const handleCancelOrder = async () => {
		try {
			await api.delete(`/order/cancel/${orderId}`)
			setRefresh(prev => !prev)
		} catch (e) {
			console.log("Error cancelling order:", e)
		}
	}

	const handleClick = () => {
		navigate(`/orderdetails/${orderId}`)
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
		<div className="bg-white p-4 m-4 max-w-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-between text-black hover:bg-purple-500 hover:text-white">

			{/* Left Section: Image + Name */}
			<div
				className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
				onClick={handleClick}
			>
				<img
					src={pDetail.image}
					alt="Product"
					className="h-12 w-12 object-cover rounded-md"
				/>
				<span className="font-semibold truncate">
					{pDetail.name}
				</span>
			</div>

			{/* Middle Section: Qty + Price */}
			<div
				className="flex flex-col text-sm mr-4 cursor-pointer"
				onClick={handleClick}
			>
				<span className="opacity-80">Qty: {qty}</span>
				<span className="font-medium">
					Rs. {pDetail.price ? pDetail.price * qty : 0}
				</span>
			</div>

			{/* Right Section: Cancel Button */}
			<button
				className="px-4 py-2 rounded-md text-sm font-medium bg-gray-100 hover:bg-red-500 text-black hover:text-white transition-colors duration-200"
				onClick={handleCancelOrder}
			>
				Cancel
			</button>

		</div>
	);
}

export default Orders