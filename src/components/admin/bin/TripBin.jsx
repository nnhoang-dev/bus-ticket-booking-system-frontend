/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../configs/env';
import { useNavigate } from 'react-router-dom';
import WarningNotification from '../../Noti/WarningNotification';
import SuccessNotification from '../../Noti/SuccessNotification';
import FailureNotification from '../../Noti/FailureNotification';

const TripBin = () => {
	const navigate = useNavigate();

	// Modal
	const [deleteModal, setDeleteModal] = useState(false);
	const [successModal, setSuccessModal] = useState(false);
	const [failureModal, setFailureModal] = useState(false);
	const [message, setMessage] = useState('');
	const [tripId, setTripId] = useState('');

	// Data
	const [tripAll, setTripAll] = useState([]);

	// Get data for input
	useEffect(() => {
		getTripAll();
	}, []);

	// Send GET request to retrieve trips information
	const getTripAll = async () => {
		await axios
			.get(
				API_URL + 'employee/trip'
				// , {headers: { Authorization: 'Bearer' + sessionStorage.getItem('token') },}
			)
			.then((res) => {
				let trips = res.data;
				trips = trips.filter((v) => new Date() < new Date(v.date + 'T' + v.start_time));
				setTripAll(trips.filter((v) => v.status === 0));
			})
			.catch((err) => {});
	};

	// Open route edit modal
	const restoreBtn = async (id) => {
		await axios
			.put(
				API_URL + `employee/trip/${id}`,
				{ status: 1 },
				{
					headers: { Authorization: 'Bearer' + sessionStorage.getItem('token') },
				}
			)
			.then((res) => {
				setMessage(res.data.message);
				openSuccessModal();
				refresh();
			})
			.catch((err) => {
				console.log(err.response.data);
				setMessage(err.response.data.message);
				openFailureModal();
			});
	};

	// Open delete confirm modal
	const deleteBtn = async (id) => {
		setTripId(id);
		setDeleteModal(true);
	};

	// Refresh page
	const refresh = () => {
		getTripAll();
		setTripId('');
	};

	// Close delete modal
	const closeDeleteModal = () => {
		setDeleteModal(false);
		setTripId('');
	};

	// Close Success Modal
	const closeSuccessModal = () => {
		setSuccessModal(false);
	};

	// Open Success Modal
	const openSuccessModal = () => {
		setSuccessModal(true);
	};
	// Close Failure Modal
	const closeFailureModal = () => {
		setFailureModal(false);
	};

	// Open Failure Modal
	const openFailureModal = () => {
		setFailureModal(true);
	};

	return (
		<div className="w-full p-2">
			<div className="mb-8">
				<div className="flex justify-between">
					<h1 className="ml-16 lg:ml-0 font-bold text-2xl text-gray-700">Trip Bin</h1>
					<button
						className="mr-2 text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center"
						onClick={() => navigate('/admin/trip')}
					>
						Trip Management
					</button>
				</div>
				<div className="-my-2 mt-2">
					<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
						<table className="w-full text-sm text-left  text-gray-500 ">
							<thead className="text-xs text-gray-700 uppercase bg-gray-50">
								<tr>
									<th
										scope="col"
										className="px-6 py-3"
									>
										Route
									</th>
									<th
										scope="col"
										className="px-6 py-3"
									>
										Seat
									</th>
									<th
										scope="col"
										className="px-6 py-3"
									>
										Time
									</th>
									<th
										scope="col"
										className="px-6 py-3"
									>
										Date
									</th>
									<th
										scope="col"
										className="px-6 py-3"
									>
										Bus Station
									</th>
									<th
										scope="col"
										className="px-6 py-3"
									>
										Price
									</th>
									<th
										scope="col"
										className="px-6 py-3"
									>
										Bus
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
								{tripAll.length !== 0 &&
									tripAll.map((v, i) => (
										<tr
											key={i}
											className="odd:bg-white even:bg-gray-50 border-b "
										>
											<th
												scope="row"
												className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
											>
												{v.route.name}
											</th>
											<td className="px-6 py-4">{v.seat}</td>
											<td className="px-6 py-4">{v.start_time + '-' + v.end_time}</td>
											<td className="px-6 py-4">{v.date}</td>
											<td className="px-6 py-4">
												{v.route.start_address.name + ' - ' + v.route.end_address.name}
											</td>
											<td className="px-6 py-4">{v.price / 1000 + '.000'}</td>
											<td className="px-6 py-4">{v.bus.license}</td>
											<td className="px-6 py-4">
												<button
													onClick={() => restoreBtn(v.id)}
													className="mr-2 font-medium text-blue-500 hover:underline"
												>
													Restore
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
					id={tripId}
					func={{
						refresh: refresh,
						closeModal: closeDeleteModal,
						openSuccessModal,
						openFailureModal,
						setMessage,
					}}
					type={'trip'}
					action={'trip'}
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

export default TripBin;
