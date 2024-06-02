/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../configs/env';
import WarningNotification from '../Noti/WarningNotification';
import SuccessNotification from '../Noti/SuccessNotification';
import FailureNotification from '../Noti/FailureNotification';
import { useNavigate } from 'react-router-dom';
import BusForm from './modal/BusForm';

const BusManagerment = () => {
	const navigate = useNavigate();
	// Data
	const [busAll, setBusAll] = useState([]);

	// Modal
	const [deleteModal, setDeleteModal] = useState(false);
	const [successModal, setSuccessModal] = useState(false);
	const [failureModal, setFailureModal] = useState(false);
	const [createModal, setCreateModal] = useState(false);
	const [message, setMessage] = useState('');
	const [busId, setBusId] = useState('');

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

	// Open bus edit modal
	const editBtn = async (id) => {
		setBusId(id);
		setCreateModal(true);
	};

	// Open delete modal
	const deleteBtn = async (id) => {
		setBusId(id);
		setDeleteModal(true);
	};

	// Refresh page
	const refresh = () => {
		getBusAll();
		setBusId('');
	};

	// Close create modal
	const closeCreateModal = () => {
		setCreateModal(false);
		setBusId('');
	};
	// Close delete modal
	const closeDeleteModal = () => {
		setDeleteModal(false);
		setBusId('');
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
			<div className="flex justify-between">
				<h1 className="ml-16 lg:ml-0 font-bold text-2xl text-gray-700">Bus Management</h1>
				<button
					className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center"
					onClick={() => setCreateModal(true)}
				>
					Add
				</button>
			</div>
			<div className="mb-8">
				<div className="flex gap-4  -my-2 mt-2">
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
					<div
						className={`basis-1/2 relative overflow-x-auto ${
							busAll.length > 10 ? 'shadow-md' : ''
						} sm:rounded-lg`}
					>
						<table
							className={`w-full text-sm text-left text-gray-500 ${
								busAll.length < 11 ? 'shadow-md' : ''
							}`}
						>
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
					id={busId}
					func={{
						refresh: refresh,
						closeModal: closeDeleteModal,
						openSuccessModal,
						openFailureModal,
						setMessage,
					}}
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
			{createModal && (
				<BusForm
					func={{
						closeModal: closeCreateModal,
						openSuccessModal,
						openFailureModal,
						setMessage,
						refresh,
					}}
					busId={busId}
				/>
			)}
		</div>
	);
};

export default BusManagerment;
