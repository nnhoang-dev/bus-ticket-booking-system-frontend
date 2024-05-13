/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../configs/env';
import { useNavigate } from 'react-router-dom';

function ProfileManagementForm() {
	const [customer, setCustomer] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		const token = sessionStorage.getItem('token');
		if (token) {
			axios
				.get(API_URL + 'customer/thong-tin-ca-nhan', { headers: { Authorization: `Bearer ${token}` } })
				.then((res) => {
					setCustomer(res.data.customer);
					console.log(customer);
				})
				.catch((error) => {
					navigate('/dang-nhap');
				});
		}
	}, []);

	const logout = async () => {
		const token = sessionStorage.getItem('token');
		if (token) {
			await axios
				.get(API_URL + 'customer/dang-xuat', { headers: { Authorization: `Bearer ${token}` } })
				.then((res) => {
					if (res.status === 200) {
						navigate('/');
						window.location.reload();
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};
	return (
		<div className="flex-1">
			<div className="flex flex-col md:flex-row w-full lg:w-[80%] 2xl:w-[60%] mx-auto p-5 gap-y-8 md:gap-x-8 my-8">
				<div className="flex basis-1/4 border border-slate-300 p-2 flex-col rounded-xl">
					<div className="flex flex-row p-2 mb-2 items-center hover:bg-slate-100 cursor-pointer">
						<div className="basis-1/4">
							<img
								src="https://futabus.vn/images/header/profile/futaPay.svg"
								alt="futapay"
							/>
						</div>
						<div className="basis-3/4 ml-3">FUTAPay</div>
					</div>
					<div className="flex flex-row p-2 mb-2 items-center hover:bg-slate-100 cursor-pointer">
						<div className="basis-1/4">
							<img
								src="https://futabus.vn/images/header/profile/Profile.svg"
								alt="profile"
							/>
						</div>
						<div className="basis-3/4 ml-3">Thông tin tài khoản</div>
					</div>
					<div className="flex flex-row p-2 mb-2 items-center hover:bg-slate-100 cursor-pointer">
						<div className="basis-1/4">
							<img
								src="https://futabus.vn/images/header/profile/History.svg"
								alt="history"
							/>
						</div>
						<div className="basis-3/4 ml-3">Lịch sử mua vé</div>
					</div>
					<div className="flex flex-row p-2 mb-2 items-center hover:bg-slate-100 cursor-pointer">
						<div className="basis-1/4">
							<img
								src="https://futabus.vn/images/header/profile/Address.svg"
								alt="address"
							/>
						</div>
						<div className="basis-3/4 ml-3">Địa chỉ của bạn</div>
					</div>
					<div className="flex flex-row p-2 mb-2 items-center hover:bg-slate-100 cursor-pointer">
						<div className="basis-1/4">
							<img
								src="https://futabus.vn/images/header/profile/Password.svg"
								alt="password"
							/>
						</div>
						<div className="basis-3/4 ml-3">Đặt lại mật khẩu</div>
					</div>
					<div className="flex flex-row p-2 mb-2 items-center hover:bg-slate-100 cursor-pointer">
						<div className="basis-1/4">
							<img
								src="https://futabus.vn/images/header/profile/Logout.svg"
								alt="logout"
							/>
						</div>
						<div
							className="basis-3/4 ml-3"
							onClick={logout}
						>
							Đăng xuất
						</div>
					</div>
				</div>
				<div className="md:basis-3/4 w-full">
					<h3 className="text-2xl font-semibold mb-2">Thông tin tài khoản</h3>
					<p className="text-sm text-slate-500 mb-5">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
					<div className="w-full border border-slate-300 rounded-xl p-3 flex flex-col md:flex-row">
						<div className="basis-1/3 flex flex-col p-2">
							<div className="flex justify-center mx-auto md:mx-0">
								<img
									src="https://images.unsplash.com/photo-1618500299034-abce7ed0e8df?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
									alt="avatar"
									className="aspect-square max-w-[200px] rounded-full object-cover"
								/>
							</div>
							<div className="mb-5 mt-8 text-center">
								<span className="cursor-pointer bg-slate-200 px-4 py-2 rounded-full hover:bg-slate-300">Chọn ảnh</span>
							</div>
							<div className="text-center text-slate-500">Dung lượng file tối đa 1 MB Định dạng:.JPEG, .PNG</div>
						</div>
						<div className="basis-2/3 w-full flex flex-col p-3 md:p-5">
							<div className="flex flex-row mb-3 items-center">
								<div className="basis-1/3 text-slate-500">Họ</div>
								<div className="basis-2/3">
									: <span className="ml-3">{customer.last_name}</span>
								</div>
							</div>
							<div className="flex flex-row mb-3 items-center">
								<div className="basis-1/3 text-slate-500">Tên</div>
								<div className="basis-2/3">
									: <span className="ml-3">{customer.first_name}</span>
								</div>
							</div>
							<div className="flex flex-row mb-3 items-center">
								<div className="basis-1/3 text-slate-500">Số điện thoại</div>
								<div className="basis-2/3">
									: <span className="ml-3">{customer.phone_number}</span>
								</div>
							</div>
							<div className="flex flex-row mb-3 items-center">
								<div className="basis-1/3 text-slate-500">Giới tính</div>
								<div className="basis-2/3">
									: <span className="ml-3">{customer.gender}</span>
								</div>
							</div>
							<div className="flex flex-row mb-3 items-center">
								<div className="basis-1/3 text-slate-500">Email</div>
								<div className="basis-2/3">
									: <span className="ml-3">{customer.email}</span>
								</div>
							</div>
							<div className="flex flex-row mb-3 items-center">
								<div className="basis-1/3 text-slate-500">Ngày sinh</div>
								<div className="basis-2/3">
									: <span className="ml-3">{customer.date_of_birth}</span>
								</div>
							</div>
							<div className="flex flex-row mb-3 items-center">
								<div className="basis-1/3 text-slate-500">Địa chỉ</div>
								<div className="basis-2/3">
									: <span className="ml-3">{customer.address}</span>
								</div>
							</div>
							<div className="flex justify-center items-center bg-orange-500 mx-auto px-8 py-2 rounded-full text-white mt-3 hover:bg-orange-600 transition-colors cursor-pointer">
								Cập nhật
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfileManagementForm;
