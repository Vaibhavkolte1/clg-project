import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Product from '../components/Product';
import api from '../api/axios';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/product/get-all');
        console.log(res.data);
        setProducts(res.data);
      } catch (e) {
        console.log("error in product fetch: ", e);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="main-bg flex flex-col h-screen text-white relative">
      <Navbar className="absolute top-0 left-0 right-0 z-10" />
      <div className="flex-1">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 h-[80vh] overflow-y-auto sm:p-4">
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
      <Footer className="absolute bottom-0 w-full" />
    </div>
  );
};

export default Home;