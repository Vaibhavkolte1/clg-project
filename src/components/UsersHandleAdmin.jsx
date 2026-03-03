import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import Toast from './Toast'

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
        <div className="w-full max-w-2xl mx-auto
                        bg-white border border-gray-200
                        rounded-xl p-4
                        shadow-sm hover:shadow-md
                        transition-all duration-200">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                {/* Left Section */}
                <div className="flex flex-col overflow-hidden">
                    <p className="text-xs text-gray-400">
                        User ID
                    </p>
                    <p className="font-semibold text-gray-800 truncate">
                        {id}
                    </p>

                    <p className="text-sm text-gray-500 mt-1 truncate">
                        {name}
                    </p>
                </div>

                {/* Right Section */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">

                    <div className="text-sm text-gray-600">
                        Role: <span className="font-medium text-gray-800">{role}</span>
                    </div>

                    <div className={`text-xs font-semibold px-3 py-1 rounded-full
                        ${isBlocked
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"}`}>
                        {isBlocked ? "Blocked" : "Active"}
                    </div>

                    {role != "ADMIN" &&
                        <button
                            onClick={handleBlockUser}
                            className={`px-4 py-2 rounded-md text-white ${isBlocked ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} transition-colors duration-200`}>
                            {isBlocked ? "Unblock" : "Block"}
                        </button>
                    }

                </div>

                {toast && (
                    <Toast
                        type={toast.type}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                )}

            </div>
        </div>
    )
}

export default UsersHandleAdmin