/** @format */

import axios from 'axios';
import { API_URL } from '../configs/env';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function TravelScheduleInfo(props) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [travelInfo, setTravelInfo] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		if (searchParams.get('start_address')) {
			const getChuyenXe = () => {
				axios.get(API_URL + 'chuyen-xe').then((res) => {
					let start_city = '';
					let end_city = '';
					let end_address = searchParams.get('end_address').toLowerCase().toString().trim();
					let start_address = searchParams.get('start_address').toLowerCase().toString().trim();
					let date = searchParams.get('date');
					res.data?.map((v) => {
						start_city = v.tuyen_xe.start_address.city.toLowerCase().toString().trim();
						end_city = v.tuyen_xe.end_address.city.toLowerCase().toString().trim();

						if (start_city.includes(start_address) && end_city.includes(end_address) && date === v.date) {
							setTravelInfo([
								...travelInfo,
								{
									id: v.id,
									end_address: v.tuyen_xe.end_address.city,
									start_address: v.tuyen_xe.start_address.city,
									date: v.date,
									start_time: v.start_time,
									end_time: v.end_time,
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
		<div className="lookupform mt-10 mb-32 mx-auto flex-1 w-full md:w-[75%] lg:w-[60%]">
			<h1 className="text-green-700 text-2xl text-center font-bold mb-5">LỊCH TRÌNH HIỆN CÓ</h1>
			<hr className="w-4/5 mx-auto h-0.5 bg-gray-200 md:w-2/5" />
			<div className="title border border-gray-300 flex flex-row items-center mt-10 mb-5 rounded-xl p-3 text-blue-700">
				<div className="basis-2/6 font-semibold">Tuyến xe</div>
				<div className="basis-1/6 font-semibold">Ngày đi</div>
				<div className="basis-1/6 font-semibold">Thời gian đi</div>
				<div className="basis-1/6 font-semibold">Thời gian đến</div>
				<div className="basis-1/6 font-semibold text-center">Giá vé</div>
				<div className="basis-1/6 font-semibold text-center"></div>
			</div>
			<div className="travel-info border border-gray-300 flex flex-col rounded-xl px-3 pt-3">
				{travelInfo.map((v, i) => (
					<div
						key={i}
						className="flex flex-row mb-3 justify-center items-center"
					>
						<div className="basis-2/6 font-semibold">
							<span className="text-orange-600">{v.start_address}</span> -&gt; {v.end_address}
						</div>
						<div className="basis-1/6 font-semibold">{v.date}</div>
						<div className="basis-1/6 font-semibold">{v.start_time}</div>
						<div className="basis-1/6 font-semibold">{v.end_time}</div>
						<div className="basis-1/6 font-semibold text-center">{v.price}</div>
						<NavLink
							to={`/dat-ve?id=${v.id}`}
							className="text-center basis-1/6 text-sm font-semibold text-white hover:bg-red-600 transition-all border border-transparent bg-red-500 py-1 px-2 rounded-full"
						>
							Chọn chuyến xe
						</NavLink>
					</div>
				))}
			</div>
		</div>
	);
}

export default TravelScheduleInfo;
