/** @format */

import React, { useState, useEffect } from 'react';
import { API_URL, REACT_URL } from '../configs/env';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import SuccessNotification from './Noti/SuccessNotification';
import FailureNotification from './Noti/FailureNotification';
import HomePromotion from './HomePromotion';

function EmailVerificationForm() {
	const [searchParams, setSearchParams] = useSearchParams();

	// ID customer
	let customer_id = searchParams.get('id');

	// Modal
	const [successModal, setSuccessModal] = useState(false);
	const [failureModal, setFailureModal] = useState(false);
	const [message, setMessage] = useState('');

	// Input
	const [otp, setOtp] = useState('');

	// Time to resend OTP
	const [second, setSecond] = useState(15);
	useEffect(() => {
		if (!customer_id) {
			window.location.href = REACT_URL + 'dang-ky';
		}
		const interval = setInterval(() => {
			if (second > 0) {
				setSecond(second - 1);
			} else {
				clearInterval(interval);
			}
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [second]);

	// Sent POST request to confirm email
	const confirmEmailBtn = async () => {
		const data = {
			customer_id,
			otp,
		};

		await axios
			.post(API_URL + 'customer/confirm-email', data)
			.then((res) => {
				if (res.status === 200) {
					setMessage('Bạn đã đăng ký tài khoản thành công');
					openSuccessModal();
					window.location.href = REACT_URL + 'login';
				}
			})
			.catch((err) => {
				setMessage('Mã OTP của bạn không đúng hoặc đã hết hạn');
				openFailureModal();
			});
	};

	// Sent POST request to resend OTP
	const resendOTP = async (e) => {
		const data = {
			customer_id,
		};

		setSecond(59);
		await axios.post(API_URL + 'customer/resend-confirm-email', data).then((res) => {});
	};

	// Close Success Modal
	const closeSuccessModal = () => {
		setSuccessModal(false);
	};

	// Open Success Modal
	const openSuccessModal = () => {
		setSuccessModal(true);
	};
	// Close Failure Modal
	const closeFailureModal = () => {
		setFailureModal(false);
	};

	// Open Failure Modal
	const openFailureModal = () => {
		setFailureModal(true);
	};

	return (
		<div className="max-w-screen-lg mx-auto mb-20">
			<div className="w-full -mx-4 border-red-200 border-4 rounded-xl p-8 shadow-xl flex justify-center items-center">
				<div className="basis-5/12 mx-4">
					<div className="mb-10">
						<h1 className="text-4xl font-bold text-center mb-3">Xác thực email</h1>
						<p className="text-center">
							Mã xác thực đã được gửi đến email. Bạn vui lòng kiểm tra và nhập mã vào ô dưới đây.
						</p>
					</div>
					<div>
						<div className="relative mb-2">
							<input
								type="text"
								className="block w-full py-2 px-0 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:ring-0  focus:border-red-600"
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
								className="absolute text-md duration-300 tranform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
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
						{second > 0 ? (
							<div className="text-left">Gửi lại mã sau: {second < 10 ? '0' + second : second}</div>
						) : (
							<div
								className="text-end text-blue-500 cursor-pointer"
								onClick={resendOTP}
							>
								Gửi lại mã xác thực
							</div>
						)}
						<button
							type="submit"
							className="transition-colors duration-300 w-full mb-4 text-[18px] mt-6 rounded-full bg-red-500 text-white hover:bg-red-600 hover py-2"
							onClick={confirmEmailBtn}
						>
							Xác nhận
						</button>
					</div>
				</div>
				{successModal && (
					<SuccessNotification
						func={{ closeModal: closeSuccessModal }}
						message={message}
					/>
				)}
				{failureModal && (
					<FailureNotification
						func={{ closeModal: closeFailureModal }}
						message={message}
					/>
				)}
				<div className="flex-grow mx-4">
					<img
						alt=""
						loading="lazy"
						decoding="async"
						data-nimg="fill"
						className="transition-all duration-200 relative hidden object-contain sm:block h-full w-full transparent"
						src="https://storage.googleapis.com/futa-busline-cms-dev/image_f922bef1bb/image_f922bef1bb.svg"
					></img>
					{/* <div className="w-full h-full rounded-xl bg-orange-200"></div> */}
				</div>
			</div>
			<HomePromotion />
		</div>
	);
}

export default EmailVerificationForm;
