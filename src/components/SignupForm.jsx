/** @format */

import React, { useState } from 'react';
import { API_URL, REACT_URL } from '../configs/env';
import axios from 'axios';

function SignupForm(props) {
	const [last_name, setLastName] = useState('');
	const [first_name, setFirstName] = useState('');
	const [phone_number, setPhoneNumber] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password_confirmation, setPasswordConfirmation] = useState('');

	const signupBtn = async () => {
		const data = {
			last_name,
			first_name,
			phone_number,
			email,
			password,
			password_confirmation,
		};
		await axios
			.post(API_URL + 'customer/register', data)
			.then((res) => {
				if (res.status === 201) {
					window.location.href = REACT_URL + 'xac-thuc-email?id=' + res.data.id;
				}
			})
			.catch((err) => {
				alert(err.response.data.message);
			});
	};

	return (
		<div className="basis-10/12 sm:basis-8/12 md:basis-6/12 lg:basis-5/12 xl:basis-4/12 2xl:basis-3/12 mb-40">
			<div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
				<h1 className="text-4xl text-white font-bold text-center mb-10">Đăng ký tài khoản</h1>
				<div>
					<div className="relative mb-8 flex flex-row gap-x-5">
						<div className="basis-1/2">
							<input
								type="text"
								className="block w-full py-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
								placeholder=""
								onChange={(e) => setLastName(e.target.value)}
								value={last_name}
							/>
							<label
								htmlFor=""
								className="absolute text-md text-white duration-300 tranform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
							>
								Họ
							</label>
						</div>
						<div className="basis-1/2">
							<input
								type="text"
								className="block w-full py-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
								placeholder=""
								onChange={(e) => setFirstName(e.target.value)}
								value={first_name}
							/>
							<label
								htmlFor=""
								className="absolute text-md text-white duration-300 tranform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-50 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
							>
								Tên
							</label>
						</div>
					</div>
					<div className="relative mb-8">
						<input
							type="text"
							className="block w-full py-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
							placeholder=""
							onChange={(e) => setPhoneNumber(e.target.value)}
							value={phone_number}
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
							type="text"
							className="block w-full py-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
							placeholder=""
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
						<label
							htmlFor=""
							className="absolute text-md text-white duration-300 tranform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
						>
							Nhập email xác thực
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
									d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
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
							value={password}
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
					<div className="relative mb-5">
						<input
							type="password"
							className="block w-full py-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
							placeholder=""
							onChange={(e) => setPasswordConfirmation(e.target.value)}
							value={password_confirmation}
							onKeyDown={(event) => {
								if (event.key === 'Enter') {
									signupBtn();
								}
							}}
						/>
						<label
							htmlFor=""
							className="absolute text-md text-white duration-300 tranform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
						>
							Nhập lại mật khẩu
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
					<button
						type="submit"
						className="transition-colors duration-300 w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-black hover:bg-cyan-500 hover:text-white py-2"
						onClick={signupBtn}
					>
						Đăng ký
					</button>
					<div>
						<span className="m-4">
							Đã có tài khoản?{' '}
							<a
								href="/dang-nhap"
								className="text-cyan-300"
							>
								Đăng nhập
							</a>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SignupForm;
