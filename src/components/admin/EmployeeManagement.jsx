/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../configs/env';
import { useNavigate } from 'react-router-dom';
import WarningNotification from '../Noti/WarningNotification';
import SuccessNotification from '../Noti/SuccessNotification';
import FailureNotification from '../Noti/FailureNotification';

const EmployeeManagement = () => {
	const navigate = useNavigate();

	// Data
	const [employeeAll, setEmployeeAll] = useState([]);

	// Modal
	const [deleteModal, setDeleteModal] = useState(false);
	const [successModal, setSuccessModal] = useState(false);
	const [failureModal, setFailureModal] = useState(false);
	const [message, setMessage] = useState('');
	const [tempId, setTempId] = useState('');
	const [isCreate, setIsCreate] = useState(true);
	const [idEmployee, setIdEmployee] = useState('');

	// Input
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [email, setEmail] = useState('');
	const [address, setAddress] = useState('');
	const [gender, setGender] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [role, setRole] = useState('');

	useEffect(() => {
		getEmployeeAll();
	}, []);

	const getEmployeeAll = async () => {
		await axios
			.get(API_URL + 'employee/employee', {
				headers: {
					Authorization: 'Bearer' + sessionStorage.getItem('token'),
				},
			})
			.then((res) => {
				setEmployeeAll(res.data.employee);
			})
			.catch((err) => {
				if (err.response.status === 401) {
					navigate('/admin');
				}
			});
	};

	// Reset input
	const resetInput = () => {
		setFirstName('');
		setLastName('');
		setPhoneNumber('');
		setEmail('');
		setAddress('');
		setGender('');
		setDateOfBirth('');
		setRole('');
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
		setRole(data.role);
	};

	// Return role to UI
	const renderRole = (role) => {
		switch (role) {
			case 'manager':
				return 'Manager';
			case 'operator':
				return 'Operator';
			case 'driver':
				return 'Driver';
			case 'accountant':
				return 'Accountant';
			case 'customer_service':
				return 'Customer Service';
			default:
				break;
		}
	};

	// Send POST request to create a new employee
	const sendRequestCreateEmployee = async () => {
		let data = {
			first_name: firstName,
			last_name: lastName,
			phone_number: phoneNumber,
			email: email,
			address: address,
			gender: gender,
			date_of_birth: dateOfBirth,
			role,
		};

		// Check date

		await axios
			.post(API_URL + 'employee/employee', data, {
				headers: {
					Authorization: 'Bearer' + sessionStorage.getItem('token'),
				},
			})
			.then((res) => {
				setMessage(res.data.message);
				openSuccessModal();

				refresh();
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

	// Send PUT request to update a employee
	const sendRequestUpdateEmployee = async () => {
		let data = {
			first_name: firstName,
			last_name: lastName,
			phone_number: phoneNumber,
			email: email,
			address: address,
			gender: gender,
			date_of_birth: dateOfBirth,
			role,
		};

		await axios
			.put(API_URL + `employee/employee/${idEmployee}`, data, {
				headers: { Authorization: 'Bearer' + sessionStorage.getItem('token') },
			})
			.then((res) => {
				setMessage(res.data.message);
				openSuccessModal();

				refresh();
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

	// Send GET request to retrieve employee that needs updating
	const editBtn = async (id) => {
		await axios
			.get(API_URL + `employee/employee/${id}`, {
				headers: { Authorization: 'Bearer' + sessionStorage.getItem('token') },
			})
			.then((res) => {
				setInput(res.data.employee);
				setIsCreate(false);
				setIdEmployee(id);
			})
			.catch((err) => {
				if (err.response.status === 401) {
					navigate('/admin');
				}
			});
	};

	// Open delete confirm modal
	const deleteBtn = async (id) => {
		setTempId(id);
		setDeleteModal(true);
	};

	// Refresh page
	const refresh = () => {
		resetInput();
		setIsCreate(true);
		getEmployeeAll();
		setIdEmployee('');
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
			<h1 className="font-bold text-2xl text-gray-700">Employee Management</h1>
			<div className="my-8">
				<div className="max-w-screen-md mx-auto -my-2">
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
					</div>
					<div className="flex -mx-2 my-2">
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
						<div className="basis-1/2 mx-2">
							<select
								onChange={(e) => setRole(e.target.value)}
								value={role}
								id="role"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
							>
								<option selected>Role</option>
								<option value={'manager'}>Manager</option>
								<option value={'operator'}>Operator</option>
								<option value={'accountant'}>Accountant</option>
								<option value={'driver'}>Driver</option>
								<option value={'customer_service'}>Customer Service</option>
							</select>
						</div>
					</div>
					<div className="flex -mx-2">
						{isCreate ? (
							<button
								className="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								onClick={sendRequestCreateEmployee}
							>
								Add
							</button>
						) : (
							<button
								className="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								onClick={sendRequestUpdateEmployee}
							>
								Update
							</button>
						)}
						<button
							className="mx-2 text-white bg-yellow-500 hover:bg-yellow-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
							onClick={refresh}
						>
							Refresh
						</button>
					</div>
				</div>
				<div className="max-w-screen-xl mx-auto -my-2 mt-8">
					<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
						<table className="w-full text-sm text-left  text-gray-500 ">
							<thead className="text-xs text-gray-700 uppercase bg-gray-50">
								<tr>
									<th
										scope="col"
										className="px-2 py-3"
									>
										First Name
									</th>
									<th
										scope="col"
										className="px-2 py-3"
									>
										Last Name
									</th>
									<th
										scope="col"
										className="px-2 py-3"
									>
										Email
									</th>
									<th
										scope="col"
										className="px-2 py-3"
									>
										Phone Number
									</th>
									<th
										scope="col"
										className="px-2 py-3"
									>
										Address
									</th>
									<th
										scope="col"
										className="px-2 py-3"
									>
										Gender
									</th>
									<th
										scope="col"
										className="px-2 py-3"
									>
										Date Of Birth
									</th>
									<th
										scope="col"
										className="px-2 py-3"
									>
										Role
									</th>
									<th
										scope="col"
										className="px-2 py-3"
									>
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{employeeAll &&
									employeeAll.map((v, i) => (
										<tr
											key={i}
											className="odd:bg-white even:bg-gray-50 border-b"
										>
											<td className="px-2 py-4">{v.first_name}</td>
											<td className="px-2 py-4">{v.last_name}</td>
											<td className="px-2 py-4">{v.email}</td>
											<td className="px-2 py-4">{v.phone_number}</td>
											<td className="px-2 py-4 ">
												<p className="line-clamp-1">{v.address}</p>
											</td>
											<td className="px-2 py-4">{v.gender == '1' ? 'Male' : 'Female'}</td>
											<td className="px-2 py-4">{v.date_of_birth}</td>
											<td className="px-2 py-4">{renderRole(v.role)}</td>
											<td className="px-2 py-4">
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
					type={'employee'}
					action={'employee'}
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

export default EmployeeManagement;
