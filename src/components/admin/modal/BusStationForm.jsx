/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../configs/env';
import { useNavigate } from 'react-router-dom';
import { Arrow } from '../../../svg/svg';

const BusStationForm = ({ func, busStationId, provinces }) => {
	const navigate = useNavigate();

	// Modal
	const [citySearchModal, setCitySearchModal] = useState(false);
	const [citySearch, setCitySearch] = useState('');

	// Input
	const [name, setName] = useState('');
	const [city, setCity] = useState('');
	const [address, setAddress] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');

	// Send GET request to retrieve bus station that needs updating
	useEffect(() => {
		if (busStationId !== '') {
			axios
				.get(API_URL + `employee/bus-station/${busStationId}`)
				.then((res) => {
					console.log(res.data.data);
					setInput(res.data.data);
				})
				.catch((err) => {
					if (err.response.status === 401) {
						navigate('/admin');
					}
				});
		}
	}, []);

	// Send POST request to create a new bus stations
	const sendRequestCreateBusStation = async () => {
		let data = {
			name,
			city,
			address,
			phone_number: phoneNumber,
		};

		await axios
			.post(API_URL + 'employee/bus-station', data, {
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
					func.refresh();
				}
			});
	};

	// Send PUT request to update a bus stations
	const sendRequestUpdateBusStation = async () => {
		let data = { name, city, address, phone_number: phoneNumber };

		await axios
			.put(API_URL + `employee/bus-station/${busStationId}`, data, {
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
		setName(data.name);
		setAddress(data.address);
		setCity(data.city);
		setPhoneNumber(data.phone_number);
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
								{busStationId === '' ? 'Create a new bus station' : 'Update bus station'}
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
										htmlFor="name"
										className="block mb-2 text-sm font-medium text-gray-900"
									>
										Name
									</label>
									<input
										onChange={(e) => setName(e.target.value)}
										value={name}
										type="text"
										id="name"
										className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
										placeholder="Name"
										required
									/>
								</div>
								<div>
									<label
										htmlFor="phoneNumber"
										className="block mb-2 text-sm font-medium text-gray-900"
									>
										Phone
									</label>
									<input
										onChange={(e) => setPhoneNumber(e.target.value)}
										value={phoneNumber}
										type="text"
										id="phoneNumber"
										className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
										placeholder="Name"
										required
									/>
								</div>
								<div>
									<label
										htmlFor="address"
										className="block mb-2 text-sm font-medium text-gray-900"
									>
										Address
									</label>
									<input
										onChange={(e) => setAddress(e.target.value)}
										value={address}
										type="text"
										id="address"
										className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
										placeholder="Name"
										required
									/>
								</div>
								<div>
									<label
										htmlFor="city"
										className="block mb-2 text-sm font-medium text-gray-900"
									>
										City
									</label>
									<div className="text-sm rounded-lg relative h-10 border border-slate-300 bg-gray-50 text-gray-900 cursor-pointer">
										<div
											className="w-full h-full flex items-center justify-between"
											onClick={() => {
												setCitySearchModal(true);
											}}
										>
											<span className="ml-2">{city}</span>
											<Arrow className="h-4 w-4 fill-gray-500 rotate-180 mr-2" />
										</div>
										{citySearchModal && (
											<div className="absolute z-40 top-0 left-0 w-full bg-white rounded-xl shadow-lg ">
												<input
													list="start_address"
													value={citySearch}
													className="h-10 w-full rounded-lg border-slate-300 cursor-pointer"
													type="text"
													onChange={(e) => setCitySearch(e.target.value)}
												/>
												<ul className="w-full overflow-y-scroll max-h-32">
													{citySearch === ''
														? provinces.map((v, i) => {
																return (
																	<li
																		key={i}
																		className="ml-10 my-2"
																		onClick={() => {
																			setCity(v);
																			setCitySearchModal(false);
																		}}
																	>
																		{v}
																	</li>
																);
														  })
														: provinces
																.filter((item) =>
																	item
																		.toLowerCase()
																		.includes(citySearch.toLowerCase())
																)
																.map((item, i) => (
																	<li
																		key={i}
																		className="ml-10 my-2"
																		onClick={() => {
																			setCity(item);
																			setCitySearchModal(false);
																		}}
																	>
																		{item}
																	</li>
																))}
												</ul>
											</div>
										)}
									</div>
								</div>

								{busStationId === '' ? (
									<button
										className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
										onClick={() => sendRequestCreateBusStation()}
									>
										Add
									</button>
								) : (
									<button
										className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
										onClick={() => sendRequestUpdateBusStation()}
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

export default BusStationForm;
