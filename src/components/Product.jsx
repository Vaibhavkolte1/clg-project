import { useNavigate } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa";
import { useState } from "react";

const Product = ({ product }) => {

    const { id, name, price, image, stock, ratings } = product;

    const [imgError, setImgError] = useState(false);

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/productpage/${id}`);
    };

    return (
        <div
            className="group relative flex flex-col bg-white rounded-2xl overflow-hidden 
      shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] 
      hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] 
      transition-all duration-300 cursor-pointer border border-gray-100"
            onClick={handleClick}
        >

            {/* Image Section */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                {!imgError ? (
                    <img
                        src={image}
                        alt={name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <FaBoxOpen className="text-4xl text-gray-300" />
                    </div>
                )}

                {/* Price Badge */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm">
                    <span className="text-lg font-bold text-blue-600">
                        ₹{price}
                    </span>
                </div>
            </div>

            {/* Info Section */}
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-tight mb-1">
                    Premium Collection
                </h3>

                <h2 className="text-base font-semibold text-gray-800 line-clamp-2 leading-tight group-hover:text-blue-500 transition-colors">
                    {name}
                </h2>

                {/* Ratings / Stock */}
                <div className="mt-auto pt-3 flex items-center justify-between border-t border-gray-50">

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${stock > 0
                            ? "text-green-600 bg-green-50"
                            : "text-red-600 bg-red-50"
                        }`}>
                        {stock > 0 ? "IN STOCK" : "OUT OF STOCK"}
                    </span>

                    <div className="flex items-center text-yellow-400 text-xs">
                        ★ <span className="text-gray-500 ml-1">{ratings || "4.5"}</span>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Product;