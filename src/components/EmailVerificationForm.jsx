/** @format */

import React, { useState } from 'react';
import { API_URL, REACT_URL } from '../configs/env';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

function EmailVerificationForm(props) {
	const [otp, setOtp] = useState('');
	const [searchParams, setSearchParams] = useSearchParams();

	let khach_hang_id = searchParams.get('id');

	if (!khach_hang_id) {
		window.location.href = REACT_URL + 'dang-ky';
	}

	const confirmEmailBtn = async () => {
		const data = {
			khach_hang_id,
			otp,
		};

		await axios
			.post(API_URL + 'khach-hang/xac-thuc-email', data)
			.then((res) => {
				if (res.status === 200) {
					alert('Bạn đã đăng ký tài khoản thành công');
					window.location.href = REACT_URL + 'dang-nhap';
				}
			})
			.catch((err) => {
				alert('Mã OTP của bạn không đúng hoặc đã hết hạn');
			});
	};

	const resendOTP = async (e) => {
		const data = {
			khach_hang_id,
		};

		await axios.post(API_URL + 'khach-hang/gui-lai-ma-xac-thuc-email', data).then((res) => {
			alert('Mã OTP đã được gửi đến địa chỉ email của bạn');
		});
	};

	return (
		<div className="basis-10/12 sm:basis-8/12 md:basis-6/12 lg:basis-5/12 xl:basis-4/12 2xl:basis-3/12 mb-40">
			<div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
				<div className="mb-10">
					<h1 className="text-4xl text-white font-bold text-center mb-3">Xác thực email</h1>
					<p className="text-center">Mã xác thực đã được gửi đến email. Bạn vui lòng kiểm tra và nhập mã vào ô dưới đây.</p>
				</div>
				<div>
					<div className="relative mb-8">
						<input
							type="text"
							className="block w-full py-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
							placeholder=""
							onChange={(e) => setOtp(e.target.value)}
							value={otp}
							onKeyDown={(event) => {
								if (event.key === 'Enter') {
									confirmEmailBtn();
								}
							}}
						/>
						<label
							htmlFor=""
							className="absolute text-md text-white duration-300 tranform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
						>
							Nhập mã xác thực
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
					<div
						className="text-end text-cyan-300"
						onClick={resendOTP}
					>
						Gửi lại mã xác thực
					</div>
					<button
						type="submit"
						className="transition-colors duration-300 w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-black hover:bg-cyan-500 hover:text-white py-2"
						onClick={confirmEmailBtn}
					>
						Xác nhận
					</button>
				</div>
			</div>
		</div>
	);
}

export default EmailVerificationForm;
