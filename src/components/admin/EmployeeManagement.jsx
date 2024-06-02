/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../configs/env';
import { useNavigate } from 'react-router-dom';
import WarningNotification from '../Noti/WarningNotification';
import SuccessNotification from '../Noti/SuccessNotification';
import FailureNotification from '../Noti/FailureNotification';
import EmployeeForm from './modal/EmployeeForm';

const EmployeeManagement = () => {
	const navigate = useNavigate();

	// Data
	const [employeeAll, setEmployeeAll] = useState([]);

	// Modal
	const [deleteModal, setDeleteModal] = useState(false);
	const [successModal, setSuccessModal] = useState(false);
	const [failureModal, setFailureModal] = useState(false);
	const [employeeModal, setEmployeeModal] = useState(false);
	const [message, setMessage] = useState('');
	const [employeeId, setEmployeeId] = useState('');

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

	// Open employee edit modal
	const editBtn = async (id) => {
		setEmployeeId(id);
		openEmployeeModal();
	};

	// Open delete confirm modal
	const deleteBtn = async (id) => {
		setEmployeeId(id);
		setDeleteModal(true);
	};

	// Refresh page
	const refresh = () => {
		getEmployeeAll();
		setEmployeeId('');
	};

	// Close delete modal
	const closeDeleteModal = () => {
		setDeleteModal(false);
		setEmployeeId('');
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

	// Open Employee Modal
	const openEmployeeModal = () => {
		setEmployeeModal(true);
	};

	// Close Employee Modal
	const closeEmployeeModal = () => {
		setEmployeeModal(false);
	};

	return (
		<div className="w-full p-2">
			<div className="mb-8">
				<div className="flex justify-between">
					<h1 className="ml-16 lg:ml-0 font-bold text-2xl text-gray-700">Employee Management</h1>
					<button
						className="mx-2 text-white bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center"
						onClick={openEmployeeModal}
					>
						Add
					</button>
				</div>
				<div className="-my-2 mt-8">
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
											<td className="px-2 py-4">{v.gender === 1 ? 'Male' : 'Female'}</td>
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
					id={employeeId}
					func={{
						refresh: refresh,
						closeModal: closeDeleteModal,
						openSuccessModal,
						openFailureModal,
						setMessage,
					}}
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
			{employeeModal && (
				<EmployeeForm
					func={{ closeModal: closeEmployeeModal, openSuccessModal, openFailureModal, setMessage, refresh }}
					employeeId={employeeId}
				/>
			)}
		</div>
	);
};

export default EmployeeManagement;
