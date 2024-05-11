/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../configs/env';

const BusesManagerment = () => {
	const [isCreate, setIsCreate] = useState(true);
	const [idChuyenXe, setIdChuyenXe] = useState('');

	const [tuyenXeAll, setTuyenXeAll] = useState([]);
	const [xeAll, setXeAll] = useState([]);
	const [taiXeAll, setTaiXeAll] = useState([]);
	const [chuyenXeAll, setChuyenXeAll] = useState([]);
	const [tuyenXe, setTuyenXe] = useState('');
	const [xe, setXe] = useState('');
	const [taiXe, setTaiXe] = useState('');
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');

	useEffect(() => {
		fetchTuyenXeAll();
		fetchXeAll();
		fetchTaiXeAll();
		fetchChuyenXeAll();
	}, []);

	const fetchTuyenXeAll = async () => {
		await axios
			.get(API_URL + 'tuyen-xe')
			.then((res) => {
				setTuyenXeAll(res.data);
			})
			.catch((err) => {});
	};
	const fetchXeAll = async () => {
		await axios
			.get(API_URL + 'xe')
			.then((res) => {
				setXeAll(res.data.data);
			})
			.catch((err) => {});
	};
	const fetchTaiXeAll = async () => {
		await axios
			.get(API_URL + 'nhan-vien/TX')
			.then((res) => {
				setTaiXeAll(res.data.data);
			})
			.catch((err) => {});
	};
	const fetchChuyenXeAll = async () => {
		await axios
			.get(API_URL + 'chuyen-xe')
			.then((res) => {
				// console.log(res.data);
				setChuyenXeAll(res.data);
			})
			.catch((err) => {});
	};

	const resetInput = () => {
		setTaiXe('');
		setTuyenXe('');
		setXe('');
		setTaiXe('');
		setDate('');
		setTime('');
	};

	const sendRequestCreateChuyenXe = async () => {
		if (new Date().getTime() > new Date(date).getTime()) {
			alert('Ngày khởi hành không hợp lệ');
			return;
		}
		let data = {
			tuyen_xe_id: tuyenXe,
			xe_id: xe,
			tai_xe_id: taiXe,
			date: date,
			start_time: time + ':00',
		};

		await axios
			.post(API_URL + 'chuyen-xe', data)
			.then((res) => {
				if (res.status === 201) {
					alert('Tạo chuyến xe thành công');
					resetInput();
				}
			})
			.catch((err) => {
				alert('Tạo chuyến xe thất bại');
			});
		fetchChuyenXeAll();
	};

	const sendRequestUpdateChuyenXe = async () => {
		let data = {
			tuyen_xe_id: tuyenXe,
			xe_id: xe,
			tai_xe_id: taiXe,
			date: date,
			start_time: time,
		};

		await axios
			.put(API_URL + `chuyen-xe/${idChuyenXe}`, data)
			.then((res) => {
				if (res.status === 200) {
					alert(res.data.message);
					resetInput();
				}
			})
			.catch((err) => {
				alert(err.response.data.message);
			});
		fetchChuyenXeAll();
		resetInput();
		setIdChuyenXe('');
		setIsCreate(true);
	};

	const editBtn = async (id) => {
		await axios
			.get(API_URL + `chuyen-xe/${id}`)
			.then((res) => {
				let data = res.data;
				setTaiXe(data.tai_xe_id);
				setTuyenXe(data.tuyen_xe_id);
				setXe(data.xe_id);
				setDate(data.date);
				setTime(data.start_time);
			})
			.catch((err) => {
				alert(err.response.data.message);
			});
		setIsCreate(false);
		setIdChuyenXe(id);
	};

	const deleteBtn = async (id) => {
		if (window.confirm('Bạn có chắc chắn muốn xóa chuyến xe này ?')) {
			await axios
				.delete(API_URL + `chuyen-xe/${id}`)
				.then((res) => {
					if (res.status === 200) {
						alert(res.data.message);
					}
				})
				.catch((err) => {
					alert(err.response.data.message);
				});
			fetchChuyenXeAll();
		}
	};

	return (
		<div className="w-full p-2">
			<div className="my-8">
				<div className="max-w-screen-md mx-auto -my-2">
					<div className="flex -mx-2 my-2">
						<div className="basis-full mx-2">
							<select
								onChange={(e) => setTuyenXe(e.target.value)}
								value={tuyenXe}
								id="countries"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
							>
								<option selected>Chọn tuyến xe</option>
								{tuyenXeAll.length !== 0 &&
									tuyenXeAll.map((v, i) => (
										<option
											key={i}
											value={v.id}
										>
											{v.name} | {v.start_address?.name + ' -> ' + v.end_address?.name}
										</option>
									))}
							</select>
						</div>
					</div>
					<div className="flex -mx-2 my-2">
						<div className="basis-1/2 mx-2">
							<select
								onChange={(e) => setXe(e.target.value)}
								value={xe}
								id="xe"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
							>
								<option selected>Chọn xe</option>
								{xeAll.length !== 0 &&
									xeAll.map((v, i) => (
										<option
											key={i}
											value={v.id}
										>
											{v.license}
										</option>
									))}
							</select>
						</div>
						<div className="basis-1/2 mx-2">
							<select
								onChange={(e) => setTaiXe(e.target.value)}
								value={taiXe}
								id="taiXe"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
							>
								<option selected>Chọn tài xế</option>
								{taiXeAll.length !== 0 &&
									taiXeAll.map((v, i) => (
										<option
											key={i}
											value={v.id}
										>
											{v.last_name} {v.first_name} | {v.phone_number}
										</option>
									))}
							</select>
						</div>
					</div>

					<div className="flex -mx-2 my-2">
						<div className="basis-1/2 mx-2">
							<input
								onChange={(e) => setDate(e.target.value)}
								value={date}
								type="date"
								id="date"
								className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
								placeholder="Start Date"
								required
							/>
						</div>
						<div className="basis-1/2 mx-2">
							<input
								onChange={(e) => setTime(e.target.value)}
								value={time}
								type="time"
								name="start_time"
								className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
								placeholder="Start Time"
								required
							/>
						</div>
					</div>

					{isCreate ? (
						<button
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							onClick={sendRequestCreateChuyenXe}
						>
							Thêm
						</button>
					) : (
						<button
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							onClick={sendRequestUpdateChuyenXe}
						>
							Chỉnh sửa
						</button>
					)}
				</div>
				<div className="max-w-screen-xl mx-auto -my-2 mt-8">
					<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
						<table className="w-full text-sm text-left  text-gray-500 ">
							<thead className="text-xs text-gray-700 uppercase bg-gray-50">
								<tr>
									<th
										scope="col"
										className="px-6 py-3"
									>
										Tuyến xe
									</th>
									<th
										scope="col"
										className="px-6 py-3"
									>
										Ghế
									</th>
									<th
										scope="col"
										className="px-6 py-3"
									>
										Thời gian
									</th>
									<th
										scope="col"
										className="px-6 py-3"
									>
										Ngày
									</th>
									<th
										scope="col"
										className="px-6 py-3"
									>
										Hành trình
									</th>
									<th
										scope="col"
										className="px-6 py-3"
									>
										Giá
									</th>
									<th
										scope="col"
										className="px-6 py-3"
									>
										Xe
									</th>
									<th
										scope="col"
										className="px-6 py-3"
									>
										Hành động
									</th>
								</tr>
							</thead>
							<tbody>
								{chuyenXeAll.length !== 0 &&
									chuyenXeAll.map((v, i) => (
										<tr
											key={i}
											className="odd:bg-white even:bg-gray-50 border-b "
										>
											<th
												scope="row"
												className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
											>
												{v.tuyen_xe.name}
											</th>
											<td className="px-6 py-4">{v.seat}</td>
											<td className="px-6 py-4">{v.start_time + '-' + v.end_time}</td>
											<td className="px-6 py-4">{v.date}</td>
											<td className="px-6 py-4">{v.tuyen_xe.start_address.name + ' - ' + v.tuyen_xe.end_address.name}</td>
											<td className="px-6 py-4">{v.price / 1000 + '.000'}</td>
											<td className="px-6 py-4">{v.xe.license}</td>
											<td className="px-6 py-4">
												<button
													onClick={() => editBtn(v.id)}
													className="mr-2 font-medium text-blue-500 hover:underline"
												>
													Sửa
												</button>
												<button
													onClick={() => deleteBtn(v.id)}
													className="font-medium text-red-500 hover:underline"
												>
													Xóa
												</button>
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BusesManagerment;
