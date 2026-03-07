import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import Toast from './Toast'
import { FaUserShield, FaBan, FaCheckCircle } from "react-icons/fa";

const UsersHandleAdmin = ({ id, name, role, active }) => {
    const [isBlocked, setisBlocked] = useState(false)
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (active === "ACTIVE") {
            setisBlocked(false)
        } else {
            setisBlocked(true)
        }
    }, [active])

    const handleBlockUser = () => {

        const result = confirm("Are you want to Block or unblock");
        if (!result || role == "ADMIN") return;

        if (isBlocked) {
            setisBlocked(false)
            setToast({ type: 'success', message: 'User unblocked!' });
        } else {
            setisBlocked(true)
            setToast({ type: 'error', message: 'User blocked!' });
        }

        api.patch(`/admin/toogle-block/${id}`)
            .then(res => console.log("user blocked/unblocked: ", res.data))
            .catch(err => console.error("Error blocking/unblocking user: ", err))

    }

    return (
        <div className="group w-full max-w-3xl mx-auto bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">

                {/* Left Section: Avatar & Identity */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 font-black text-lg shadow-inner 
                    ${role === "ADMIN" ? "bg-red-50 text-red-600" : "bg-slate-50 text-slate-400"}`}>
                        {name.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <h2 className="text-base font-black text-slate-800 truncate leading-tight">
                                {name}
                            </h2>
                            {role === "ADMIN" && (
                                <FaUserShield className="text-red-500 text-xs" title="Administrator" />
                            )}
                        </div>
                        <p className="text-[10px] font-mono text-slate-400 mt-1 uppercase tracking-tighter">
                            ID: {id}
                        </p>
                    </div>
                </div>

                {/* Right Section: Role, Status & Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 shrink-0">

                    {/* Role Badge */}
                    <div className="flex flex-col sm:items-end">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Access Level</span>
                        <span className={`text-xs font-bold px-3 py-1 rounded-lg border 
                        ${role === "ADMIN" ? "border-red-100 bg-red-50 text-red-600" : "border-slate-100 bg-slate-50 text-slate-600"}`}>
                            {role}
                        </span>
                    </div>

                    {/* Status Toggle Button */}
                    {role !== "ADMIN" ? (
                        <button
                            onClick={handleBlockUser}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-200 active:scale-95 
                            ${isBlocked
                                    ? "bg-green-50 text-green-600 border border-green-100 hover:bg-green-100"
                                    : "bg-slate-50 text-slate-500 border border-slate-100 hover:bg-red-50 hover:text-red-600 hover:border-red-200"}`}
                        >
                            {isBlocked ? (
                                <><FaCheckCircle className="text-[10px]" /> Unblock</>
                            ) : (
                                <><FaBan className="text-[10px]" /> Block</>
                            )}
                        </button>
                    ) : (
                        <div className="px-5 py-2.5 text-xs font-bold text-slate-300 uppercase tracking-widest italic cursor-not-allowed">
                            Protected
                        </div>
                    )}
                </div>
            </div>

            {/* Toast Notification Mount Point */}
            {toast && (
                <div className="fixed bottom-10 right-10 z-50">
                    <Toast
                        type={toast.type}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}
        </div>
    );
}

export default UsersHandleAdmin