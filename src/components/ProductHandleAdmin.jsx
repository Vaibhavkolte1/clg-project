import React, { useState } from 'react'
import api from '../api/axios';

const ProductHandleAdmin = ({ id, name, image, price, stock, sold, setRefresh }) => {
    const handleDeletProduct = () => {
        if (id == null) { alert("somehting wennt worng") }

        const result = confirm("Are you want to delet this product!");
        if (!result) return;

        api.delete('/admin/product-delete', {
            params: {
                productId: id,
            }
        }).then(res => setRefresh(prev => !prev))
            .catch(e => console.log("Error occur when deleted product"))



    }

    return (
        <div className="w-full max-w-3xl mx-auto
                    bg-white
                    border border-gray-200
                    rounded-xl
                    p-5
                    shadow-sm hover:shadow-md
                    transition-all duration-200">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

                {/* Left Section */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                        src={image}
                        alt="product"
                        className="h-14 w-14 object-cover rounded-lg border border-gray-100"
                    />

                    <div className="min-w-0">
                        <h2 className="text-base font-semibold text-gray-800 truncate">
                            {name}
                        </h2>
                        <p className="text-xs text-gray-400 mt-1">
                            ID: {id}
                        </p>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 w-full sm:w-auto">

                    <div className="flex justify-between sm:flex-col sm:text-right">
                        <span className="text-xs text-gray-400 uppercase tracking-wide">
                            Stock
                        </span>
                        <span className="text-sm font-medium text-gray-700">
                            {stock}
                        </span>
                    </div>

                    <div className="flex justify-between sm:flex-col sm:text-right">
                        <span className="text-xs text-gray-400 uppercase tracking-wide">
                            Sold
                        </span>
                        <span className="text-sm font-medium text-gray-700">
                            {sold}
                        </span>
                    </div>

                    <div className="flex justify-between sm:flex-col sm:text-right">
                        <span className="text-xs text-gray-400 uppercase tracking-wide">
                            Price
                        </span>
                        <span className="text-base font-semibold text-gray-900">
                            Rs. {price}
                        </span>
                    </div>

                    <button
                        onClick={handleDeletProduct}
                        className="w-full sm:w-auto
                               px-4 py-2
                               rounded-lg
                               text-sm font-medium
                               border border-red-300
                               text-red-600
                               hover:bg-red-50
                               transition-all duration-150">
                        Delete
                    </button>

                </div>

            </div>
        </div>
    )
}

export default ProductHandleAdmin