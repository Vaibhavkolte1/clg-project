import { useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaBox } from "react-icons/fa";

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-gray-100 shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
            <div className="max-w-lg mx-auto flex items-center justify-around px-2 py-3">

                {/* Nav Item: Search */}
                <button
                    onClick={() => navigate('/search')}
                    className="flex flex-col items-center gap-1.5 px-4 py-1 rounded-2xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 active:scale-90"
                >
                    <FaSearch className="text-xl" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Search</span>
                </button>

                {/* Nav Item: Cart */}
                <button
                    onClick={() => navigate('/cart')}
                    className="relative flex flex-col items-center gap-1.5 px-4 py-1 rounded-2xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 active:scale-90"
                >
                    <div className="relative">
                        <FaShoppingCart className="text-xl" />
                        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                            !
                        </span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Cart</span>
                </button>

                {/* Nav Item: Orders */}
                <button
                    onClick={() => navigate('/getmyorders')}
                    className="flex flex-col items-center gap-1.5 px-4 py-1 rounded-2xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 active:scale-90"
                >
                    <FaBox className="text-xl" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Orders</span>
                </button>

            </div>
        </footer>
    );
}

export default Footer