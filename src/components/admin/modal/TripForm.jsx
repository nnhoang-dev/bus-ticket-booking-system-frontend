/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../configs/env';
import { useNavigate } from 'react-router-dom';

const TripForm = ({ func, tripId, routeAll, busAll, driverAll }) => {
	const navigate = useNavigate();

	// Input
	const [route, setRoute] = useState('');
	const [bus, setBus] = useState('');
	const [driver, setTaiXe] = useState('');
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');

	// Send GET request to retrieve bus station that needs updating
	useEffect(() => {
		if (tripId !== '') {
			axios
				.get(API_URL + `employee/trip/${tripId}`)
				.then((res) => {
					setInput(res.data.trip);
				})
				.catch((err) => {
					if (err.response.status === 401) {
						navigate('/admin');
					}
				});
		}
	}, []);

	// Send POST request to create a new trip
	const sendRequestCreateTrip = async () => {
		// Validate Start Date
		if (new Date() > new Date(date + 'T' + time)) {
			func.closeModal();
			func.setMessage('Invalid departure time');
			func.openFailureModal();
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
				func.closeModal();
				func.setMessage(res.data.message);
				func.openSuccessModal();
				func.refresh();
			})
			.catch((err) => {
				if (err.response.status === 401) {
					navigate('/admin');
				} else {
					func.closeModal();
					func.setMessage(err.response.data.message);
					func.openFailureModal();
				}
			});
	};

	// Send PUT request to update a trip
	const sendRequestUpdateTrip = async () => {
		// Validate Start Date
		if (new Date() > new Date(date + 'T' + time)) {
			func.closeModal();
			func.setMessage('Invalid departure time');
			func.openFailureModal();
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
			.put(API_URL + `employee/trip/${tripId}`, data, {
				headers: { Authorization: 'Bearer' + sessionStorage.getItem('token') },
			})
			.then((res) => {
				if (res.status === 200) {
					func.closeModal();
					func.setMessage(res.data.message);
					func.openSuccessModal();
					func.refresh();
				}
			})
			.catch((err) => {
				if (err.response.status === 401) {
					navigate('/admin');
				} else {
					func.closeModal();
					func.setMessage(err.response.data.message);
					func.openFailureModal();
				}
			});
	};

	// Set input
	const setInput = (data) => {
		setTaiXe(data.driver_id);
		setRoute(data.route_id);
		setBus(data.bus_id);
		setDate(data.date);
		setTime(data.start_time.slice(0, 5));
	};

	return (
		<div className="fixed z-50 top-0 left-0 bg-black/20 w-full h-full">
			<div
				id="authentication-modalChangePassword"
				className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
			>
				<div className="relative p-4 w-full max-w-md max-h-full mx-auto">
					{/* <!-- Modal content --> */}
					<div className="relative bg-white rounded-lg shadow ">
						{/* <!-- Modal header --> */}
						<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
							<h3 className="text-xl font-semibold text-gray-900">
								{tripId === '' ? 'Create a new route' : 'Update route'}
							</h3>
							<button
								onClick={() => func.closeModal()}
								type="button"
								className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
							>
								<svg
									className="w-3 h-3"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 14 14"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
									/>
								</svg>
							</button>
						</div>
						{/* <!-- Modal body --> */}
						<div className="p-4 md:p-5">
							<div className="space-y-4">
								<div>
									<label
										htmlFor="route"
										className="block mb-2 text-sm font-medium text-gray-900"
									>
										Route
									</label>
									<select
										onChange={(e) => setRoute(e.target.value)}
										value={route}
										id="route"
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
								<div>
									<label
										htmlFor="bus"
										className="block mb-2 text-sm font-medium text-gray-900"
									>
										Bus
									</label>
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
								<div>
									<label
										htmlFor="driver"
										className="block mb-2 text-sm font-medium text-gray-900"
									>
										Driver
									</label>
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
								<div>
									<label
										htmlFor="date"
										className="block mb-2 text-sm font-medium text-gray-900"
									>
										Date
									</label>
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
								<div>
									<label
										htmlFor="time"
										className="block mb-2 text-sm font-medium text-gray-900"
									>
										Time
									</label>
									<input
										onChange={(e) => setTime(e.target.value)}
										value={time}
										type="time"
										id="time"
										className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
										placeholder="Time (HH:mm)"
										required
									/>
								</div>

								{tripId === '' ? (
									<button
										className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
										onClick={() => sendRequestCreateTrip()}
									>
										Add
									</button>
								) : (
									<button
										className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
										onClick={() => sendRequestUpdateTrip()}
									>
										Update
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TripForm;
