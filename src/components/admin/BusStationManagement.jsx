/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../configs/env';
import { useNavigate } from 'react-router-dom';
import WarningNotification from '../Noti/WarningNotification';
import SuccessNotification from '../Noti/SuccessNotification';
import FailureNotification from '../Noti/FailureNotification';
import { Arrow } from '../../svg/svg';

const BusStationManagement = () => {
	const navigate = useNavigate();
	// Modal
	const [deleteModal, setDeleteModal] = useState(false);
	const [successModal, setSuccessModal] = useState(false);
	const [failureModal, setFailureModal] = useState(false);
	const [message, setMessage] = useState('');
	const [tempId, setTempId] = useState('');
	const [citySearchModal, setCitySearchModal] = useState(false);
	const [citySearch, setCitySearch] = useState('');

	const [isCreate, setIsCreate] = useState(true);
	const [idBusStation, setIdBusStation] = useState('');

	const [busStationAll, setBusStationAll] = useState([]);
	const [name, setName] = useState('');
	const [city, setCity] = useState('');
	const [address, setAddress] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [provinces, setProvinces] = useState([]);

	useEffect(() => {
		getBusStationAll();
		getProvinces();
	}, []);

	const getProvinces = () => {
		axios.get('https://vapi.vnappmob.com/api/province/').then((res) => {
			setProvinces(
				res.data.results.reduce((previousValue, currentValue) => {
					currentValue.province_name = currentValue.province_name.replace('Tỉnh', '');
					currentValue.province_name = currentValue.province_name.replace('Thành phố', '');
					currentValue.province_name = currentValue.province_name.trim();
					previousValue.push(currentValue.province_name);
					return previousValue;
				}, [])
			);
		});
	};

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

	const resetInput = () => {
		setName('');
		setCity('');
		setAddress('');
		setPhoneNumber('');
	};

	const setInput = (data) => {
		setName(data.name);
		setAddress(data.address);
		setCity(data.city);
		setPhoneNumber(data.phone_number);
	};

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
				setMessage(res.data.message);
				openSuccessModal();

				resetInput();
				getBusStationAll();
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

	const sendRequestUpdateBusStation = async () => {
		let data = { name, city, address, phone_number: phoneNumber };

		await axios
			.put(API_URL + `employee/bus-station/${idBusStation}`, data, {
				headers: { Authorization: 'Bearer' + sessionStorage.getItem('token') },
			})
			.then((res) => {
				setMessage(res.data.message);
				openSuccessModal();

				resetInput();
				getBusStationAll();
				setIdBusStation('');
				setIsCreate(true);
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

	const editBtn = async (id) => {
		await axios
			.get(
				API_URL + `employee/bus-station/${id}`
				// , {headers: { Authorization: 'Bearer' + sessionStorage.getItem('token') },}
			)
			.then((res) => {
				let data = res.data.data;
				setInput(data);
				setIsCreate(false);
				setIdBusStation(id);
			})
			.catch((err) => {
				if (err.response.status === 401) {
					navigate('/admin');
				}
				setMessage(err.response.data.message);
				openFailureModal();
			});
	};

	const deleteBtn = async (id) => {
		setTempId(id);
		setDeleteModal(true);
	};

	const refeshBtn = () => {
		resetInput();
		setIsCreate(true);
		getBusStationAll();
	};

	const closeDeleteModal = () => {
		setDeleteModal(false);
		setTempId('');
	};

	const closeSuccessModal = () => {
		setSuccessModal(false);
	};

	const closeFailureModal = () => {
		setFailureModal(false);
	};

	const openSuccessModal = () => {
		setSuccessModal(true);
	};

	const openFailureModal = () => {
		setFailureModal(true);
	};

	return (
		<div className="w-full p-2">
			<div className="my-8">
				<div className="max-w-screen-md mx-auto -my-2">
					<div className="flex -mx-2 my-2">
						<div className="basis-1/2 mx-2">
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
						<div className="basis-1/2 mx-2">
							<div className="input-search flex flex-col w-full sm:basis-1/4  mb-3">
								<div className="text-sm rounded-lg relative h-10 border border-slate-300 bg-gray-50 text-gray-900 cursor-pointer">
									<div
										className="w-full h-full flex items-center justify-between"
										onClick={() => {
											setCitySearchModal(true);
											console.log(provinces);
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
															.filter((item) => item.toLowerCase().includes(citySearch.toLowerCase()))
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
							{/* <input
								onChange={(e) => setCity(e.target.value)}
								value={city}
								type="text"
								name="city"
								className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
								placeholder="City"
								required
							/> */}
						</div>
					</div>
					<div className="flex -mx-2 my-2">
						<div className="basis-1/2 mx-2">
							<input
								onChange={(e) => setAddress(e.target.value)}
								value={address}
								type="text"
								id="address"
								className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
								placeholder="Address"
								required
							/>
						</div>
						<div className="basis-1/2 mx-2">
							<input
								onChange={(e) => setPhoneNumber(e.target.value)}
								value={phoneNumber}
								type="text"
								name="phoneNumber"
								className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
								placeholder="Phone number"
								required
							/>
						</div>
					</div>

					{isCreate ? (
						<button
							className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
							onClick={sendRequestCreateBusStation}
						>
							Add
						</button>
					) : (
						<button
							className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
							onClick={sendRequestUpdateBusStation}
						>
							Update
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
										City/Province
									</th>
									<th
										scope="col"
										className="px-6 py-3"
									>
										Address
									</th>
									<th
										scope="col"
										className="px-6 py-3"
									>
										Phone Number
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
								{busStationAll.length !== 0 &&
									busStationAll.map((v, i) => (
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
											<td className="px-6 py-4">{v.city}</td>
											<td className="px-6 py-4">{v.address}</td>
											<td className="px-6 py-4">{v.phone_number}</td>
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
					func={{ refesh: refeshBtn, closeModal: closeDeleteModal, openSuccessModal, openFailureModal, setMessage }}
					type={'bus station'}
					action={'bus-station'}
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

export default BusStationManagement;
