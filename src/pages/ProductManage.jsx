import React, { useEffect, useState } from 'react'
import ProductHandleSeller from '../components/ProductHandleSeller'
import Navbar from '../components/Navbar'
import api from '../api/axios'

const ProductManage = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        api.get('/seller/my-products')
            .then(res => setProducts(res.data))
            .catch(e => console.log("error when get products: ", e))

    }, [])

    return (
        <div>
            <div>
                <Navbar />
                <h4 className="pt-24 text-lg font-semibold">Your Products</h4>
                <div>
                    {products.map(product => (
                        <ProductHandleSeller
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            image={product.image}
                            price={product.price}
                            stock={product.stock}
                            sold={product.sold}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductManage