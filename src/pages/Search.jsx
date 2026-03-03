import React, { useEffect, useState } from 'react'
import Product from '../components/Product';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { IoSearch } from "react-icons/io5";

const Search = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const searchProducts = async () => {
            try {
                const res = await api.get('/product/search', {
                    params: {
                        keyword: searchTerm
                    }
                });
                console.log(res.data);
                setProducts(res.data);
            } catch (e) {
                console.log("error in product fetch: ", e);
            }

        };

        searchProducts();
    }, [searchTerm]);

    setInterval(async () => {
        getWeather();
    }, 1000 * 60 * 5);


    return (
        <div className="main-bg min-h-screen flex flex-col text-black">

            {/* Navbar */}
            <Navbar />

            {/* Content Area */}
            <main className="flex-1 flex flex-col px-4 py-6 gap-6">

                {/* Search Bar */}
                <div className="relative w-full max-w-2xl mx-auto">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="obj-bg w-full px-4 py-3 rounded-md border border-purple-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <IoSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none" />
                </div>

                {/* Products Grid */}
                <div className="flex-1 overflow-y-auto">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {products.map((p) => (
                            <Product
                                key={p.id}
                                productId={p.id}
                                pName={p.name}
                                pPrice={p.price}
                                pImage={p.image}
                                pDescription={p.description}
                                pRatings={p.ratings}
                                pStock={p.noOfReview}
                            />
                        ))}
                    </div>
                </div>

            </main>

            {/* Footer */}
            <Footer />

        </div>
    );
}

export default Search