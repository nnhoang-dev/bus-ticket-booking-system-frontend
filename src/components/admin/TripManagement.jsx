/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../configs/env';
import { useNavigate } from 'react-router-dom';
import WarningNotification from '../Noti/WarningNotification';
import SuccessNotification from '../Noti/SuccessNotification';
import FailureNotification from '../Noti/FailureNotification';
import TripForm from './modal/TripForm';

const TripManagement = () => {
	const navigate = useNavigate();

	// Modal
	const [deleteModal, setDeleteModal] = useState(false);
	const [successModal, setSuccessModal] = useState(false);
	const [failureModal, setFailureModal] = useState(false);
	const [tripModal, setTripModal] = useState(false);
	const [message, setMessage] = useState('');
	const [tripId, setTripId] = useState('');

	// Data
	const [routeAll, setRouteAll] = useState([]);
	const [busAll, setBusAll] = useState([]);
	const [driverAll, setDriverAll] = useState([]);
	const [tripAll, setTripAll] = useState([]);

	// Get data for input
	useEffect(() => {
		getRouteAll();
		getBusAll();
		getDriverAll();
		getTripAll();
	}, []);

	// Send GET request to retrieve routes information
	const getRouteAll = async () => {
		await axios
			.get(
				API_URL + 'employee/route'
				// , {headers: { Authorization: 'Bearer' + sessionStorage.getItem('token') },}
			)
			.then((res) => {
				setRouteAll(res.data.route.filter((v) => v.status === 1));
			})
			.catch((err) => {});
	};

	// Send GET request to retrieve buses information
	const getBusAll = async () => {
		await axios
			.get(
				API_URL + 'employee/bus'
				// , {headers: { Authorization: 'Bearer' + sessionStorage.getItem('token') },}
			)
			.then((res) => {
				setBusAll(res.data.data.filter((v) => v.status === 1));
			})
			.catch((err) => {});
	};

	// Send GET request to retrieve drivers information
	const getDriverAll = async () => {
		await axios
			.get(
				API_URL + 'employee/get-employees-by-role/driver'
				// , {headers: { Authorization: 'Bearer' + sessionStorage.getItem('token') },}
			)
			.then((res) => {
				setDriverAll(res.data.data.filter((v) => v.status === 1));
			})
			.catch((err) => {});
	};

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
				setTripAll(trips.filter((v) => v.status === 1));
			})
			.catch((err) => {});
	};

	// Open trip edit modal
	const editBtn = async (id) => {
		setTripId(id);
		openTripModal();
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

	//Open Trip Modal
	const openTripModal = () => {
		setTripModal(true);
	};

	// Close Trip Modal
	const closeTripModal = () => {
		setTripModal(false);
	};

	return (
		<div className="w-full p-2">
			<div className="mb-8">
				<div className="flex justify-between">
					<h1 className="ml-16 lg:ml-0 font-bold text-2xl text-gray-700">Trip Management</h1>
					<div className="flex justify-center items-center">
						<button
							className="mr-2 text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center"
							onClick={() => openTripModal()}
						>
							Add
						</button>
						<button
							className=" text-white bg-yellow-500 hover:bg-yellow-600  font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center"
							onClick={() => navigate('bin')}
						>
							Bin
						</button>
					</div>
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
					method={'put'}
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
			{tripModal && (
				<TripForm
					func={{ closeModal: closeTripModal, openSuccessModal, openFailureModal, setMessage, refresh }}
					tripId={tripId}
					routeAll={routeAll}
					busAll={busAll}
					driverAll={driverAll}
				/>
			)}
		</div>
	);
};

export default TripManagement;
