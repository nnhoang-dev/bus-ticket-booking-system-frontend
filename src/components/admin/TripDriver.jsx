/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../configs/env';
import { useNavigate } from 'react-router-dom';

const TripDriver = () => {
	const navigate = useNavigate();

	const [tripAll, setTripAll] = useState([]);
	const [idEmployee, setIdEmployee] = useState('');

	useEffect(() => {
		getTripAll();
	}, []);
	const getTripAll = async () => {
		const token = sessionStorage.getItem('token');
		let idEmployee = '';
		if (token) {
			axios
				.get(API_URL + 'employee/me', { headers: { Authorization: `Bearer ${token}` } })
				.then(async (res) => {
					idEmployee = res.data.employee.id;
					await axios
						.get(
							API_URL + 'employee/trip'
							// , {headers: { Authorization: 'Bearer' + sessionStorage.getItem('token') },}
						)
						.then((res) => {
							let trips = res.data;
							trips = trips.filter((v) => new Date() < new Date(v.date + 'T' + v.start_time) && idEmployee === v.driver_id);
							setTripAll(trips);
						})
						.catch((err) => {});
				})
				.catch((err) => {
					navigate('/admin');
				});
		} else {
			navigate('/admin');
		}
	};
	return (
		<div className="w-full p-2">
			<h1 className="font-bold text-2xl text-gray-700">My Trip</h1>
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
								Bus
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
									<td className="px-6 py-4">{v.route.start_address.name + ' - ' + v.route.end_address.name}</td>
									<td className="px-6 py-4">{v.bus.license}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default TripDriver;
