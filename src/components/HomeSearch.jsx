/** @format */

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FailureNotification from './Noti/FailureNotification';
import axios from 'axios';

function HomeSearch(props) {
	// Modal
	const [failureModal, setFailureModal] = useState(false);
	const [message, setMessage] = useState('');

	const [startAddressSearchModal, setStartAddressSearchModal] = useState(false);
	const [endAddressSearchModal, setEndAddressSearchModal] = useState(false);

	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const [start_address, setStartAddress] = useState('');
	const [end_address, setEndAddress] = useState('');
	const [endAddressSearch, setEndAddressSearch] = useState('');
	const [startAddressSearch, setStartAddressSearch] = useState('');
	const [provinces, setProvinces] = useState([]);
	const [date, setDate] = useState('');

	const handleSearch = () => {
		if (start_address && end_address && date) {
			navigate(`/lich-trinh?start_address=${start_address}
					  &end_address=${end_address}
					  &date=${date}`);
			window.location.reload();
		} else {
			setMessage('Vui lòng điền đầy đủ thông tin!');
			openFailureModal();
		}
	};

	useEffect(() => {
		setStartAddress(searchParams.get('start_address') ?? '');
		setEndAddress(searchParams.get('end_address') ?? '');
		setDate(searchParams.get('date') ?? '');
		getProvinces();
	}, []);

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

	const closeFailureModal = () => {
		setFailureModal(false);
	};

	const openFailureModal = () => {
		setFailureModal(true);
	};
	return (
		<>
			<div className="mt-10 mb-20">
				<h3 className="text-center text-2xl font-bold text-green-700 mb-5">LỰA CHỌN CHUYẾN ĐI</h3>
				<hr className="w-4/5 mx-auto h-0.5 bg-gray-200 md:w-2/5 xl:w-1/5" />
				<div
					className="max-w-screen-lg bg-white text-black mx-auto mt-10 p-5 border border-orange-400 shadow-2xl rounded-lg 
				flex flex-col md:flex-row items-center gap-2"
				>
					<div className="input-search flex flex-col w-full sm:basis-1/4  mb-3">
						<label className="mb-3 font-semibold">Điểm đi</label>
						<div className="rounded-lg relative h-10 border border-slate-300 cursor-pointer">
							<div
								className="w-full h-full flex items-center"
								onClick={() => setStartAddressSearchModal(true)}
							>
								<span className="ml-2">{start_address}</span>
							</div>
							{startAddressSearchModal && (
								<div className="absolute top-0 left-0 w-full bg-white rounded-xl shadow-lg ">
									<input
										list="start_address"
										value={startAddressSearch}
										className="h-10 w-full rounded-lg border-slate-300 cursor-pointer"
										type="text"
										onChange={(e) => setStartAddressSearch(e.target.value)}
									/>
									<ul className="w-full overflow-y-scroll max-h-52">
										{startAddressSearch === ''
											? provinces.map((v, i) => {
													return (
														<li
															key={i}
															className="ml-10 my-2"
															onClick={() => {
																setStartAddress(v);
																setStartAddressSearchModal(false);
															}}
														>
															{v}
														</li>
													);
											  })
											: provinces
													.filter((item) => item.toLowerCase().includes(startAddressSearch.toLowerCase()))
													.map((item, i) => (
														<li
															key={i}
															className="ml-10 my-2"
															onClick={() => {
																setStartAddress(item);
																setStartAddressSearchModal(false);
																console.log(startAddressSearchModal);
															}}
														>
															{item}
														</li>
													))}
									</ul>
								</div>
							)}
						</div>
					</div>
					<div className="input-search flex flex-col w-full sm:basis-1/4  mb-3">
						<label className="mb-3 font-semibold">Điểm đến</label>
						<div className="rounded-lg relative h-10 border border-slate-300 cursor-pointer">
							<div
								className="w-full h-full flex items-center"
								onClick={() => setEndAddressSearchModal(true)}
							>
								<span className="ml-2">{end_address}</span>
							</div>
							{endAddressSearchModal && (
								<div className="absolute top-0 left-0 w-full bg-white rounded-xl shadow-lg ">
									<input
										list="start_address"
										value={endAddressSearch}
										className="h-10 w-full rounded-lg border-slate-300 cursor-pointer"
										type="text"
										onChange={(e) => setEndAddressSearch(e.target.value)}
									/>
									<ul className="w-full overflow-y-scroll max-h-52">
										{endAddressSearch === ''
											? provinces.map((v, i) => {
													return (
														<li
															key={i}
															className="ml-10 my-2"
															onClick={() => {
																setEndAddress(v);
																setEndAddressSearchModal(false);
															}}
														>
															{v}
														</li>
													);
											  })
											: provinces
													.filter((item) => item.toLowerCase().includes(endAddressSearch.toLowerCase()))
													.map((item, i) => (
														<li
															key={i}
															className="ml-10 my-2"
															onClick={() => {
																setEndAddress(item);
																setEndAddressSearchModal(false);
															}}
														>
															{item}
														</li>
													))}
									</ul>
								</div>
							)}
						</div>
					</div>
					<div className="input-search flex flex-col w-full sm:basis-1/4 mb-3">
						<label className="mb-3 font-semibold">Ngày đi</label>

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
			{failureModal && (
				<FailureNotification
					func={{ closeModal: closeFailureModal }}
					message={message}
				/>
			)}
		</>
	);
}

export default HomeSearch;
