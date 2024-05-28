/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../configs/env';
import { useNavigate } from 'react-router-dom';
import WarningNotification from '../Noti/WarningNotification';
import SuccessNotification from '../Noti/SuccessNotification';
import FailureNotification from '../Noti/FailureNotification';

const BusesManagerment = () => {
	const navigate = useNavigate();

	// Modal
	const [deleteModal, setDeleteModal] = useState(false);
	const [successModal, setSuccessModal] = useState(false);
	const [failureModal, setFailureModal] = useState(false);
	const [message, setMessage] = useState('');
	const [tempId, setTempId] = useState('');

	// Check state (create, update)
	const [isCreate, setIsCreate] = useState(true);
	const [idTrip, setIdTrip] = useState('');

	// Input
	const [routeAll, setRouteAll] = useState([]);
	const [busAll, setBusAll] = useState([]);
	const [driverAll, setDriverAll] = useState([]);
	const [tripAll, setTripAll] = useState([]);
	const [route, setRoute] = useState('');
	const [bus, setBus] = useState('');
	const [driver, setTaiXe] = useState('');
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');

	// Get data for input
	useEffect(() => {
		getRouteAll();
		getBusAll();
		getDriverAll();
		getTripAll();
	}, []);

	// Send GET request to retrieve routes information
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

	// Send GET request to retrieve buses information
	const getBusAll = async () => {
		await axios
			.get(
				API_URL + 'employee/bus'
				// , {headers: { Authorization: 'Bearer' + sessionStorage.getItem('token') },}
			)
			.then((res) => {
				setBusAll(res.data.data);
			})
			.catch((err) => {});
	};

	// Send GET request to retrieve drivers information
	const getDriverAll = async () => {
		await axios
			.get(
				API_URL + 'employee/get-employees-by-role/driver'
				// , {headers: { Authorization: 'Bearer' + sessionStorage.getItem('token') },}
			)
			.then((res) => {
				setDriverAll(res.data.data);
			})
			.catch((err) => {});
	};

	// Send GET request to retrieve trips information
	const getTripAll = async () => {
		await axios
			.get(
				API_URL + 'employee/trip'
				// , {headers: { Authorization: 'Bearer' + sessionStorage.getItem('token') },}
			)
			.then((res) => {
				let trips = res.data;
				trips = trips.filter((v) => new Date() < new Date(v.date + 'T' + v.start_time));
				setTripAll(trips);
			})
			.catch((err) => {});
	};

	// Reset input
	const resetInput = () => {
		setTaiXe('');
		setRoute('');
		setBus('');
		setTaiXe('');
		setDate('');
		setTime('');
	};

	// Set input
	const setInput = (data) => {
		setTaiXe(data.driver_id);
		setRoute(data.route_id);
		setBus(data.bus_id);
		setDate(data.date);
		setTime(data.start_time);
	};

	// Send POST request to create a new trip
	const sendRequestCreateTrip = async () => {
		// Validate Start Date
		if (new Date() > new Date(date + 'T' + time)) {
			setMessage('Invalid departure time');
			openFailureModal();
			return;
		}

		let data = {
			route_id: route,
			bus_id: bus,
			driver_id: driver,
			date: date,
			start_time: time + ':00',
		};

		await axios
			.post(API_URL + 'employee/trip', data, {
				headers: { Authorization: 'Bearer' + sessionStorage.getItem('token') },
			})
			.then((res) => {
				setMessage(res.data.message);
				openSuccessModal();

				getTripAll();
				resetInput();
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

	// Send PUT request to update a trip
	const sendRequestUpdateTrip = async () => {
		if (new Date() > new Date(date + 'T' + time)) {
			setMessage('Invalid departure time');
			openFailureModal();
			return;
		}

		let data = {
			route_id: route,
			bus_id: bus,
			driver_id: driver,
			date: date,
			start_time: time + ':00',
		};
		await axios
			.put(API_URL + `employee/trip/${idTrip}`, data, {
				headers: { Authorization: 'Bearer' + sessionStorage.getItem('token') },
			})
			.then((res) => {
				if (res.status === 200) {
					setMessage(res.data.message);
					openSuccessModal();
				}
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

	// Send GET request to retrieve trip that needs updating
	const editBtn = async (id) => {
		await axios
			.get(
				API_URL + `employee/trip/${id}`
				// , {headers: { Authorization: 'Bearer' + sessionStorage.getItem('token') },}
			)
			.then((res) => {
				setInput(res.data.trip);
			})
			.catch((err) => {
				setMessage(err.response.data.message);
				openFailureModal();
			});
		setIsCreate(false);
		setIdTrip(id);
	};

	// Open delete confirm modal
	const deleteBtn = async (id) => {
		setTempId(id);
		setDeleteModal(true);
	};

	// Refresh page
	const refresh = () => {
		resetInput();
		getTripAll();
		setIdTrip('');
		setIsCreate(true);
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
			<h1 className="font-bold text-2xl text-gray-700">Trip Management</h1>
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
								id="bus"
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
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							onClick={sendRequestCreateTrip}
						>
							Add
						</button>
					) : (
						<button
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							onClick={sendRequestUpdateTrip}
						>
							Update
						</button>
					)}
					<button
						className="ml-2 text-white bg-yellow-500 hover:bg-yellow-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
						onClick={refresh}
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
										Route
									</th>
									<th
										scope="col"
										className="px-6 py-3"
									>
										Seat
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
										Date
									</th>
									<th
										scope="col"
										className="px-6 py-3"
									>
										Bus Station
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
										Bus
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
												{v.route.name}
											</th>
											<td className="px-6 py-4">{v.seat}</td>
											<td className="px-6 py-4">{v.start_time + '-' + v.end_time}</td>
											<td className="px-6 py-4">{v.date}</td>
											<td className="px-6 py-4">{v.route.start_address.name + ' - ' + v.route.end_address.name}</td>
											<td className="px-6 py-4">{v.price / 1000 + '.000'}</td>
											<td className="px-6 py-4">{v.bus.license}</td>
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
					func={{ refresh: refresh, closeModal: closeDeleteModal, openSuccessModal, openFailureModal, setMessage }}
					type={'trip'}
					action={'trip'}
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

export default BusesManagerment;
