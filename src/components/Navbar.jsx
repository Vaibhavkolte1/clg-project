import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const Navbar = () => {

    const user = useSelector((state) => state.user.user);

    const navigate = useNavigate();

    return (
        <nav className="main-bg bg-black border-b border-gray-200 px-6 py-3 flex items-center justify-between text-black">

            {/* Logo */}
            <h1
                className="text-xl sm:text-2xl font-bold text-yellow-400 flex items-center gap-2 cursor-pointer"
                onClick={() => navigate('/')}
            >
                🛍️ <span>QuickMart</span>
                <span className="hidden sm:inline">🛒</span>
            </h1>

            {/* Right Section */}
            {user ? (
                <div className="flex items-center gap-3">

                    <button
                        className="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
                        onClick={() => navigate('/')}
                    >
                        Home
                    </button>

                    <button
                        className="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
                        onClick={() => navigate('/profile')}
                    >
                        <span className="hidden sm:inline">👤</span>
                        <span className="truncate max-w-[120px]">{user.name.split(" ")[0]}</span>
                    </button>

                </div>
            ) : (
                <button
                    className="px-4 py-2 rounded-md text-sm font-semibold bg-purple-600 hover:bg-purple-700 transition-colors"
                    onClick={() => navigate('/login')}
                >
                    Login
                </button>
            )}

        </nav>
    );
}

export default Navbar