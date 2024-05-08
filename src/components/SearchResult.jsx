/** @format */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../configs/env';
import { useNavigate, useSearchParams } from 'react-router-dom';

function SearchResult(props) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [travelInfo, setTravelInfo] = useState([]);
	const navigate = useNavigate();

	let start_address = searchParams.get('start_address');
	let end_address = searchParams.get('end_address');
	let date = searchParams.get('date');

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
						console.log(v);
						if (start_city.includes(start_address) && end_city.includes(end_address) && date === v.date) {
							setTravelInfo([
								...travelInfo,
								{
									id: v.id,
									end_city: v.tuyen_xe.end_address.city,
									start_city: v.tuyen_xe.start_address.city,
									start_address: v.tuyen_xe.start_address.name,
									end_address: v.tuyen_xe.end_address.name,
									date: v.date,
									start_time: v.start_time,
									end_time: v.end_time,
									price: v.price,
									vacant_seat: v.seat ? 36 - v.seat.split(',').length : 36,
								},
							]);
						}
					});
				});
			};
			getChuyenXe();
		}
	}, []);

	const chooseChuyenXe = (id) => {
		navigate(`/bookingticket?id=${id}`);
	};
	return (
		<div>
			{start_address && (
				<>
					<h3 className="text-center text-2xl font-bold text-green-700 mb-5">
						KẾT QUẢ TÌM KIẾM ({travelInfo.length}) : {start_address} -&gt; {end_address} {date}
					</h3>
					<hr className="w-4/5 mx-auto h-0.5 bg-gray-200 md:w-2/5 xl:w-1/5" />
				</>
			)}

			{travelInfo &&
				travelInfo.map((data, i) => (
					<div
						key={i}
						className="md:w-[75%] lg:w-[60%] border border-slate-300 hover:border-orange-500 mx-auto rounded-xl my-10 hover:shadow-2xl transition-all"
					>
						<div className="flex flex-row p-5 -mx-2">
							<div className="basis-full mx-2">
								<div className="flex flex-col">
									<div className="flex flex-row items-center mb-2">
										<div className="text-md sm:text-lg font-semibold">Thời gian đi</div>
										<div className="hidden lg:flex pl-2">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="currentColor"
												className="w-6 h-6"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
												/>
											</svg>
										</div>
									</div>
									<div>
										<p className="font-light text-md sm:text-xl">{data.start_time}</p>
									</div>
									<div>
										<p className="text-gray-500 mt-2">{data.start_address}</p>
									</div>
								</div>
							</div>

							<div className="basis-full mx-2">
								<div className="flex flex-col">
									<div className="flex flex-row items-center mb-2">
										<div className="text-md sm:text-lg font-semibold">Thời gian đến</div>
										<div className="hidden lg:flex pl-2">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="currentColor"
												className="w-6 h-6"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
												/>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
												/>
											</svg>
										</div>
									</div>
									<div>
										<p className="font-light text-md sm:text-xl">{data.end_time}</p>
									</div>
									<div>
										<p className="text-gray-500 mt-2">{data.end_address}</p>
									</div>
								</div>
							</div>

							<div className="basis-full mx-2">
								<div className="flex flex-col">
									<div className="flex flex-row items-center mb-2">
										<div className="text-md sm:text-lg font-semibold">Ghế trống</div>
										<div className="hidden lg:flex pl-2">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="currentColor"
												className="w-6 h-6"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
												/>
											</svg>
										</div>
									</div>
									<div className="font-light text-md sm:text-xl">{data.vacant_seat} chỗ</div>
								</div>
							</div>

							<div className="basis-full mx-2">
								<div className="flex flex-col">
									<div className="text-orange-500 text-md sm:text-lg font-semibold mb-3 text-center">Giá vé: {data.price}</div>
									<div className="mx-auto">
										<button
											className=" text-md sm:text-lg font-semibold text-white  hover:bg-red-600 transition-all mx-auto border border-transparent bg-red-500 px-5 py-3 rounded-3xl"
											onClick={() => chooseChuyenXe(data.id)}
										>
											Chọn chuyến
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
		</div>
	);
}

export default SearchResult;
