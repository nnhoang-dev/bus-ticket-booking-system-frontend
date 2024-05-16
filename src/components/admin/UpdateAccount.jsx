/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../configs/env';
import { useNavigate } from 'react-router-dom';

const UpdateAccount = ({ setModelUpdate, getEmployee }) => {
	const navigate = useNavigate();
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [gender, setGender] = useState('');
	const [address, setAddress] = useState('');

	useEffect(() => {
		const token = sessionStorage.getItem('token');
		if (token) {
			axios
				.get(API_URL + 'employee/me', { headers: { Authorization: `Bearer ${token}` } })
				.then((res) => {
					setInput(res.data.employee);
				})
				.catch((err) => {
					if (err.response.status === 401) {
						navigate('/admin');
					}
					alert(err.response.data.message);
				});
		} else {
			navigate('/admin');
		}
	}, []);

	const updateAccount = async () => {
		let data = {
			first_name: firstName,
			last_name: lastName,
			date_of_birth: dateOfBirth,
			gender: gender,
			address: address,
		};

		const token = sessionStorage.getItem('token');
		if (token) {
			axios
				.put(API_URL + 'employee/update-my-account', data, { headers: { Authorization: `Bearer ${token}` } })
				.then((res) => {
					alert(res.data.message);
					getEmployee();
					resetInput();
					setModelUpdate(false);
				})
				.catch((err) => {
					if (err.response.status === 401) {
						navigate('/admin');
					}
					alert(err.response.data.message);
				});
		} else {
			navigate('/admin');
		}
	};

	const resetInput = () => {
		setFirstName('');
		setLastName('');
		setDateOfBirth('');
		setGender('');
		setAddress('');
	};

	const setInput = (data) => {
		setFirstName(data.first_name);
		setLastName(data.last_name);
		setDateOfBirth(data.date_of_birth);
		setGender(data.gender);
		setAddress(data.address);
	};
	return (
		<div className="fixed bg-black/20 w-full h-full">
			<div
				id="authentication-modalChangePassword"
				className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
			>
				<div className="relative p-4 w-full max-w-screen-md max-h-full mx-auto">
					{/* <!-- Modal content --> */}
					<div className="relative bg-white rounded-lg shadow ">
						{/* <!-- Modal header --> */}
						<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
							<h3 className="text-xl font-semibold text-gray-900">Update Account</h3>
							<button
								onClick={() => setModelUpdate(false)}
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
								<span className="sr-only">Close modalChangePassword</span>
							</button>
						</div>
						{/* <!-- Modal body --> */}
						<div className="p-4 md:p-5">
							<div className="flex flex-col">
								<div className="flex -mx-2 mt-2">
									<div className="basis-1/2 mx-2">
										<label
											htmlFor="firstName"
											className="block mb-2 text-sm font-medium text-gray-900"
										>
											First Name
										</label>
										<input
											type="text"
											id="firstName"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
											value={firstName}
											onChange={(e) => setFirstName(e.target.value)}
											required
										/>
									</div>
									<div className="basis-1/2 mx-2">
										<label
											htmlFor="lastName"
											className="block mb-2 text-sm font-medium text-gray-900"
										>
											Last Name
										</label>
										<input
											type="text"
											id="lastName"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
											value={lastName}
											onChange={(e) => setLastName(e.target.value)}
											required
										/>
									</div>
								</div>
								<div className="flex -mx-2 mt-2">
									<div className="basis-1/2 mx-2">
										<label
											htmlFor="dateOfBirth"
											className="block mb-2 text-sm font-medium text-gray-900"
										>
											Date of Birth
										</label>
										<input
											type="date"
											id="dateOfBirth"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
											value={dateOfBirth}
											onChange={(e) => setDateOfBirth(e.target.value)}
											required
										/>
									</div>
									<div className="basis-1/2 mx-2">
										<label
											htmlFor="gender"
											className="block mb-2 text-sm font-medium text-gray-900"
										>
											Gender
										</label>
										<select
											onChange={(e) => setGender(e.target.value)}
											value={gender}
											id="gender"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
										>
											<option selected>Gender</option>
											<option value={'1'}>Male</option>
											<option value={'0'}>Female</option>
										</select>
									</div>
								</div>
								<div className="flex mt-2">
									<div className="basis-full">
										<label
											htmlFor="address"
											className="block mb-2 text-sm font-medium text-gray-900"
										>
											Address
										</label>
										<input
											type="text"
											id="address"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
											value={address}
											onChange={(e) => setAddress(e.target.value)}
											required
										/>
									</div>
								</div>

								<button
									type="button"
									className="mt-8 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									onClick={updateAccount}
								>
									Update
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UpdateAccount;
