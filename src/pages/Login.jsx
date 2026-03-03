import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "../features/userSlice";

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.user);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		// ✅ Basic validation
		if (!email || !password) {
			setErrorMsg('Email and password are required');
			return;
		}

		try {
			const res = await api.post(
				'/auth/login',
				{ email, password },
				{ withCredentials: true } // ensures cookie is set
			);

			console.log('Login success:', res.data);
			dispatch(setUser({ user: res.data, token: "fakeToken" }));

			// Clear fields
			setEmail('');
			setPassword('');
			setErrorMsg('');

			// Redirect after login
			navigate('/');
		} catch (err) {
			console.error('Login error:', err);
			if (err.response) {
				setErrorMsg(err.response.data || 'Login failed');
			} else {
				setErrorMsg('Network or server error');
			}
		}
	};

	return (
		<div className="main-bg text-black min-h-screen flex items-center justify-center">
			<div className="obj-bg p-8 rounded-lg shadow-lg w-full m-2 max-w-md">
				<h1 className="text-2xl font-bold mb-4">Login Page</h1>
				{errorMsg && <p className="text-red-500 mb-2">{errorMsg}</p>}
				<form onSubmit={handleSubmit}>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full p-2 mb-4 border border-gray-600 rounded"
					/>

					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full p-2 mb-4 border border-gray-600 rounded"
					/>

					<div className="flex justify-between items-center mb-4">
						<a
							href="http://localhost:5173/register"
							className="text-blue-500 hover:underline"
						>
							Create one
						</a>
					</div>

					<button
						type="submit"
						className="w-full bg-blue-600 hover:bg-blue-700 hover:text-white py-2 px-4 rounded"
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;