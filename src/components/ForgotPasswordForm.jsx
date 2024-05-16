/** @format */

import axios from 'axios';
import React, { useState } from 'react';
import { API_URL } from '../configs/env';
import { useNavigate } from 'react-router-dom';

function ForgotPasswordForm(props) {
	const navigate = useNavigate();
	const [account, setAccount] = useState('');

	const handleForgotPassword = () => {
		axios
			.post(`${API_URL}customer/forgot-password`, {
				account: account,
			})
			.then((res) => {
				navigate(`/forgot-password/verify?id=${res.data.customer_id}`);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="basis-10/12 sm:basis-8/12 md:basis-6/12 lg:basis-5/12 xl:basis-4/12 2xl:basis-3/12 mb-40">
			<div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
				<div className="mb-10">
					<h1 className="text-4xl text-white font-bold text-center mb-3">Quên mật khẩu</h1>
					<p className="text-center">Vui lòng nhập thông tin của tài khoản bạn đã đăng ký</p>
				</div>
				<div action="">
					<div className="relative mb-8">
						<input
							type="text"
							className="block w-full py-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
							placeholder=""
							onChange={(e) => setAccount(e.target.value)}
							value={account}
							onKeyDown={(event) => {
								if (event.key === 'Enter') {
									handleForgotPassword();
								}
							}}
						/>
						<label
							htmlFor=""
							className="absolute text-md text-white duration-300 tranform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
						>
							Nhập số điện thoại hoặc email
						</label>
					</div>

					<button
						type="button"
						className="transition-colors duration-300 w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-black hover:bg-cyan-500 hover:text-white py-2"
						onClick={handleForgotPassword}
					>
						Quên mật khẩu
					</button>
				</div>
			</div>
		</div>
	);
}

export default ForgotPasswordForm;
