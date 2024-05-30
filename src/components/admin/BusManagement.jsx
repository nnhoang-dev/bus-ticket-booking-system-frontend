/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../configs/env';
import WarningNotification from '../Noti/WarningNotification';
import SuccessNotification from '../Noti/SuccessNotification';
import FailureNotification from '../Noti/FailureNotification';
import { useNavigate } from 'react-router-dom';

const BusManagerment = () => {
	const navigate = useNavigate();
	// Data
	const [busAll, setBusAll] = useState([]);

	// Modal
	const [deleteModal, setDeleteModal] = useState(false);
	const [successModal, setSuccessModal] = useState(false);
	const [failureModal, setFailureModal] = useState(false);
	const [message, setMessage] = useState('');
	const [tempId, setTempId] = useState('');
	const [isCreate, setIsCreate] = useState(true);
	const [idBus, setIdBus] = useState('');

	// Input
	const [license, setLicense] = useState('');

	useEffect(() => {
		getBusAll();
	}, []);

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
			.catch((err) => {
				if (err.response.status === 401) {
					navigate('/admin');
				}
			});
	};

	// Send POST request to create a new bus
	const sendRequestCreateBus = async () => {
		let data = {
			license: license,
		};

		await axios
			.post(API_URL + 'employee/bus', data, {
				headers: { Authorization: 'Bearer' + sessionStorage.getItem('token') },
			})
			.then((res) => {
				setMessage(res.data.message);
				openSuccessModal();
				resetInput();
				getBusAll();
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

	// Send PUT request to update a bus
	const sendRequestUpdateBus = async () => {
		let data = {
			license: license,
		};

		await axios
			.put(API_URL + `employee/bus/${idBus}`, data, {
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

	// Send GET request to retrieve the bus information for updating
	const editBtn = async (id) => {
		await axios
			.get(
				API_URL + `employee/bus/${id}`
				// , {headers: { Authorization: 'Bearer' + sessionStorage.getItem('token') },}
			)
			.then((res) => {
				setLicense(res.data.data.license);
				setIsCreate(false);
				setIdBus(id);
			})
			.catch((err) => {
				setMessage(err.response.data.message);
				openFailureModal();
			});
	};

	// Open delete modal
	const deleteBtn = async (id) => {
		setTempId(id);
		setDeleteModal(true);
	};

	// Refresh page
	const refreshBtn = () => {
		resetInput();
		setIsCreate(true);
		getBusAll();
		setIdBus('');
	};

	// Reset input
	const resetInput = () => {
		setLicense('');
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
			<h1 className="font-bold text-2xl text-gray-700">Bus Management</h1>
			<div className="my-8">
				<div className="max-w-screen-md mx-auto -my-2">
					<div className="flex my-2">
						<input
							onChange={(e) => setLicense(e.target.value)}
							value={license}
							type="text"
							id="license"
							className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
							placeholder="License"
							required
						/>
					</div>

					{isCreate ? (
						<button
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							onClick={sendRequestCreateBus}
						>
							Add
						</button>
					) : (
						<button
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							onClick={sendRequestUpdateBus}
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
				<div className="flex gap-4 max-w-screen-xl mx-auto -my-2 mt-8">
					<div className="basis-1/2 relative overflow-x-auto shadow-md sm:rounded-lg">
						<table className="w-full text-sm text-left  text-gray-500 ">
							<thead className="text-xs text-gray-700 uppercase bg-gray-50">
								<tr>
									<th
										scope="col"
										className="px-6 py-3"
									>
										License
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
								{busAll.length ? (
									busAll.map((v, i) => (
										<tr
											key={i}
											className="odd:bg-white even:bg-gray-50 border-b "
										>
											<td className="px-6 py-4">{v.license}</td>
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
									))
								) : (
									<></>
								)}
							</tbody>
						</table>
					</div>
					<div className={`basis-1/2 relative overflow-x-auto ${busAll.length > 10 ? 'shadow-md' : ''} sm:rounded-lg`}>
						<table className={`w-full text-sm text-left text-gray-500 ${busAll.length < 11 ? 'shadow-md' : ''}`}>
							<thead className="text-xs text-gray-700 uppercase bg-gray-50">
								<tr>
									<th
										scope="col"
										className="px-6 py-3"
									>
										License
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
								{busAll.length > 10 ? (
									busAll.map(
										(v, i) =>
											i > 10 && (
												<tr
													key={i}
													className="odd:bg-white even:bg-gray-50 border-b "
												>
													<td className="px-6 py-4">{v.license}</td>
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
											)
									)
								) : (
									<></>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			{deleteModal && (
				<WarningNotification
					id={tempId}
					func={{ refresh: refreshBtn, closeModal: closeDeleteModal, openSuccessModal, openFailureModal, setMessage }}
					type={'bus'}
					action={'bus'}
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

export default BusManagerment;
