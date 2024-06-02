/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../configs/env';
import { useNavigate } from 'react-router-dom';
import WarningNotification from '../Noti/WarningNotification';
import SuccessNotification from '../Noti/SuccessNotification';
import FailureNotification from '../Noti/FailureNotification';
import CustomerForm from './modal/CustomerForm';

const CustomerManagement = () => {
	const navigate = useNavigate();

	// Data
	const [customerAll, setCustomerAll] = useState([]);

	// Modal
	const [deleteModal, setDeleteModal] = useState(false);
	const [successModal, setSuccessModal] = useState(false);
	const [failureModal, setFailureModal] = useState(false);
	const [customerModal, setCustomerModal] = useState(false);
	const [message, setMessage] = useState('');
	const [customerId, setCustomerId] = useState('');

	useEffect(() => {
		getCustomerAll();
	}, []);

	// Send GET request to retrieve customers information
	const getCustomerAll = async () => {
		await axios
			.get(API_URL + 'employee/customer', {
				headers: {
					Authorization: 'Bearer' + sessionStorage.getItem('token'),
				},
			})
			.then((res) => {
				setCustomerAll(res.data.customer);
			})
			.catch((err) => {
				if (err.response.status === 401) {
					navigate('/admin');
				}
			});
	};

	// Send GET request to retrieve employee that needs updating
	const editBtn = async (id) => {
		setCustomerId(id);
		openCustomerModal();
	};

	// Open delete confirm modal
	const deleteBtn = async (id) => {
		setCustomerId(id);
		setDeleteModal(true);
	};

	// Refresh page
	const refresh = () => {
		setCustomerId('');
		getCustomerAll();
	};

	// Close delete modal
	const closeDeleteModal = () => {
		setDeleteModal(false);
		setCustomerId('');
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

	// Open Customer Modal
	const openCustomerModal = () => {
		setCustomerModal(true);
	};

	// Close Customer Modal
	const closeCustomerModal = () => {
		setCustomerModal(false);
	};

	return (
		<div className="w-full p-2">
			<div className="mb-8">
				<div className="flex justify-between">
					<h1 className="font-bold text-2xl text-gray-700">Customer Management</h1>
					<button
						className="mx-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center"
						onClick={openCustomerModal}
					>
						Add
					</button>
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
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{customerAll &&
									customerAll.map((v, i) => (
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
											<td className="px-2 py-4">{v.gender == '0' ? 'Female' : 'Male'}</td>
											<td className="px-2 py-4">{v.date_of_birth}</td>
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
					id={customerId}
					func={{
						refresh: refresh,
						closeModal: closeDeleteModal,
						openSuccessModal,
						openFailureModal,
						setMessage,
					}}
					type={'customer'}
					action={'customer'}
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
			{customerModal && (
				<CustomerForm
					func={{ closeModal: closeCustomerModal, openSuccessModal, openFailureModal, setMessage, refresh }}
					customerId={customerId}
				/>
			)}
		</div>
	);
};

export default CustomerManagement;
