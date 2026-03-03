import { useNavigate } from 'react-router-dom'
import { FaBoxOpen } from "react-icons/fa";
import { useState } from 'react';

const Product = ({ productId, pName, pPrice, pImage }) => {
    const [imgError, setImgError] = useState(false);

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/productpage/${productId}`);
    }

    return (
        <div
            className="flex flex-col m-3 w-44 sm:w-56 shrink-0"
            onClick={handleClick}
        >
            <div className="bg-white border border-gray-200
                        rounded-xl
                        shadow-sm hover:shadow-md
                        transition-all duration-200
                        overflow-hidden
                        cursor-pointer">

                
                {!imgError ? (
                    <img
                        src={pImage }
                        alt="product"
                        className="w-full h-40 object-cover"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <FaBoxOpen className="w-full h-40 text-5xl text-gray-400" />
                )}

                <div className="p-4">
                    <h2 className="text-sm font-semibold text-gray-800 truncate">
                        {pName}
                    </h2>

                    <p className="mt-2 text-base font-bold text-gray-900">
                        ${pPrice}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Product