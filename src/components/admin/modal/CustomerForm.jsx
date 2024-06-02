/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../configs/env';
import { useNavigate } from 'react-router-dom';

const CustomerForm = ({ func, customerId }) => {
	const navigate = useNavigate();

	// Input
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [email, setEmail] = useState('');
	const [address, setAddress] = useState('');
	const [gender, setGender] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');

	// Send GET request to retrieve bus station that needs updating
	useEffect(() => {
		if (customerId !== '') {
			axios
				.get(API_URL + `employee/customer/${customerId}`, {
					headers: {
						Authorization: 'Bearer' + sessionStorage.getItem('token'),
					},
				})
				.then((res) => {
					setInput(res.data.customer);
				})
				.catch((err) => {
					if (err.response.status === 401) {
						navigate('/admin');
					}
				});
		}
	}, []);

	// Send POST request to create a new customer
	const sendRequestCreateCustomer = async () => {
		let data = {
			first_name: firstName,
			last_name: lastName,
			phone_number: phoneNumber,
			email: email,
			address: address,
			gender: gender,
			date_of_birth: dateOfBirth,
		};

		// Check date
		console.log(data);
		await axios
			.post(API_URL + 'employee/customer', data, {
				headers: {
					Authorization: 'Bearer' + sessionStorage.getItem('token'),
				},
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

	// Send PUT request to update a customer
	const sendRequestUpdateCustomer = async () => {
		let data = {
			first_name: firstName,
			last_name: lastName,
			phone_number: phoneNumber,
			email: email,
			address: address,
			gender: gender,
			date_of_birth: dateOfBirth,
		};
		await axios
			.put(API_URL + `employee/customer/${customerId}`, data, {
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
		setFirstName(data.first_name);
		setLastName(data.last_name);
		setPhoneNumber(data.phone_number);
		setEmail(data.email);
		setAddress(data.address);
		setGender(data.gender);
		setDateOfBirth(data.date_of_birth);
	};

	return (
		<div className="fixed z-50 top-0 left-0 bg-black/20 w-full h-full">
			<div
				id="authentication-modalChangePassword"
				className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
			>
				<div className="relative p-4 w-full max-w-5xl max-h-full mx-auto">
					{/* <!-- Modal content --> */}
					<div className="relative bg-white rounded-lg shadow ">
						{/* <!-- Modal header --> */}
						<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
							<h3 className="text-xl font-semibold text-gray-900">
								{customerId === '' ? 'Create a new employee' : 'Update employee'}
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
							<div className="">
								<div className="flex -mx-2 my-2">
									<div className="basis-1/2 mx-2">
										<input
											onChange={(e) => setFirstName(e.target.value)}
											value={firstName}
											type="text"
											id="first_name"
											className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
											placeholder="First Name"
											required
										/>
									</div>
									<div className="basis-1/2 mx-2">
										<input
											onChange={(e) => setLastName(e.target.value)}
											value={lastName}
											type="text"
											id="first_name"
											className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
											placeholder="Last Name"
											required
										/>
									</div>
								</div>
								<div className="flex -mx-2 my-2">
									<div className="basis-1/2 mx-2">
										<input
											onChange={(e) => setPhoneNumber(e.target.value)}
											value={phoneNumber}
											type="text"
											id="first_name"
											className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
											placeholder="Phone Number"
											required
										/>
									</div>
									<div className="basis-1/2 mx-2">
										<input
											onChange={(e) => setEmail(e.target.value)}
											value={email}
											type="text"
											id="first_name"
											className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
											placeholder="Email"
											required
										/>
									</div>
								</div>
								<div className="flex -mx-2 my-2">
									<div className="basis-1/2 mx-2">
										<select
											onChange={(e) => setGender(e.target.value)}
											value={gender}
											id="role"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
										>
											<option selected>Gender</option>
											<option value={'1'}>Male</option>
											<option value={'0'}>Female</option>
										</select>
									</div>
									<div className="basis-1/2 mx-2">
										<input
											onChange={(e) => setDateOfBirth(e.target.value)}
											value={dateOfBirth}
											type="date"
											id="dateOfBirth"
											className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
											required
										/>
									</div>
								</div>
								<div className="flex -mx-2 my-2">
									<div className="basis-full mx-2">
										<input
											onChange={(e) => setAddress(e.target.value)}
											value={address}
											type="text"
											id="first_name"
											className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
											placeholder="Address"
											required
										/>
									</div>
								</div>

								{customerId === '' ? (
									<button
										className="mt-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
										onClick={() => sendRequestCreateCustomer()}
									>
										Add
									</button>
								) : (
									<button
										className="mt-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
										onClick={() => sendRequestUpdateCustomer()}
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

export default CustomerForm;
