import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios';
import Navbar from '../components/Navbar';
import { useSelector } from "react-redux";

const OrderDetails = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState();
    
     const userGet = useSelector((state) => state.user.user);

    useEffect(() => {
        const getOrderDetails = () => {
            api.get(`/order/get/${orderId}`)
                .then(res => { console.log(res.data); setOrder(res.data) })
                .catch(e => console.log("error to fetch product details:", e))
        }

        getOrderDetails();
    }, [])

    return (
        <div className="min-h-screen w-full bg-gray-100 text-gray-800 overflow-auto">
            <Navbar />

            <div className="flex justify-center items-center py-12 px-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-200">

                    {/* QR Code */}
                    <div className="flex justify-center mb-6">
                        <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${order?._id}`}
                            alt="Order QR"
                            className="w-44 h-44 rounded-xl shadow-md border border-gray-200"
                        />
                    </div>

                    {/* Order Info */}
                    <div className="text-center space-y-2 mb-6">
                        <h3 className="text-2xl font-bold text-gray-900">
                            {order?.name}
                        </h3>
                        <p className="text-xl font-semibold text-green-600">
                            ${order?.totalAmount}
                        </p>
                        <p className="text-base text-yellow-600 font-medium">
                            Quantity: {order?.quantity}
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200 my-6"></div>

                    {/* Details */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-700">
                            Order Details
                        </h4>

                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Receiver</span>
                            <span className="font-medium text-gray-800">
                                {userGet?.name}
                            </span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Shipping Address</span>
                            <span className="font-medium text-gray-800 text-right max-w-[60%]">
                                {userGet?.address}
                            </span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Payment</span>
                            <span
                                className={`font-medium ${order?.paymentStatus === "Paid"
                                        ? "text-green-600"
                                        : "text-red-500"
                                    }`}
                            >
                                {order?.paymentStatus}
                            </span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Order Status</span>
                            <span className="font-medium text-blue-600">
                                {order?.orderstatus}
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default OrderDetails