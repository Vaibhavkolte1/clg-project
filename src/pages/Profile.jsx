import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { FaStore } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { FaBullhorn } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../features/userSlice";

const Profile = () => {
    const dispatch = useDispatch();
    const userGet = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    const handleLogOut = (e) => {
        api.get('/auth/logout')
            .then(responce => { dispatch(clearUser()), navigate('/login') })
            .catch(error => { console.error("There was an error", error); });
    }

    return (
        <div className="main-bg min-h-screen flex flex-col text-black">
            <Navbar />

            <div className="flex flex-col items-center px-4 py-8 gap-6">

                {/* Profile Card */}
                <div className="obj-bg w-full max-w-md rounded-xl shadow-md p-6 flex flex-col gap-4">

                    <h2 className="text-2xl font-bold text-purple-600 text-center">
                        User Profile
                    </h2>

                    <div className="space-y-2 text-sm sm:text-base">
                        <p><span className="font-semibold">Name:</span> {userGet?.name}</p>
                        <p><span className="font-semibold">Email:</span> {userGet?.email}</p>
                        <p><span className="font-semibold">Address:</span> {userGet?.address}</p>
                        <p><span className="font-semibold">Role:</span> {userGet?.role}</p>
                    </div>

                    {/* Seller Actions */}
                    {userGet?.role === "SELLER" && (
                        <div className="flex flex-col gap-3 pt-2">
                            <button
                                className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
                                onClick={() => navigate('/createproduct')}
                            >
                                <FaBox />
                                Add Product
                            </button>

                            <button
                                className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-purple-500 text-white hover:bg-purple-600 transition"
                                onClick={() => navigate('/productmanage')}
                            >
                                <FaBox />
                                Manage Products
                            </button>
                        </div>
                    )}

                    {/* Admin Action */}
                    {userGet?.role === "ADMIN" && (
                        <button
                            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                            onClick={() => navigate('/adminpanel')}
                        >
                            <FaBox />
                            Admin Panel
                        </button>
                    )}

                    {/* Logout */}
                    <button
                        className="mt-4 px-4 py-2 rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                        onClick={handleLogOut}
                    >
                        Log Out
                    </button>
                </div>

                {/* More Section */}
                <div className="obj-bg w-full max-w-md rounded-xl shadow-md p-6 flex flex-col gap-4">
                    <h3 className="text-lg font-semibold text-center">More</h3>

                    <div className="flex flex-col gap-3 text-sm sm:text-base">

                        <button
                            className="flex items-center gap-3 hover:text-blue-600 transition"
                            onClick={() => navigate('/registerseller')}
                        >
                            <FaStore className="text-blue-600" />
                            Become a Seller
                        </button>

                        <button className="flex items-center gap-3 hover:text-yellow-500 transition">
                            <IoNotifications className="text-yellow-500" />
                            Notification Settings
                        </button>

                        <button className="flex items-center gap-3 hover:text-green-600 transition">
                            <MdSupportAgent className="text-green-600" />
                            24x7 Customer Care
                        </button>

                        <button className="flex items-center gap-3 hover:text-purple-600 transition">
                            <FaBullhorn className="text-purple-600" />
                            Advertise with Us
                        </button>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Profile