/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../configs/env';

const RouteManagement = () => {
	const [isCreate, setIsCreate] = useState(true);
	const [idRoute, setIdRoute] = useState('');

	const [busStationAll, setBusStationAll] = useState([]);
	const [routeAll, setRouteAll] = useState([]);

	const [startAddress, setStartAddress] = useState('');
	const [endAddress, setEndAddress] = useState('');
	const [price, setPrice] = useState('');
	const [time, setTime] = useState('');

	useEffect(() => {
		getBusStationAll();
		getRouteAll();
	}, []);

	const getBusStationAll = async () => {
		await axios
			.get(
				API_URL + 'employee/bus-station'
				// , {headers: { Authorization: 'Bearer' + sessionStorage.getItem('token') },}
			)
			.then((res) => {
				setBusStationAll(res.data.data);
			})
			.catch((err) => {});
	};

	const getRouteAll = async () => {
		await axios
			.get(
				API_URL + 'employee/route'
				// , {headers: { Authorization: 'Bearer' + sessionStorage.getItem('token') },}
			)
			.then((res) => {
				setRouteAll(res.data.route);
			})
			.catch((err) => {});
	};

	const resetInput = () => {
		setStartAddress('');
		setEndAddress('');
		setPrice('');
		setTime('');
	};

	const setInput = (data) => {
		setStartAddress(data.start_address.id);
		setEndAddress(data.end_address.id);
		setPrice(data.price);
		setTime(data.time.slice(0, 5));
	};

	const sendRequestCreateRoute = async () => {
		let data = {
			start_address: startAddress,
			end_address: endAddress,
			price,
			time: time + ':00',
		};
		await axios
			.post(API_URL + 'employee/route', data, {
				headers: { Authorization: 'Bearer' + sessionStorage.getItem('token') },
			})
			.then((res) => {
				alert(res.data.message);
				resetInput();
				getRouteAll();
			})
			.catch((err) => {
				alert(err.response.data.message);
			});
	};

	const sendRequestUpdateRoute = async () => {
		let data = {
			start_address: startAddress,
			end_address: endAddress,
			price,
			time: time + ':00',
		};
		await axios
			.put(API_URL + `employee/route/${idRoute}`, data, {
				headers: { Authorization: 'Bearer' + sessionStorage.getItem('token') },
			})
			.then((res) => {
				alert(res.data.message);
				resetInput();
				getRouteAll();
				setIdRoute('');
				setIsCreate(true);
			})
			.catch((err) => {
				alert(err.response.data.message);
			});
	};

	const editBtn = async (id) => {
		await axios
			.get(
				API_URL + `employee/route/${id}`
				// , {headers: { Authorization: 'Bearer' + sessionStorage.getItem('token') },}
			)
			.then((res) => {
				setInput(res.data.route);
				setIsCreate(false);
				setIdRoute(id);
			})
			.catch((err) => {
				alert(err.response.data.message);
			});
	};

	const deleteBtn = async (id) => {
		if (window.confirm('Bạn có chắc chắn muốn xóa chuyến xe này ?')) {
			await axios
				.delete(API_URL + `employee/route/${id}`, {
					headers: { Authorization: 'Bearer' + sessionStorage.getItem('token') },
				})
				.then((res) => {
					alert(res.data.message);
					getRouteAll();
				})
				.catch((err) => {
					alert(err.response.data.message);
				});
		}
	};

	const refeshBtn = () => {
		resetInput();
		setIsCreate(true);
		getRouteAll();
	};

	return (
		<div className="w-full p-2">
			<div className="my-8">
				<div className="max-w-screen-md mx-auto -my-2">
					<div className="flex -mx-2 my-2">
						<div className="basis-1/2 px-2">
							<select
								onChange={(e) => setStartAddress(e.target.value)}
								value={startAddress}
								id="xe"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
							>
								<option selected>Choose start bus station</option>
								{busStationAll &&
									busStationAll.map((v, i) => (
										<option
											key={i}
											value={v.id}
										>
											{v.name}
										</option>
									))}
							</select>
						</div>
						<div className="basis-1/2 px-2">
							<select
								onChange={(e) => setEndAddress(e.target.value)}
								value={endAddress}
								id="xe"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
							>
								<option selected>Choose end bus station</option>
								{busStationAll &&
									busStationAll.map((v, i) => (
										<option
											key={i}
											value={v.id}
										>
											{v.name}
										</option>
									))}
							</select>
						</div>
					</div>
					<div className="flex -mx-2 my-2">
						<div className="basis-1/2 mx-2">
							<input
								onChange={(e) => setPrice(e.target.value)}
								value={price}
								type="text"
								id="price"
								className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
								placeholder="Price"
								required
							/>
						</div>
						<div className="basis-1/2 mx-2">
							<input
								onChange={(e) => setTime(e.target.value)}
								value={time}
								type="text"
								id="time"
								className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
								placeholder="Time (HH:mm)"
								required
							/>
						</div>
					</div>

					{isCreate ? (
						<button
							className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
							onClick={sendRequestCreateRoute}
						>
							Add
						</button>
					) : (
						<button
							className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
							onClick={sendRequestUpdateRoute}
						>
							Chỉnh sửa
						</button>
					)}
					<button
						className="ml-2 text-white bg-yellow-500 hover:bg-yellow-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
						onClick={refeshBtn}
					>
						Refresh
					</button>
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
										Name
									</th>
									<th
										scope="col"
										className="px-6 py-3"
									>
										Start Address
									</th>
									<th
										scope="col"
										className="px-6 py-3"
									>
										End Address
									</th>
									<th
										scope="col"
										className="px-6 py-3"
									>
										Price
									</th>
									<th
										scope="col"
										className="px-6 py-3"
									>
										Time
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
								{routeAll &&
									routeAll.map((v, i) => (
										<tr
											key={i}
											className="odd:bg-white even:bg-gray-50 border-b "
										>
											<th
												scope="row"
												className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
											>
												{v.name}
											</th>
											<td className="px-6 py-4">{v.start_address.name}</td>
											<td className="px-6 py-4">{v.end_address.name}</td>
											<td className="px-6 py-4">{v.price}</td>
											<td className="px-6 py-4">{v.time}</td>
											<td className="px-6 py-4">
												<button
													onClick={() => editBtn(v.id)}
													className="mr-2 font-medium text-blue-500 hover:underline"
												>
													Edit
												</button>
												<button
													onClick={() => deleteBtn(v.id)}
													className="font-medium text-red-500 hover:underline"
												>
													Delete
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

export default RouteManagement;
