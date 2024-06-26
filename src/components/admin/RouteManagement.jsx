/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../configs/env';
import WarningNotification from '../Noti/WarningNotification';
import SuccessNotification from '../Noti/SuccessNotification';
import FailureNotification from '../Noti/FailureNotification';
import RouteForm from './modal/RouteForm';
import { useNavigate } from 'react-router-dom';

const RouteManagement = () => {
	const navigate = useNavigate();

	// Data
	const [busStationAll, setBusStationAll] = useState([]);
	const [routeAll, setRouteAll] = useState([]);

	// Modal
	const [deleteModal, setDeleteModal] = useState(false);
	const [successModal, setSuccessModal] = useState(false);
	const [failureModal, setFailureModal] = useState(false);
	const [routeModal, setRouteModal] = useState(false);
	const [message, setMessage] = useState('');
	const [routeId, setRouteId] = useState('');

	useEffect(() => {
		getBusStationAll();
		getRouteAll();
	}, []);

	// Send GET request to retrieve bus stations information
	const getBusStationAll = async () => {
		await axios
			.get(
				API_URL + 'employee/bus-station'
				// , {headers: { Authorization: 'Bearer' + sessionStorage.getItem('token') },}
			)
			.then((res) => {
				setBusStationAll(res.data.data.filter((v) => v.status === '1'));
			})
			.catch((err) => {});
	};

	// Send GET request to retrieve trip
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

	// Open route edit modal
	const editBtn = async (id) => {
		setRouteId(id);
		openRouteModal();
	};

	// Open delete confirm modal
	const deleteBtn = async (id) => {
		setRouteId(id);
		setDeleteModal(true);
	};

	// Refresh page
	const refresh = () => {
		setRouteId('');
		getRouteAll();
	};

	// Close delete modal
	const closeDeleteModal = () => {
		setDeleteModal(false);
		setRouteId('');
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

	//Open Route Modal
	const openRouteModal = () => {
		setRouteModal(true);
	};

	// Close Route Modal
	const closeRouteModal = () => {
		setRouteModal(false);
	};

	return (
		<div className="w-full p-2">
			<div className="mb-8">
				<div className="flex justify-between">
					<h1 className="ml-16 lg:ml-0 font-bold text-2xl text-gray-700">Route Management</h1>
					<div className="flex justify-center items-center">
						<button
							className="mr-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center"
							onClick={openRouteModal}
						>
							Add
						</button>
						<button
							className="text-white bg-yellow-500 hover:bg-yellow-600  font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center"
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
										Name
									</th>
									<th
										scope="col"
										className="px-6 py-3"
									>
										Start Address
									</th>
									<th
										scope="col"
										className="px-6 py-3"
									>
										End Address
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
										Time
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
								{routeAll &&
									routeAll.map((v, i) => (
										<tr
											key={i}
											className="odd:bg-white even:bg-gray-50 border-b "
										>
											<th
												scope="row"
												className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
											>
												{v.name}
											</th>
											<td className="px-6 py-4">{v.start_address.name}</td>
											<td className="px-6 py-4">{v.end_address.name}</td>
											<td className="px-6 py-4">{v.price}</td>
											<td className="px-6 py-4">{v.time}</td>
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
					id={routeId}
					func={{
						refresh: refresh,
						closeModal: closeDeleteModal,
						openSuccessModal,
						openFailureModal,
						setMessage,
					}}
					type={'route'}
					action={'route'}
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
			{routeModal && (
				<RouteForm
					func={{ closeModal: closeRouteModal, openSuccessModal, openFailureModal, setMessage, refresh }}
					routeId={routeId}
					busStationAll={busStationAll}
				/>
			)}
		</div>
	);
};

export default RouteManagement;
