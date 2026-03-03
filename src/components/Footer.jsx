import React from 'react'
import { useNavigate } from 'react-router-dom';
import Cart from '../pages/Cart';

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer className="main-bg border-t border-gray-200 px-4 py-3 text-black">
            <div className="flex items-center justify-between gap-4">

                <button
                    className="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors whitespace-nowrap"
                    onClick={() => navigate('/cart')}
                >
                    🛒 Cart
                </button>

                <div className="flex items-center gap-4">
                    <button
                        className="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors whitespace-nowrap"
                        onClick={() => navigate('/search')}
                    >
                        Search
                    </button>

                    <button
                        className="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors whitespace-nowrap"
                        onClick={() => navigate('/getmyorders')}
                    >
                        Orders
                    </button>
                </div>

            </div>
        </footer>
    );
}

export default Footer