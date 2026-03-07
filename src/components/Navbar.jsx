import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const Navbar = () => {

    const user = useSelector((state) => state.user.user);

    const navigate = useNavigate();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-5 sm:px-10 py-4 
                  bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm
                  flex items-center justify-between transition-all duration-300">

            {/* Logo Section */}
            <div
                className="flex items-center gap-2 group cursor-pointer"
                onClick={() => navigate('/')}
            >
                <div className="bg-blue-600 p-2 rounded-xl shadow-md shadow-blue-200 group-hover:rotate-12 transition-transform duration-300">
                    <span className="text-xl">🛍️</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                    Quick<span className="text-blue-600">Mart</span>
                </h1>
            </div>

            {/* Actions Section */}
            <div className="flex items-center gap-3">

                {/* Home Link - Hidden on Mobile (hidden), Visible on Tablet+ (sm:flex) */}
                <button
                    className="group relative flex items-center gap-1.5 px-3 py-1 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
                    onClick={() => navigate('/')}
                >
                    <span>HOME</span>
                    {/* Animated Underline */}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </button>

                {user ? (
                    <div className="flex items-center gap-3 sm:pl-4 sm:border-l sm:border-gray-200">
                        <button
                            onClick={() => navigate('/profile')}
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex hover:scale-110 items-center justify-center text-xs font-bold text-white shadow-md">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        </button>
                    </div>
                ) : (
                    <button
                        className="px-6 py-2.5 rounded-full text-sm font-bold bg-slate-900 hover:bg-blue-600 text-white shadow-lg shadow-slate-200 transition-all duration-300 active:scale-95"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar