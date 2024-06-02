/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../configs/env';
import { useNavigate } from 'react-router-dom';

const BusForm = ({ func, busId }) => {
	const navigate = useNavigate();
	// Input
	const [license, setLicense] = useState('');

	useEffect(() => {
		if (busId !== '') {
			axios
				.get(API_URL + `employee/bus/${busId}`, {
					// headers: { Authorization: 'Bearer' + sessionStorage.getItem('token') },
				})
				.then((res) => {
					setLicense(res.data.data.license);
				})
				.catch((err) => {
					if (err.response.status === 401) {
						navigate('/admin');
					}
				});
		}
	}, []);

	// Send POST request to create a new bus
	const sendRequestCreateBus = async () => {
		const data = {
			license,
		};

		await axios
			.post(API_URL + 'employee/bus', data, {
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

	// Send PUT request to update a bus
	const sendRequestUpdateBus = async () => {
		const data = {
			license,
		};

		await axios
			.put(API_URL + `employee/bus/${busId}`, data, {
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
								{busId === '' ? 'Create a new bus' : 'Update bus'}
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
										htmlFor="license"
										className="block mb-2 text-sm font-medium text-gray-900"
									>
										License
									</label>
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

								{busId === '' ? (
									<button
										className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
										onClick={() => sendRequestCreateBus()}
									>
										Add
									</button>
								) : (
									<button
										className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
										onClick={() => sendRequestUpdateBus()}
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

export default BusForm;
