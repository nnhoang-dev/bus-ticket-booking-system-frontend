/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../configs/env';

const BusesManagerment = () => {
	const [isCreate, setIsCreate] = useState(true);
	const [idTrip, setIdTrip] = useState('');

	const [routeAll, setRouteAll] = useState([]);
	const [busAll, setBusAll] = useState([]);
	const [driverAll, setDriverAll] = useState([]);
	const [tripAll, setTripAll] = useState([]);
	const [route, setRoute] = useState('');
	const [bus, setBus] = useState('');
	const [driver, setTaiXe] = useState('');
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');

	useEffect(() => {
		getRouteAll();
		getBusAll();
		getDriverAll();
		getTripAll();
	}, []);

	const getRouteAll = async () => {
		await axios
			.get(API_URL + 'route')
			.then((res) => {
				setRouteAll(res.data.route);
			})
			.catch((err) => {});
	};
	const getBusAll = async () => {
		await axios
			.get(API_URL + 'bus')
			.then((res) => {
				setBusAll(res.data.data);
			})
			.catch((err) => {});
	};
	const getDriverAll = async () => {
		await axios
			.get(API_URL + 'employee/TX')
			.then((res) => {
				setDriverAll(res.data.data);
			})
			.catch((err) => {});
	};
	const getTripAll = async () => {
		await axios
			.get(API_URL + 'trip')
			.then((res) => {
				// console.log(res.data);
				setTripAll(res.data);
			})
			.catch((err) => {});
	};

	const resetInput = () => {
		setTaiXe('');
		setRoute('');
		setBus('');
		setTaiXe('');
		setDate('');
		setTime('');
	};

	const sendRequestCreateTrip = async () => {
		if (new Date().getTime() > new Date(date).getTime()) {
			alert('Ngày khởi hành không hợp lệ');
			return;
		}
		let data = {
			tuyen_xe_id: route,
			xe_id: bus,
			tai_xe_id: driver,
			date: date,
			start_time: time + ':00',
		};

		await axios
			.post(API_URL + 'trip', data)
			.then((res) => {
				if (res.status === 201) {
					alert('Tạo chuyến xe thành công');
					resetInput();
				}
			})
			.catch((err) => {
				alert('Tạo chuyến xe thất bại');
			});
		getTripAll();
	};

	const sendRequestUpdateTrip = async () => {
		let data = {
			tuyen_xe_id: route,
			xe_id: bus,
			tai_xe_id: driver,
			date: date,
			start_time: time,
		};

		await axios
			.put(API_URL + `trip/${idTrip}`, data)
			.then((res) => {
				if (res.status === 200) {
					alert(res.data.message);
					resetInput();
				}
			})
			.catch((err) => {
				alert(err.response.data.message);
			});
		getTripAll();
		resetInput();
		setIdTrip('');
		setIsCreate(true);
	};

	const editBtn = async (id) => {
		await axios
			.get(API_URL + `trip/${id}`)
			.then((res) => {
				let data = res.data;
				setTaiXe(data.tai_xe_id);
				setRoute(data.tuyen_xe_id);
				setBus(data.xe_id);
				setDate(data.date);
				setTime(data.start_time);
			})
			.catch((err) => {
				alert(err.response.data.message);
			});
		setIsCreate(false);
		setIdTrip(id);
	};

	const deleteBtn = async (id) => {
		if (window.confirm('Bạn có chắc chắn muốn xóa chuyến xe này ?')) {
			await axios
				.delete(API_URL + `trip/${id}`)
				.then((res) => {
					if (res.status === 200) {
						alert(res.data.message);
					}
				})
				.catch((err) => {
					alert(err.response.data.message);
				});
			getTripAll();
		}
	};

	return (
		<div className="w-full p-2">
			<div className="my-8">
				<div className="max-w-screen-md mx-auto -my-2">
					<div className="flex -mx-2 my-2">
						<div className="basis-full mx-2">
							<select
								onChange={(e) => setRoute(e.target.value)}
								value={route}
								id="countries"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
							>
								<option selected>Choose route</option>
								{routeAll.length !== 0 &&
									routeAll.map((v, i) => (
										<option
											key={i}
											value={v.id}
										>
											{v.name} | {v.start_address?.name + ' -> ' + v.end_address?.name}
										</option>
									))}
							</select>
						</div>
					</div>
					<div className="flex -mx-2 my-2">
						<div className="basis-1/2 mx-2">
							<select
								onChange={(e) => setBus(e.target.value)}
								value={bus}
								id="xe"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
							>
								<option selected>Choose bus</option>
								{busAll.length !== 0 &&
									busAll.map((v, i) => (
										<option
											key={i}
											value={v.id}
										>
											{v.license}
										</option>
									))}
							</select>
						</div>
						<div className="basis-1/2 mx-2">
							<select
								onChange={(e) => setTaiXe(e.target.value)}
								value={driver}
								id="driver"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
							>
								<option selected>Choose driver</option>
								{driverAll.length !== 0 &&
									driverAll.map((v, i) => (
										<option
											key={i}
											value={v.id}
										>
											{v.last_name} {v.first_name} | {v.phone_number}
										</option>
									))}
							</select>
						</div>
					</div>

					<div className="flex -mx-2 my-2">
						<div className="basis-1/2 mx-2">
							<input
								onChange={(e) => setDate(e.target.value)}
								value={date}
								type="date"
								id="date"
								className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
								placeholder="Start Date"
								required
							/>
						</div>
						<div className="basis-1/2 mx-2">
							<input
								onChange={(e) => setTime(e.target.value)}
								value={time}
								type="time"
								name="start_time"
								className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
								placeholder="Start Time"
								required
							/>
						</div>
					</div>

					{isCreate ? (
						<button
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							onClick={sendRequestCreateTrip}
						>
							Thêm
						</button>
					) : (
						<button
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							onClick={sendRequestUpdateTrip}
						>
							Chỉnh sửa
						</button>
					)}
				</div>
				<div className="max-w-screen-xl mx-auto -my-2 mt-8">
					<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
						<table className="w-full text-sm text-left  text-gray-500 ">
							<thead className="text-xs text-gray-700 uppercase bg-gray-50">
								<tr>
									<th
										scope="col"
										className="px-6 py-3"
									>
										Tuyến xe
									</th>
									<th
										scope="col"
										className="px-6 py-3"
									>
										Ghế
									</th>
									<th
										scope="col"
										className="px-6 py-3"
									>
										Thời gian
									</th>
									<th
										scope="col"
										className="px-6 py-3"
									>
										Ngày
									</th>
									<th
										scope="col"
										className="px-6 py-3"
									>
										Hành trình
									</th>
									<th
										scope="col"
										className="px-6 py-3"
									>
										Giá
									</th>
									<th
										scope="col"
										className="px-6 py-3"
									>
										Xe
									</th>
									<th
										scope="col"
										className="px-6 py-3"
									>
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{tripAll.length !== 0 &&
									tripAll.map((v, i) => (
										<tr
											key={i}
											className="odd:bg-white even:bg-gray-50 border-b "
										>
											<th
												scope="row"
												className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
											>
												{v.tuyen_xe.name}
											</th>
											<td className="px-6 py-4">{v.seat}</td>
											<td className="px-6 py-4">{v.start_time + '-' + v.end_time}</td>
											<td className="px-6 py-4">{v.date}</td>
											<td className="px-6 py-4">{v.tuyen_xe.start_address.name + ' - ' + v.tuyen_xe.end_address.name}</td>
											<td className="px-6 py-4">{v.price / 1000 + '.000'}</td>
											<td className="px-6 py-4">{v.xe.license}</td>
											<td className="px-6 py-4">
												<button
													onClick={() => editBtn(v.id)}
													className="mr-2 font-medium text-blue-500 hover:underline"
												>
													Sửa
												</button>
												<button
													onClick={() => deleteBtn(v.id)}
													className="font-medium text-red-500 hover:underline"
												>
													Xóa
												</button>
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BusesManagerment;
