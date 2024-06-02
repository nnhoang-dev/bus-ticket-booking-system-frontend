/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../configs/env';

function LoginPageAdmin() {
	const navigate = useNavigate();

	// Notification
	const [message, setMessage] = useState('');

	// Input
	const [phone_number, setPhoneNumber] = useState('');
	const [password, setPassword] = useState('');

	// Check logged in
	useEffect(() => {
		const token = sessionStorage.getItem('token');
		if (token) {
			axios
				.get(API_URL + 'employee/me', { headers: { Authorization: `Bearer ${token}` } })
				.then((res) => {
					if (res.status === 200) {
						navigate('home');
					}
				})
				.catch((error) => {});
		}
	}, []);

	// Send POST request to login
	const submitLogin = async () => {
		const data = {
			phone_number,
			password,
		};
		await axios
			.post(API_URL + 'employee/login', data)
			.then((res) => {
				if (res.status === 200) {
					sessionStorage.setItem('token', res.data.token);
					navigate('home');
				}
			})
			.catch((err) => {
				setMessage('Incorrect password or username');
			});
	};

	return (
		<div className="text-white h-[100vh] flex flex-row justify-center items-center bg-center bg-cover bg-[url('https://images.unsplash.com/photo-1557223563-8db8e5e7d90b?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
			<div className="basis-10/12 sm:basis-8/12 md:basis-6/12 lg:basis-5/12 xl:basis-4/12 2xl:basis-3/12 mb-40">
				<div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
					<h1 className="text-4xl text-white font-bold text-center mb-2">LOGIN</h1>
					<h2 className="text-md text-white text-center mb-4">EMPLOYEE</h2>

					<div>
						<div className="relative mb-8">
							<input
								type="text"
								className="block w-full py-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
								placeholder=""
								autoComplete="off"
								onChange={(e) => {
									setPhoneNumber(e.target.value);
									setMessage('');
								}}
							/>
							<label
								htmlFor=""
								className="absolute text-md text-white duration-300 tranform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
							>
								Number Phone
							</label>
							<span className="absolute top-1 right-1 ">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
									/>
								</svg>
							</span>
						</div>
						<div className="relative mb-2">
							<input
								type="password"
								className="block w-full py-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none peer focus:outline-none focus:ring-0"
								placeholder=""
								onChange={(e) => {
									setPassword(e.target.value);
									setMessage('');
								}}
								onKeyDown={(event) => {
									if (event.key === 'Enter') {
										submitLogin();
									}
								}}
							/>
							<label
								htmlFor=""
								className="absolute text-md text-white duration-300 tranform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
							>
								Password
							</label>
							<span className="absolute top-1 right-1 ">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
									/>
								</svg>
							</span>
						</div>
						{message && <div className="text-red-700 mt-2 text-sm font-medium">{message}</div>}

						<button
							type="submit"
							className="transition-colors duration-300 w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-black hover:bg-cyan-500 hover:text-white py-2"
							onClick={submitLogin}
						>
							Login
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginPageAdmin;
