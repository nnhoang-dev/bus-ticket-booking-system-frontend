/** @format */

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckFailure } from '../svg/svg';

function ResultBookingPage(props) {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const [status, setStatus] = useState();
	useEffect(() => {
		if (searchParams.get('status')) {
			setStatus(searchParams.get('status'));
		} else {
			navigate('/');
		}
	});

	return (
		<div className="my-44 max-w-screen-lg flex flex-col  justify-center items-center md:mx-auto gap-y-5 mx-auto">
			{status === 'success' ? (
				<>
					<img
						src="https://futabus.vn/images/icons/check_success.svg"
						alt="check-success"
					/>
					<h3 className="text-2xl font-semibold">Mua vé xe thành công</h3>
				</>
			) : status === 'failure' ? (
				<>
					<CheckFailure />
					<h3 className="text-2xl font-semibold">Mua vé xe thất bại</h3>
				</>
			) : (
				navigate('/')
			)}

			<button
				className="font-semibold text-white hover:bg-red-600 transition-all mx-auto border border-transparent bg-red-500 px-10 py-3 rounded-full"
				onClick={() => navigate('/')}
			>
				Trở về trang chủ
			</button>
		</div>
	);
}

export default ResultBookingPage;
