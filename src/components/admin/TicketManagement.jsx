/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../configs/env';
import { useNavigate } from 'react-router-dom';

const TicketManagement = () => {
	const navigate = useNavigate();
	const [ticket, setTicket] = useState({});
	const [phone_number, setPhoneNumber] = useState('');
	const [ve_id, setVeId] = useState('');
	const [chuyenXe, setChuyenXe] = useState([]);

	useEffect(() => {}, []);

	const getTicket = async () => {
		const token = sessionStorage.getItem('token');
		if (token) {
			let params = {
				phone_number,
				ve_id,
			};
			await axios
				.get(API_URL + 'customer/tra-cuu-ve', { params })
				.then((res) => {
					setTicket(res.data);
				})
				.catch((err) => {
					alert(err.response.data.message);
				});
		} else {
			navigate('/admin');
		}
	};

	const getTicketById = async () => {
		const token = sessionStorage.getItem('token');
		if (token) {
			let params = {
				phone_number,
				ve_id,
			};
			await axios
				.get(API_URL + `employee/tra-cuu-ve/${ticket.id}`)
				.then((res) => {
					setTicket(res.data.veXe);
				})
				.catch((err) => {
					alert(err.response.data.message);
				});
		} else {
			navigate('/admin');
		}
	};
	const refesh = () => {
		setTicket({});
		setPhoneNumber('');
		setVeId('');
		setChuyenXe([]);
	};

	const fetchChuyenXe = async () => {
		const token = sessionStorage.getItem('token');
		if (token) {
			let tuyen_xe_id = '';
			await axios
				.get(API_URL + `trip/${ticket.chuyen_xe_id}`)
				.then((res) => {
					tuyen_xe_id = res.data.tuyen_xe_id;
				})
				.catch((err) => {
					alert(err.response.data.message);
				});

			let params = {
				tuyen_xe_id,
			};
			await axios
				.get(API_URL + 'trip-cung-tuyen', { params })
				.then((res) => {
					setChuyenXe(res.data.chuyenXe);
				})
				.catch((err) => {
					alert(err.response.data.message);
				});
		} else {
			navigate('/admin');
		}
	};

	const changeTicket = async (id) => {
		const token = sessionStorage.getItem('token');
		if (token) {
			let seat = prompt('Vui lòng nhập số ghế');
			if (seat == null || seat === '') {
				alert('Đổi vé thất bại, vui lòng kiểm tra lại thông tin');
			} else {
				seat = parseInt(seat);
				if (seat) {
					let data = {
						chuyen_xe_id: id,
						seat,
					};

					await axios
						.put(API_URL + `employee/doi-ve/${ticket.id}`, data, { headers: { Authorization: `Bearer ${token}` } })
						.then((res) => {
							alert(res.data.message);
							fetchChuyenXe();
							getTicketById();
						})
						.catch((err) => {
							alert(err.response.data.message);
						});
				} else {
					alert('Đổi vé thất bại, vui lòng kiểm tra lại thông tin');
				}
			}
		} else {
			navigate('/admin');
		}
	};

	const deleteTicket = async () => {
		if (window.confirm('Bạn có chắc chắn muốn xóa chuyến xe này ?')) {
			const token = sessionStorage.getItem('token');
			if (token) {
				await axios
					.delete(API_URL + `employee/huy-ve/${ticket.id}`, { headers: { Authorization: `Bearer ${token}` } })
					.then((res) => {
						alert(res.data.message);
						refesh();
					})
					.catch((err) => {
						alert(err.response.data.message);
					});
			} else {
				navigate('/admin');
			}
		}
	};

	return (
		<div className="w-full">
			<div className="w-full p-2 flex -mx-1">
				<div className="basis-4/12 -my-2 mx-1">
					<div className="basis-full my-2">
						<input
							onChange={(e) => setPhoneNumber(e.target.value)}
							value={phone_number}
							type="text"
							className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
							placeholder="Số điện thoại"
							required
						/>
					</div>
					<div className="basis-full my-2">
						<input
							onChange={(e) => setVeId(e.target.value)}
							value={ve_id}
							type="text"
							className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
							placeholder="Mã vé"
							required
						/>
					</div>
					<div className="flex flex-wrap -m-1">
						<div className="basis-1/2 p-1">
							<button
								className=" text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
								onClick={getTicket}
							>
								Xem
							</button>
						</div>
						<div className="basis-1/2 p-1">
							<button
								className=" text-white bg-yellow-500 hover:bg-yellow-600 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
								onClick={refesh}
							>
								Hoàn tác
							</button>
						</div>
					</div>
				</div>
				<div className="basis-8/12 mx-1">
					{ticket.id && (
						<>
							<div className="text-sm w-full flex-col  justify-center items-center mx-auto">
								<div className="bg-gray-100 w-full text-center p-3  text-lg font-semibold">Thông tin mua vé</div>
								<div className="flex flex-col md:flex-row  border border-slate-300">
									<div className="basis-5/12 flex flex-col justify-between flex-grow">
										<div className="p-5 ">
											<div className="flex flex-row mb-3">
												<div className="text-gray-500 font-medium basis-1/2">Họ tên:</div>
												<div className="basis-1/2 text-end text-green-700 font-semibold">
													{ticket.last_name + ' ' + ticket.first_name}
												</div>
											</div>
											<div className="flex flex-row mb-3">
												<div className="text-gray-500 font-medium basis-1/2">Số điện thoại:</div>
												<div className="basis-1/2 text-end text-green-700 font-semibold">{ticket.phone_number}</div>
											</div>
											<div className="flex flex-row mb-3">
												<div className="text-gray-500 font-medium basis-1/2">Email:</div>
												<div className="basis-1/2 text-end text-green-700 font-semibold">{ticket.email}</div>
											</div>
											<div className="flex flex-row mb-3">
												<div className="text-gray-500 font-medium basis-1/2">Số tiền:</div>
												<div className="basis-1/2 text-end text-green-700 font-semibold">{ticket.price}</div>
											</div>
											<div className="flex flex-row mb-3">
												<div className="text-gray-500 font-medium basis-1/2">PTTT:</div>
												<div className="basis-1/2 text-end text-green-700 font-semibold">VNPAY</div>
											</div>
										</div>
										<div className="flex">
											<div className="basis-1/2 p-1">
												<button
													className=" text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
													// className=" text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
													onClick={fetchChuyenXe}
												>
													Xem chuyến xe
												</button>
											</div>
											<div className="basis-1/2 p-1">
												<button
													className=" text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
													onClick={deleteTicket}
												>
													Hủy vé
												</button>
											</div>
										</div>
									</div>

									<div className="basis-7/12 border-t md:border-t-0 md:border-l border-slate-300  mx-auto flex flex-col">
										<div className="p-5">
											<div className="flex flex-row mb-3">
												<div className="text-gray-500 font-medium basis-1/2">Mã đặt vé:</div>
												<div className="basis-1/2 text-end text-green-700 font-semibold">{ticket.ve_id}</div>
											</div>
											<div className="flex flex-row mb-3">
												<div className="text-gray-500 font-medium basis-1/2">Tuyến xe:</div>
												<div className="basis-1/2 text-end text-green-700 font-semibold">{ticket.route_name}</div>
											</div>
											<div className="flex flex-row mb-3">
												<div className="text-gray-500 font-medium basis-1/2">Thời gian đi:</div>
												<div className="basis-1/2 text-end text-green-700 font-semibold">
													{ticket.start_time} - {ticket.date}
												</div>
											</div>
											<div className="flex flex-row mb-3">
												<div className="text-gray-500 font-medium basis-1/2">Số ghế:</div>
												<div className="basis-1/2 text-end text-green-700 font-semibold">{ticket.seat}</div>
											</div>
											<div className="flex flex-row mb-3">
												<div className="text-gray-500 font-medium basis-1/2">Điểm lên xe:</div>
												<div className="basis-1/2 text-end text-green-700 font-semibold">{ticket.start_address}</div>
											</div>
											<div className="flex flex-row mb-3">
												<div className="text-gray-500 font-medium basis-1/2">Điểm xuống xe:</div>
												<div className="basis-1/2 text-end text-green-700 font-semibold">{ticket.end_address}</div>
											</div>
											<div className="flex flex-row mb-3">
												<div className="text-gray-500 font-medium basis-1/2">Giá vé:</div>
												<div className="basis-1/2 text-end text-green-700 font-semibold">{ticket.price}</div>
											</div>
											<div className="flex flex-row mb-3">
												<div className="text-gray-500 font-medium basis-1/2">Biển số xe:</div>
												<div className="basis-1/2 text-end text-green-700 font-semibold">{ticket.license}</div>
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
			{chuyenXe.length > 0 && (
				<table className="w-full text-sm text-left  text-gray-500 ">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50">
						<tr>
							<th
								scope="col"
								className="px-2 py-3"
							>
								Tuyến xe
							</th>
							<th
								scope="col"
								className="px-2 py-3"
							>
								Ghế
							</th>
							<th
								scope="col"
								className="px-2 py-3"
							>
								Thời gian
							</th>
							<th
								scope="col"
								className="px-2 py-3"
							>
								Ngày
							</th>
							<th
								scope="col"
								className="px-2 py-3"
							>
								Hành trình
							</th>
							<th
								scope="col"
								className="px-2 py-3"
							>
								Giá
							</th>
							<th
								scope="col"
								className="px-2 py-3"
							>
								Xe
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
						{chuyenXe.length !== 0 &&
							chuyenXe.map((v, i) => (
								<tr
									key={i}
									className="odd:bg-white even:bg-gray-50 border-b "
								>
									<th
										scope="row"
										className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap"
									>
										{v.tuyen_xe.name}
									</th>
									<td className="px-2 py-4">{v.seat}</td>
									<td className="px-2 py-4">{v.start_time + '-' + v.end_time}</td>
									<td className="px-2 py-4">{v.date}</td>
									<td className="px-2 py-4">{v.tuyen_xe.start_address.name + ' - ' + v.tuyen_xe.end_address.name}</td>
									<td className="px-2 py-4">{v.price}</td>
									<td className="px-2 py-4">{v.xe.license}</td>
									<td className="px-2 py-4">
										<button
											onClick={() => changeTicket(v.id)}
											className="font-medium text-blue-500 hover:underline"
										>
											Đổi
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default TicketManagement;
