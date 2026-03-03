import React, { useState } from 'react'
import api from '../api/axios';

const CreateProduct = () => {
    const [productDtls, setProductDtls] = useState({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        image: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!productDtls.name || !productDtls.description || !productDtls.price || !productDtls.stock || !productDtls.image) {
            alert("Please fill in all required fields.");
            return;
        }

        console.log("Submitting product details:", productDtls);

        api.post("/seller/create-product", {
            name: productDtls.name,
            description: productDtls.description,
            price: parseFloat(productDtls.price),
            stock: parseInt(productDtls.stock),
            image: productDtls.image
        })
            .then(response => {
                console.log("Product created:", response.data);
                alert("Product created successfully!");
            })
            .catch(error => {
                console.error("Error creating product:", error);
                alert("Failed to create product.");
            });
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 px-4">
            <div className="w-full max-w-lg bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-8">

                <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    Create New Product
                </h1>

                <form className="space-y-5">

                    {/* Product Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">
                            Product Name
                        </label>
                        <input
                            type="text"
                            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                            value={productDtls.name}
                            onChange={(e) => setProductDtls({ ...productDtls, name: e.target.value })}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">
                            Description
                        </label>
                        <textarea
                            rows="3"
                            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition resize-none"
                            value={productDtls.description}
                            onChange={(e) => setProductDtls({ ...productDtls, description: e.target.value })}
                        />
                    </div>

                    {/* Price & Stock */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1">
                                Price
                            </label>
                            <input
                                type="number"
                                min={0}
                                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                                value={productDtls.price}
                                onChange={(e) => setProductDtls({ ...productDtls, price: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1">
                                Stock
                            </label>
                            <input
                                type="number"
                                min={0}
                                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                                value={productDtls.stock}
                                onChange={(e) => setProductDtls({ ...productDtls, stock: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">
                            Image URL
                        </label>
                        <input
                            type="text"
                            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                            value={productDtls.image}
                            onChange={(e) => setProductDtls({ ...productDtls, image: e.target.value })}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-xl font-semibold tracking-wide hover:scale-[1.02] hover:shadow-lg transition-all duration-200"
                    >
                        Create Product
                    </button>

                </form>
            </div>
        </div>
    );
}

export default CreateProduct