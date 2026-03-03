import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import Toast from '../components/Toast';

const ProductPage = () => {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [refresh, setRefresh] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await api.get(`/product/get/${productId}`);
        console.log("Fetched product:", res.data);
        setProduct(res.data);
      } catch (e) {
        console.log("Error fetching product:", e);
      }
    };

    getProduct();
  }, [refresh, productId]);

  const handleClick = async () => {
    if (!product) return;
    try {
      const res = await api.post('/cart/add-item', { productId: product.id, quantity });
      console.log(res.data);
      setToast({ type: 'success', message: 'Product added to cart successfully!' });

      setRefresh(!refresh);
    } catch (e) {
      console.log("Error adding to cart:", e);
    }
  };

  const handleReview = async () => {
    if (!product) return;
    console.log("Submitting rating:", { id: product.id, ratings: rating });
    try {
      const res = await api.patch('/rating', { id: product.id, ratings: rating });
      console.log(res.data);
      setToast({ type: 'success', message: 'Product rated successfully!' });
      setRefresh(!refresh);
    } catch (e) {
      console.log("Error reviewing product:", e);
    }
  };


  if (!product) return <p className="text-black text-center mt-20">Loading product...</p>;

  return (
    <div className="main-bg min-h-screen flex flex-col text-white">
      <Navbar />

      <div className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="obj-bg text-black w-full max-w-lg rounded-xl shadow-md p-6 flex flex-col gap-5">

          {/* Product Image */}
          <img
            src={product.image || "/fallback-image.png"}
            alt="Product"
            className="w-full h-72 sm:h-80 object-cover rounded-lg"
          />

          {/* Name + Price */}
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {product.name}
            </h2>
            <p className="text-lg font-semibold text-green-600 whitespace-nowrap">
              ${product.price}
            </p>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center border rounded-md overflow-hidden">
              <button
                className="px-3 py-2 hover:bg-gray-200 transition"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                −
              </button>
              <span className="px-4">{quantity}</span>
              <button
                className="px-3 py-2 hover:bg-gray-200 transition"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>

            <button
              className="flex-1 px-4 py-2 rounded-md bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
              onClick={handleClick}
            >
              Add to Cart
            </button>
          </div>

          {/* Description */}
          <div>
            <p className="font-semibold mb-1">Description</p>
            <p className="text-sm text-gray-700">
              {product.description}
            </p>
          </div>

          {/* Product Meta */}
          <div className="grid grid-cols-2 text-sm gap-4">
            <div>
              <p className="font-semibold">Stock</p>
              <p>{product.stock}</p>
            </div>
            <div>
              <p className="font-semibold">sold</p>
              <p>{product.sold}</p>
            </div>
            <div>
              <p className="font-semibold">Reviews</p>
              <p>{product.noOfReview}</p>
            </div>
            <div>
              <p className="font-semibold">Rating</p>
              <p>{product.ratings} / 5 ⭐</p>
            </div>
          </div>

          {/* Rating Section */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`text-xl transition ${star <= rating ? "text-yellow-500" : "text-gray-300"
                    } hover:scale-110`}
                  onClick={() => setRating(star)}
                >
                  ⭐
                </button>
              ))}
              <span className="text-sm">({rating})</span>
            </div>

            <button
              className="w-full px-4 py-2 rounded-md bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
              onClick={handleReview}
            >
              Submit Rating
            </button>
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
    </div>
  );
};

export default ProductPage;