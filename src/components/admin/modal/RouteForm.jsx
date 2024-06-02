/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../configs/env';
import { useNavigate } from 'react-router-dom';

const RouteForm = ({ func, routeId, busStationAll }) => {
	const navigate = useNavigate();

	// Input
	const [startAddress, setStartAddress] = useState('');
	const [endAddress, setEndAddress] = useState('');
	const [price, setPrice] = useState('');
	const [time, setTime] = useState('');

	// Send GET request to retrieve bus station that needs updating
	useEffect(() => {
		if (routeId !== '') {
			axios
				.get(API_URL + `employee/route/${routeId}`)
				.then((res) => {
					setInput(res.data.route);
				})
				.catch((err) => {
					if (err.response.status === 401) {
						navigate('/admin');
					}
				});
		}
	}, []);

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
				console.log(res.data);
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

	// Send PUT request to update a route
	const sendRequestUpdateRoute = async () => {
		let data = {
			start_address: startAddress,
			end_address: endAddress,
			price,
			time: time + ':00',
		};
		await axios
			.put(API_URL + `employee/route/${routeId}`, data, {
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

	// Set input
	const setInput = (data) => {
		setStartAddress(data.start_address.id);
		setEndAddress(data.end_address.id);
		setPrice(data.price);
		setTime(data.time.slice(0, 5));
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
								{routeId === '' ? 'Create a new route' : 'Update route'}
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
										htmlFor="start address"
										className="block mb-2 text-sm font-medium text-gray-900"
									>
										Start bus station
									</label>
									<select
										onChange={(e) => setStartAddress(e.target.value)}
										value={startAddress}
										id="start address"
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
								<div>
									<label
										htmlFor="end address"
										className="block mb-2 text-sm font-medium text-gray-900"
									>
										End bus station
									</label>
									<select
										onChange={(e) => setEndAddress(e.target.value)}
										value={endAddress}
										id="end address"
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
								<div>
									<label
										htmlFor="price"
										className="block mb-2 text-sm font-medium text-gray-900"
									>
										Price
									</label>
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
										type="text"
										id="time"
										className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
										placeholder="Time (HH:mm)"
										required
									/>
								</div>

								{routeId === '' ? (
									<button
										className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
										onClick={() => sendRequestCreateRoute()}
									>
										Add
									</button>
								) : (
									<button
										className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
										onClick={() => sendRequestUpdateRoute()}
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

export default RouteForm;
