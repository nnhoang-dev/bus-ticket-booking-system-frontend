/** @format */

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function HomeSearch(props) {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const [start_address, setStartAddress] = useState('');
	const [end_address, setEndAddress] = useState('');
	const [date, setDate] = useState('');

	const handleSearch = () => {
		if (start_address && end_address && date) {
			navigate(`/lich-trinh?start_address=${start_address}
					  &end_address=${end_address}
					  &date=${date}`);
			window.location.reload();
		} else {
			alert('Vui lòng điền đầy đủ thông tin!');
		}
	};

	useEffect(() => {
		setStartAddress(searchParams.get('start_address'));
		setEndAddress(searchParams.get('end_address'));
		setDate(searchParams.get('date'));
	}, []);
	return (
		<div className="mt-10 mb-20">
			<h3 className="text-center text-2xl font-bold text-green-700 mb-5">LỰA CHỌN CHUYẾN ĐI</h3>
			<hr className="w-4/5 mx-auto h-0.5 bg-gray-200 md:w-2/5 xl:w-1/5" />
			<div
				className="max-w-screen-lg bg-white text-black mx-auto mt-10 p-5 border border-orange-400 shadow-2xl rounded-lg 
				flex flex-col md:flex-row items-center gap-2"
			>
				<div className="input-search flex flex-col w-full sm:basis-1/4  mb-3">
					<div className="mb-3 pl-3">
						<span className="font-semibold">Điểm đi</span>
					</div>
					<input
						value={start_address}
						className="rounded-lg border-slate-300"
						type="text"
						onChange={(e) => setStartAddress(e.target.value)}
					/>
				</div>
				<div className="input-search flex flex-col w-full sm:basis-1/4 mb-3">
					<div className="mb-3 pl-3">
						<span className="font-semibold">Điểm đến</span>
					</div>
					<input
						value={end_address}
						className="rounded-lg border-slate-300"
						type="text"
						onChange={(e) => setEndAddress(e.target.value)}
					/>
				</div>
				<div className="input-search flex flex-col w-full sm:basis-1/4 mb-3">
					<div className="mb-3 pl-3">
						<span className="font-semibold">Ngày đi</span>
					</div>
					<input
						value={date}
						className="rounded-lg border-slate-300"
						type="date"
						onChange={(e) => setDate(e.target.value)}
					/>
				</div>
				<div className="mt-5 search-button flex item-center basis-1/4">
					<button
						className="font-semibold text-white hover:bg-red-600 transition-all mx-2 border border-transparent bg-red-500 px-10 py-3 rounded-full"
						onClick={handleSearch}
					>
						Tìm chuyến xe
					</button>
				</div>
			</div>
		</div>
	);
}

export default HomeSearch;
