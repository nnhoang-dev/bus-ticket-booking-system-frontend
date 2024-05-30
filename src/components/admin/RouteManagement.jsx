/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../configs/env';
import { useNavigate } from 'react-router-dom';
import WarningNotification from '../Noti/WarningNotification';
import SuccessNotification from '../Noti/SuccessNotification';
import FailureNotification from '../Noti/FailureNotification';

const RouteManagement = () => {
	const navigate = useNavigate();
	// Data
	const [busStationAll, setBusStationAll] = useState([]);
	const [routeAll, setRouteAll] = useState([]);

	// Modal
	const [deleteModal, setDeleteModal] = useState(false);
	const [successModal, setSuccessModal] = useState(false);
	const [failureModal, setFailureModal] = useState(false);
	const [message, setMessage] = useState('');
	const [tempId, setTempId] = useState('');
	const [isCreate, setIsCreate] = useState(true);
	const [idRoute, setIdRoute] = useState('');

	// Input
	const [startAddress, setStartAddress] = useState('');
	const [endAddress, setEndAddress] = useState('');
	const [price, setPrice] = useState('');
	const [time, setTime] = useState('');

	useEffect(() => {
		getBusStationAll();
		getRouteAll();
	}, []);

	// Send GET request to retrieve bus stations information
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

	// Send GET request to retrieve trip
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

	// Reset input
	const resetInput = () => {
		setStartAddress('');
		setEndAddress('');
		setPrice('');
		setTime('');
	};

	// Set input
	const setInput = (data) => {
		setStartAddress(data.start_address.id);
		setEndAddress(data.end_address.id);
		setPrice(data.price);
		setTime(data.time.slice(0, 5));
	};

	// Send POST request to create a new route
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
				setMessage(res.data.message);
				openSuccessModal();

				resetInput();
				getRouteAll();
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

	// Send PUT request to update a route
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
				setMessage(res.data.message);
				openSuccessModal();

				refreshBtn();
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

	// Send GET request to retrieve route that needs updating
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
				if (err.response.status === 401) {
					navigate('/admin');
				}
				setMessage(err.response.data.message);
				openFailureModal();
			});
	};

	// Open delete confirm modal
	const deleteBtn = async (id) => {
		setTempId(id);
		setDeleteModal(true);
	};

	// Refresh page
	const refreshBtn = () => {
		resetInput();
		setIdRoute('');
		setIsCreate(true);
		getRouteAll();
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

	// Close Failure Modal
	const closeFailureModal = () => {
		setFailureModal(false);
	};

	// Open Success Modal
	const openSuccessModal = () => {
		setSuccessModal(true);
	};

	// Open Failure Modal
	const openFailureModal = () => {
		setFailureModal(true);
	};

	return (
		<div className="w-full p-2">
			<h1 className="font-bold text-2xl text-gray-700">Route Management</h1>
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
							Update
						</button>
					)}
					<button
						className="ml-2 text-white bg-yellow-500 hover:bg-yellow-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
						onClick={refreshBtn}
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
			{deleteModal && (
				<WarningNotification
					id={tempId}
					func={{ refresh: refreshBtn, closeModal: closeDeleteModal, openSuccessModal, openFailureModal, setMessage }}
					type={'route'}
					action={'route'}
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
		</div>
	);
};

export default RouteManagement;
