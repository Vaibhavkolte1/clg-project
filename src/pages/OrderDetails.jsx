import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios';
import Navbar from '../components/Navbar';
import { useSelector } from "react-redux";
import { FaUser, FaMapMarkerAlt, FaCreditCard, FaClock } from 'react-icons/fa'

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
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
            <Navbar />

            <main className="flex-1 pt-24 pb-32 px-4 flex justify-center items-start">
                <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">

                    {/* Header Section */}
                    <div className="bg-slate-900 p-8 text-center">
                        <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Order Confirmed</p>
                        <h2 className="text-2xl font-black text-white leading-tight">
                            {order?.name}
                        </h2>
                    </div>

                    {/* QR Code Section - The "Ticket" look */}
                    <div className="px-8 -mt-6">
                        <div className="bg-white p-4 rounded-3xl shadow-lg flex flex-col items-center border border-slate-50">
                            <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${order?._id}`}
                                alt="Order QR"
                                className="w-40 h-40 rounded-xl"
                            />
                            <p className="text-[10px] font-mono text-slate-400 mt-3">ID: {order?._id?.toUpperCase()}</p>
                        </div>
                    </div>

                    <div className="p-8">
                        {/* Main Price Display */}
                        <div className="text-center mb-8">
                            <p className="text-4xl font-black text-slate-900">${order?.totalAmount}</p>
                            <p className="text-sm font-bold text-blue-600 mt-1">Quantity: {order?.quantity}</p>
                        </div>

                        {/* Decorative Perforated Divider */}
                        <div className="relative flex items-center mb-8">
                            <div className="flex-1 border-t-2 border-dashed border-slate-100"></div>
                            <div className="absolute -left-10 w-4 h-4 bg-[#F8FAFC] rounded-full border border-slate-100"></div>
                            <div className="absolute -right-10 w-4 h-4 bg-[#F8FAFC] rounded-full border border-slate-100"></div>
                        </div>

                        {/* Details List */}
                        <div className="space-y-6">
                            <DetailRow
                                icon={<FaUser className="text-blue-500" />}
                                label="Receiver"
                                value={userGet?.name}
                            />
                            <DetailRow
                                icon={<FaMapMarkerAlt className="text-red-500" />}
                                label="Shipping to"
                                value={userGet?.address}
                            />
                            <DetailRow
                                icon={<FaCreditCard className="text-green-500" />}
                                label="Payment"
                                value={order?.paymentStatus}
                                isStatus
                                statusType={order?.paymentStatus === "Paid" ? "success" : "danger"}
                            />
                            <DetailRow
                                icon={<FaClock className="text-orange-500" />}
                                label="Status"
                                value={order?.orderstatus}
                                isStatus
                                statusType="info"
                            />
                        </div>

                        {/* Back Action */}
                        <button
                            onClick={() => navigate('/getmyorders')}
                            className="w-full mt-10 py-4 bg-slate-50 text-slate-600 font-bold rounded-2xl hover:bg-slate-100 transition-all active:scale-95"
                        >
                            Back to My Orders
                        </button>
                    </div>
                </div>
            </main>

        </div>
    );

    // Small helper for the detail rows to keep code clean
    function DetailRow({ icon, label, value, isStatus, statusType }) {
        return (
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-xs">
                        {icon}
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</span>
                </div>
                <span className={`text-sm font-bold text-right max-w-[50%] ${isStatus && statusType === "success" ? "text-green-600" :
                        isStatus && statusType === "info" ? "text-blue-600" :
                            "text-slate-800"
                    }`}>
                    {value}
                </span>
            </div>
        );
    }
}

export default OrderDetails