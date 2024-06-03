/** @format */

import axios from 'axios';
import { API_URL } from '../configs/env';
import { NavLink, useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function TravelScheduleInfo() {
	const [searchParams, setSearchParams] = useSearchParams();

	// Data
	const [trips, setTrips] = useState([]);

	// Send GET request to retrieve the trip that the customer needs
	useEffect(() => {
		if (searchParams.get('start_address')) {
			const getChuyenXe = () => {
				axios.get(API_URL + 'employee/trip').then((res) => {
					let start_city = '';
					let end_city = '';
					let end_address = searchParams.get('end_address').toLowerCase().toString().trim();
					let start_address = searchParams.get('start_address').toLowerCase().toString().trim();
					let date = searchParams.get('date');
					res.data?.map((v) => {
						start_city = v.route.start_address.city.toLowerCase().toString().trim();
						end_city = v.route.end_address.city.toLowerCase().toString().trim();

						if (start_city.includes(start_address) && end_city.includes(end_address) && date === v.date) {
							console.log(v);
							setTrips([
								...trips,
								{
									id: v.id,
									end_address: v.route.end_address.name,
									start_address: v.route.start_address.name,
									date: v.date,
									start_time: v.start_time.slice(0, 5),
									end_time: v.end_time.slice(0, 5),
									price: v.price,
								},
							]);
						}
					});
				});
			};
			getChuyenXe();
		}
	}, []);

	return (
		<div className="lookupform mt-10 mb-32 mx-auto flex-1 max-w-screen-lg">
			{/* <h1 className="text-green-700 text-2xl text-center font-bold mb-5">LỊCH TRÌNH HIỆN CÓ</h1> */}
			{searchParams.get('start_address') && (
				<>
					<h3 className="text-center text-2xl font-bold text-green-700 mb-5">
						KẾT QUẢ TÌM KIẾM ({trips.length}) : {searchParams.get('start_address')} -&gt;{' '}
						{searchParams.get('end_address')} {searchParams.get('date')}
					</h3>
					<hr className="w-4/5 mx-auto h-0.5 bg-gray-200 md:w-2/5 xl:w-1/5" />
				</>
			)}

			<hr className="w-4/5 mx-auto mb-4 h-0.5 bg-gray-200 md:w-2/5" />

			<table className="title w-full border text-blue-700">
				<thead>
					<tr className="text-left">
						<th
							scope="col"
							className="px-2 py-3 font-semibold"
						>
							Hành trình
						</th>
						<th
							scope="col"
							className="px-2 py-3 font-semibold"
						>
							Giờ đi
						</th>
						<th
							scope="col"
							className="px-2 py-3 font-semibold"
						>
							Giờ đến
						</th>
						<th
							scope="col"
							className="px-2 py-3 font-semibold"
						>
							Giá vé
						</th>
						<th
							scope="col"
							className="px-2 py-3 font-semibold"
						></th>
					</tr>
				</thead>
				<tbody>
					{trips.map((v, i) => (
						<tr
							key={i}
							className="odd:bg-white even:bg-gray-50 border-b text-black"
						>
							<td className="px-2 py-4">
								<span className="text-orange-600">{v.start_address}</span> -&gt; {v.end_address}
							</td>
							<td className="px-2 py-4">{v.start_time}</td>
							<td className="px-2 py-4">{v.end_time}</td>
							<td className="px-2 py-4">{v.price / 1000 + '.000'}</td>
							<td className="px-2 py-4 text-center">
								<NavLink
									to={`/dat-ve?id=${v.id}`}
									className="block text-center text-sm font-semibold text-white hover:bg-red-600 transition-all bg-red-500 py-1 px-2 rounded-2xl"
								>
									Đặt vé
								</NavLink>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default TravelScheduleInfo;
