/** @format */

import axios from 'axios';
import React, { useState } from 'react';
import { API_URL } from '../../configs/env';
import { useNavigate } from 'react-router-dom';
import WarningNotification from '../Noti/WarningNotification';
import SuccessNotification from '../Noti/SuccessNotification';
import FailureNotification from '../Noti/FailureNotification';
import ChangeTicketNotification from '../Noti/ChangeTicketNotification';

const TicketManagement = () => {
	const navigate = useNavigate();
	// Data
	const [trip, setTrip] = useState([]);

	// Modal
	const [deleteModal, setDeleteModal] = useState(false);
	const [successModal, setSuccessModal] = useState(false);
	const [failureModal, setFailureModal] = useState(false);
	const [changeTicketModal, setChangeTicketModal] = useState(false);
	const [message, setMessage] = useState('');
	const [tempId, setTempId] = useState('');
	const [changeTicketId, setChangeTicketId] = useState('');

	// Input
	const [ticket, setTicket] = useState({});
	const [phone_number, setPhoneNumber] = useState('');
	const [ticket_id, setTicketId] = useState('');

	// Send GET request to look up ticket
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
				if (err.response.status === 401) {
					navigate('/admin');
				} else {
					setMessage(err.response.data.message);
					openFailureModal();
				}
			});
	};

	// Send GET request to look up ticket by id
	const getTicketById = async () => {
		let params = {
			phone_number: ticket.phone_number,
			ticket_id: ticket.ticket_id,
		};
		await axios
			.get(API_URL + 'customer/lookup-ticket', { params })
			.then((res) => {
				setTicket(res.data);
			})
			.catch((err) => {
				if (err.response.status === 401) {
					navigate('/admin');
				} else {
					alert(err.response.data.message);
				}
			});
	};

	// Refresh page
	const refresh = () => {
		setTicket({});
		setPhoneNumber('');
		setTicketId('');
		setTrip([]);
	};

	// Send GET request to retrieve trips the same route
	const getTrip = async () => {
		let route_id = '';
		await axios
			.get(API_URL + `employee/trip/${ticket.trip_id}`)
			.then((res) => {
				route_id = res.data.trip.route_id;
			})
			.catch((err) => {
				if (err.response.status === 401) {
					navigate('/admin');
				} else {
					setMessage(err.response.data.message);
					openFailureModal();
				}
			});

		let params = {
			route_id,
		};
		await axios
			.get(API_URL + 'employee/get-trip-same-route', { params })
			.then((res) => {
				if (res.data.trip.length === 0) {
					setMessage('No buses found on the same route');
					openFailureModal();
				}
				let trips = res.data.trip.filter((v) => new Date() < new Date(v.date + 'T' + v.start_time));
				setTrip(trips);
			})
			.catch((err) => {
				if (err.response.status === 401) {
					navigate('/admin');
				} else {
					setMessage(err.response.data.message);
					openFailureModal();
				}
			});
	};

	// Send PUT request to change ticket
	const handleChangeTicket = async (id, seat) => {
		const token = sessionStorage.getItem('token');
		if (token) {
			if (seat == null || seat === '') {
				setMessage('Ticket exchange failed, please check the information again');
				openFailureModal();
				closeChangeTicketModal();
			} else {
				seat = parseInt(seat);
				if (seat) {
					let data = {
						trip_id: id,
						seat,
					};

					await axios
						.put(API_URL + `employee/chance-ticket/${ticket.id}`, data, {
							headers: { Authorization: `Bearer ${token}` },
						})
						.then((res) => {
							setMessage(res.data.message);
							openSuccessModal();
							closeChangeTicketModal();

							getTrip();
							getTicketById();
						})
						.catch((err) => {
							if (err.response.status === 401) {
								navigate('/admin');
							} else {
								setMessage(err.response.data.message);
								openFailureModal();
							}
						});
				} else {
					setMessage('Ticket exchange failed, please check the information again');
					openFailureModal();
					closeChangeTicketModal();
				}
			}
		} else {
			navigate('/admin');
		}
	};

	// Open change ticket modal
	const changeBtn = (id) => {
		setChangeTicketId(id);
		setChangeTicketModal(true);
	};

	// Open delete ticket modal
	const deleteTicket = () => {
		setTempId(ticket.id);
		setDeleteModal(true);
	};

	// Close delete modal
	const closeDeleteModal = () => {
		setDeleteModal(false);
		setTempId('');
	};

	// Close Success Modal
	const closeSuccessModal = () => {
		setSuccessModal(false);
	};

	// Close change ticket modal
	const closeChangeTicketModal = () => {
		setChangeTicketModal(false);
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
		<div className="w-full p-2">
			<h1 className="ml-16 lg:ml-0 h-14 font-bold text-2xl text-gray-700">Ticket Management</h1>
			<div className="w-full p-2 flex flex-col lg:flex-row -mx-1">
				<div className="basis-full lg:basis-4/12 -my-2 mx-1">
					<div className="basis-full my-2">
						<input
							onChange={(e) => setPhoneNumber(e.target.value)}
							value={phone_number}
							type="text"
							className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
							placeholder="Phone"
							required
						/>
					</div>
					<div className="basis-full my-2">
						<input
							onChange={(e) => setTicketId(e.target.value)}
							value={ticket_id}
							type="text"
							className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
							placeholder="Ticket ID"
							required
						/>
					</div>
					<div className="flex flex-wrap -m-1">
						<div className="basis-1/2 p-1">
							<button
								className=" text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
								onClick={getTicket}
							>
								View
							</button>
						</div>
						<div className="basis-1/2 p-1">
							<button
								className=" text-white bg-yellow-500 hover:bg-yellow-600 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
								onClick={refresh}
							>
								Refresh
							</button>
						</div>
					</div>
				</div>
				<div className="basis-8/12 mx-1 mt-10 lg:mt-0">
					{ticket.id && (
						<>
							<div className="text-sm w-full flex-col justify-center items-center mx-auto">
								<div className="bg-gray-100 w-full text-center p-3  text-lg font-semibold">
									Ticket Information
								</div>
								<div className="flex flex-col-reverse md:flex-row border border-slate-300">
									<div className="basis-5/12 flex flex-col justify-between flex-grow">
										<div className="p-5 ">
											<div className="flex flex-row mb-3">
												<div className="text-gray-500 font-medium basis-1/2">Name:</div>
												<div className="basis-1/2 text-end text-green-700 font-semibold">
													{ticket.last_name + ' ' + ticket.first_name}
												</div>
											</div>
											<div className="flex flex-row mb-3">
												<div className="text-gray-500 font-medium basis-1/2">Phone:</div>
												<div className="basis-1/2 text-end text-green-700 font-semibold">
													{ticket.phone_number}
												</div>
											</div>
											<div className="flex flex-row mb-3">
												<div className="text-gray-500 font-medium basis-1/2">Email:</div>
												<div className="basis-1/2 text-end text-green-700 font-semibold">
													{ticket.email}
												</div>
											</div>
											<div className="flex flex-row mb-3">
												<div className="text-gray-500 font-medium basis-1/2">Price:</div>
												<div className="basis-1/2 text-end text-green-700 font-semibold">
													{ticket.price}
												</div>
											</div>
											<div className="flex flex-row mb-3">
												<div className="text-gray-500 font-medium basis-1/2">PTTT:</div>
												<div className="basis-1/2 text-end text-green-700 font-semibold">
													VNPAY
												</div>
											</div>
										</div>
										<div className="flex">
											<div className="basis-1/2 p-1">
												<button
													className=" text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
													// className=" text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
													onClick={getTrip}
												>
													Trips
												</button>
											</div>
											<div className="basis-1/2 p-1">
												<button
													className=" text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
													onClick={deleteTicket}
												>
													Cancel
												</button>
											</div>
										</div>
									</div>

									<div className="basis-7/12 w-full border-b md:border-t-0 md:border-l border-slate-300  mx-auto flex flex-col">
										<div className="p-5">
											<div className="flex flex-row mb-3">
												<div className="text-gray-500 font-medium basis-1/2">Mã đặt vé:</div>
												<div className="basis-1/2 text-end text-green-700 font-semibold">
													{ticket.ticket_id}
												</div>
											</div>
											<div className="flex flex-row mb-3">
												<div className="text-gray-500 font-medium basis-1/2">Tuyến xe:</div>
												<div className="basis-1/2 text-end text-green-700 font-semibold">
													{ticket.route_name}
												</div>
											</div>
											<div className="flex flex-row mb-3">
												<div className="text-gray-500 font-medium basis-1/2">Thời gian đi:</div>
												<div className="basis-1/2 text-end text-green-700 font-semibold">
													{ticket.start_time} - {ticket.date}
												</div>
											</div>
											<div className="flex flex-row mb-3">
												<div className="text-gray-500 font-medium basis-1/2">Số ghế:</div>
												<div className="basis-1/2 text-end text-green-700 font-semibold">
													{ticket.seat}
												</div>
											</div>
											<div className="flex flex-row mb-3">
												<div className="text-gray-500 font-medium basis-1/2">Điểm lên xe:</div>
												<div className="basis-1/2 text-end text-green-700 font-semibold">
													{ticket.start_address}
												</div>
											</div>
											<div className="flex flex-row mb-3">
												<div className="text-gray-500 font-medium basis-1/2">
													Điểm xuống xe:
												</div>
												<div className="basis-1/2 text-end text-green-700 font-semibold">
													{ticket.end_address}
												</div>
											</div>
											<div className="flex flex-row mb-3">
												<div className="text-gray-500 font-medium basis-1/2">Giá vé:</div>
												<div className="basis-1/2 text-end text-green-700 font-semibold">
													{ticket.price}
												</div>
											</div>
											<div className="flex flex-row mb-3">
												<div className="text-gray-500 font-medium basis-1/2">Biển số xe:</div>
												<div className="basis-1/2 text-end text-green-700 font-semibold">
													{ticket.license}
												</div>
											</div>
										</div>
									</div>
									{/* <div className="mx-auto flex flex-row justify-items-center w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%] 2xl:w-[30%] mb-20">
								<div className="basis-1/2">
									<p className="bg-orange-500 w-[95%] text-center text-white rounded-full px-5 py-2 hover:bg-orange-600 cursor-pointer flex flex-row items-center">
										<div className="basis-1/4">
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
													d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
												/>
											</svg>
										</div>
										<div className="basis-3/4">Chia sẻ</div>
									</p>
								</div>
								<div className="basis-1/2">
									<p className="bg-orange-500 w-[95%] text-center text-white rounded-full px-5 py-2 hover:bg-orange-600 cursor-pointer flex flex-row items-center">
										<div className="basis-1/4">
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
													d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
												/>
											</svg>
										</div>
										<div className="basis-3/4">Tải về</div>
									</p>
								</div>
							</div> */}
								</div>
							</div>
						</>
					)}
				</div>
			</div>
			<div className="overflow-x-auto mx-2">
				{trip.length > 0 && (
					<table className="w-full text-sm text-left  text-gray-500 ">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50">
							<tr>
								<th
									scope="col"
									className="px-2 py-3"
								>
									Route
								</th>
								<th
									scope="col"
									className="px-2 py-3"
								>
									Seat
								</th>
								<th
									scope="col"
									className="px-2 py-3"
								>
									Time
								</th>
								<th
									scope="col"
									className="px-2 py-3"
								>
									Date
								</th>
								<th
									scope="col"
									className="px-2 py-3"
								>
									Journey
								</th>
								<th
									scope="col"
									className="px-2 py-3"
								>
									Price
								</th>
								<th
									scope="col"
									className="px-2 py-3"
								>
									Bus
								</th>
								<th
									scope="col"
									className="px-2 py-3"
								>
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{trip.length !== 0 &&
								trip.map((v, i) => (
									<tr
										key={i}
										className="odd:bg-white even:bg-gray-50 border-b "
									>
										<th
											scope="row"
											className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap"
										>
											{v.route.name}
										</th>
										<td className="px-2 py-4">{v.seat}</td>
										<td className="px-2 py-4">{v.start_time + '-' + v.end_time}</td>
										<td className="px-2 py-4">{v.date}</td>
										<td className="px-2 py-4">
											{v.route.start_address.name + ' - ' + v.route.end_address.name}
										</td>
										<td className="px-2 py-4">{v.price}</td>
										<td className="px-2 py-4">{v.bus.license}</td>
										<td className="px-2 py-4">
											<button
												onClick={() => changeBtn(v.id)}
												className="font-medium text-blue-500 hover:underline"
											>
												Change
											</button>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				)}
			</div>
			{deleteModal && (
				<WarningNotification
					id={tempId}
					func={{
						refresh: refresh,
						closeModal: closeDeleteModal,
						openSuccessModal,
						openFailureModal,
						setMessage,
					}}
					action={'cancel-ticket'}
					type={'ticket'}
				/>
			)}
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
			{changeTicketModal && (
				<ChangeTicketNotification
					id={changeTicketId}
					func={{ closeModal: closeChangeTicketModal, handleChangeTicket }}
				/>
			)}
		</div>
	);
};

export default TicketManagement;
