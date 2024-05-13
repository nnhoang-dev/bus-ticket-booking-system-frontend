/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { API_URL } from '../../configs/env';

function LoginPageAdmin(props) {
	const navigate = useNavigate();
	const [phone_number, setPhoneNumber] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		const token = sessionStorage.getItem('token');
		if (token) {
			axios
				.get(API_URL + 'employee/thong-tin-ca-nhan', { headers: { Authorization: `Bearer ${token}` } })
				.then((res) => {
					if (res.status === 200) {
						navigate('home');
					}
				})
				.catch((error) => {});
		}
	}, []);

	const submitLogin = async () => {
		const data = {
			phone_number,
			password,
		};
		await axios
			.post(API_URL + 'employee/dang-nhap', data)
			.then((res) => {
				if (res.status === 200) {
					sessionStorage.setItem('token', res.data.token);
					navigate('home');
				}
			})
			.catch((err) => {
				alert('Mật khẩu hoặc tài khoản không chính xác');
			});
	};

	return (
		<div className="text-white h-[100vh] flex flex-row justify-center items-center bg-center bg-cover bg-[url('https://images.unsplash.com/photo-1557223563-8db8e5e7d90b?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
			<div className="basis-10/12 sm:basis-8/12 md:basis-6/12 lg:basis-5/12 xl:basis-4/12 2xl:basis-3/12 mb-40">
				<div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
					<h1 className="text-4xl text-white font-bold text-center mb-2">Đăng nhập</h1>
					<h2 className="text-xl text-white  text-center mb-4">Nhân viên</h2>

					<div>
						<div className="relative mb-8">
							<input
								type="text"
								className="block w-full py-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
								placeholder=""
								autoComplete="off"
								onChange={(e) => setPhoneNumber(e.target.value)}
							/>
							<label
								htmlFor=""
								className="absolute text-md text-white duration-300 tranform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
							>
								Nhập số điện thoại
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
						<div className="relative mb-8">
							<input
								type="password"
								className="block w-full py-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
								placeholder=""
								onChange={(e) => setPassword(e.target.value)}
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
								Nhập mật khẩu
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
						<div className="flex justify-between items-center">
							<div className="flex gap-2 items-center">
								<input
									type="checkbox"
									name=""
									id=""
								/>
								<label htmlFor="">Ghi nhớ tài khoản</label>
							</div>
							<span className="text-cyan-300">
								<NavLink href="/quen-mat-khau">Quên mật khẩu</NavLink>
							</span>
						</div>
						<button
							type="submit"
							className="transition-colors duration-300 w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-black hover:bg-cyan-500 hover:text-white py-2"
							onClick={submitLogin}
						>
							Đăng nhập
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginPageAdmin;
