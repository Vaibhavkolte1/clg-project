import { useEffect, useState } from 'react'
import React from 'react'
import Navbar from '../components/Navbar'
import api from '../api/axios'
import ProductHandleAdmin from '../components/ProductHandleAdmin'
import UsersHandleAdmin from '../components/UsersHandleAdmin'

const AdminPanel = () => {
    const [users, setUsers] = useState([])
    const [products, setProducts] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        api.get('/admin/users')
            .then(res => {setUsers(res.data), console.log("users: ", res.data)})
            .catch(e => console.log("error when get users: ", e))

        api.get('/admin/products')
            .then(res => setProducts(res.data))
            .catch(e => console.log("error when get products: ", e))

    }, [refresh])

    return (
        <div className="main-bg min-h-screen text-black w-full">
            <Navbar />
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Admin Panel</h1>

                <div className='grid md:grid-cols-2 m-2 space-x-4'>
                    <div>
                        <h4 className="text-lg font-semibold w-full">Users</h4>
                        <div className='space-y-4'>
                            {users.map(user => (
                                <UsersHandleAdmin
                                    key={user.id}
                                    id={user.id}
                                    name={user.name}
                                    role={user.role}
                                    active={user.active}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold">Products</h4>
                        <div className='space-y-4'>
                            {products.map(product => (
                                <ProductHandleAdmin
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    image={product.image}
                                    price={product.price}
                                    stock={product.stock}
                                    sold={product.sold}
                                    setRefresh={setRefresh}
                                />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AdminPanel