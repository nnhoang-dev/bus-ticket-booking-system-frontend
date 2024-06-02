/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../configs/env';
import WarningNotification from '../Noti/WarningNotification';
import SuccessNotification from '../Noti/SuccessNotification';
import FailureNotification from '../Noti/FailureNotification';
import BusStationForm from './modal/BusStationForm';

const BusStationManagement = () => {
	// Modal
	const [deleteModal, setDeleteModal] = useState(false);
	const [successModal, setSuccessModal] = useState(false);
	const [failureModal, setFailureModal] = useState(false);
	const [busStationModal, setBusStationModal] = useState(false);
	const [message, setMessage] = useState('');
	const [tempId, setTempId] = useState('');
	const [busStationId, setBusStationId] = useState('');

	// Data
	const [busStationAll, setBusStationAll] = useState([]);
	const [provinces, setProvinces] = useState([]);

	useEffect(() => {
		getBusStationAll();
		getProvinces();
	}, []);

	// Send GET request to retrieve provinces information
	const getProvinces = () => {
		axios.get('https://vapi.vnappmob.com/api/province/').then((res) => {
			setProvinces(
				res.data.results.reduce((previousValue, currentValue) => {
					currentValue.province_name = currentValue.province_name.replace('Tỉnh', '');
					currentValue.province_name = currentValue.province_name.replace('Thành phố', '');
					currentValue.province_name = currentValue.province_name.trim();
					previousValue.push(currentValue.province_name);
					return previousValue;
				}, [])
			);
		});
	};

	// Send GET request to retrieve bus stations information
	const getBusStationAll = async () => {
		await axios
			.get(
				API_URL + 'employee/bus-station'
				// , {headers: { Authorization: 'Bearer' + sessionStorage.getItem('token') },}
			)
			.then((res) => {
				setBusStationAll(res.data.data);
			})
			.catch((err) => {});
	};

	// Open bus staion edit modal
	const editBtn = async (id) => {
		setBusStationId(id);
		openBusStationModal();
	};

	// Open delete modal
	const deleteBtn = async (id) => {
		setTempId(id);
		setDeleteModal(true);
	};

	// Refresh page
	const refresh = () => {
		getBusStationAll();
		setBusStationId('');
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

	//Open Bus Station Modal
	const openBusStationModal = () => {
		setBusStationModal(true);
	};

	// Close Bus Station Modal
	const closeBusStationModal = () => {
		setBusStationModal(false);
	};

	return (
		<div className="w-full p-2">
			<div className="mb-8 ">
				<div className=" flex justify-between">
					<h1 className="ml-16 lg:ml-0 font-bold text-2xl text-gray-700">Bus Station Management</h1>
					<button
						className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center"
						onClick={openBusStationModal}
					>
						Add
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
										Name
									</th>
									<th
										scope="col"
										className="px-6 py-3"
									>
										City/Province
									</th>
									<th
										scope="col"
										className="px-6 py-3"
									>
										Address
									</th>
									<th
										scope="col"
										className="px-6 py-3"
									>
										Phone Number
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
								{busStationAll.length !== 0 &&
									busStationAll.map((v, i) => (
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
											<td className="px-6 py-4">{v.city}</td>
											<td className="px-6 py-4">
												<p className="line-clamp-1">{v.address}</p>
											</td>
											<td className="px-6 py-4">{v.phone_number}</td>
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
					id={tempId}
					func={{
						refresh: refresh,
						closeModal: closeDeleteModal,
						openSuccessModal,
						openFailureModal,
						setMessage,
					}}
					type={'bus station'}
					action={'bus-station'}
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
			{busStationModal && (
				<BusStationForm
					func={{ closeModal: closeBusStationModal, openSuccessModal, openFailureModal, setMessage, refresh }}
					busStationId={busStationId}
					provinces={provinces}
				/>
			)}
		</div>
	);
};

export default BusStationManagement;
