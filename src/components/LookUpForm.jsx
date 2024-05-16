/** @format */

import React, { useState } from 'react';
import LookUpResult from './LookUpResult';
import axios from 'axios';
import { API_URL } from '../configs/env';

function LookUpForm(props) {
	const [phone_number, setPhoneNumber] = useState('');
	const [ticket_id, setTicketId] = useState('');
	const [ticket, setTicket] = useState({});

	const getTicket = async () => {
		let params = {
			phone_number,
			ticket_id,
		};
		await axios
			.get(API_URL + 'customer/lookup-ticket', { params })
			.then((res) => {
				setTicket(res.data);
			})
			.catch((err) => {
				alert(err.response.data.message);
			});
	};
	return (
		<>
			<div className=" lookupform flex flex-col max-w-screen-xl my-10 mx-auto ">
				<h1 className="text-green-700 text-2xl text-center font-bold mb-5">TRA CỨU THÔNG TIN ĐẶT VÉ</h1>
				<hr className="max-w-screen-sm w-full mx-auto h-0.5 bg-gray-200" />
				<div className="max-w-screen-sm w-full flex flex-col gap-y-8 p-5 mx-auto mt-5">
					<input
						onChange={(e) => setPhoneNumber(e.target.value)}
						value={phone_number}
						type="text"
						className="border border-slate-400 rounded-xl"
						placeholder="Vui lòng nhập số điện thoại"
					/>
					<input
						onChange={(e) => setTicketId(e.target.value)}
						value={ticket_id}
						type="text"
						className="border border-slate-400 rounded-xl"
						placeholder="Vui lòng nhập mã vé"
						onKeyDown={(event) => {
							if (event.key === 'Enter') {
								getTicket();
							}
						}}
					/>
					<button
						className="font-semibold text-white hover:bg-red-600 transition-all mx-auto border border-transparent bg-red-500 px-10 py-3 rounded-full"
						onClick={getTicket}
					>
						Tra cứu vé
					</button>
				</div>
			</div>
			{ticket.id ? (
				<div className="flex flex-col max-w-screen-lg my-10 mx-auto ">
					<LookUpResult ticket={ticket} />
				</div>
			) : (
				<div className="h-40"></div>
			)}
		</>
	);
}

export default LookUpForm;
