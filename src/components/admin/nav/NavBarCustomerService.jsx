/** @format */

import React, { useEffect } from 'react';
import { Avatar, Buses, Logout } from '../../../svg/svg';
import axios from 'axios';
import { API_URL } from '../../../configs/env';
import { useNavigate } from 'react-router-dom';

const NavBarCustomerService = () => {
	const navigate = useNavigate();

	useEffect(() => {
		authNhanVien();
	});

	const logout = async () => {
		const token = sessionStorage.getItem('token');
		if (token) {
			await axios
				.get(API_URL + 'nhan-vien/dang-xuat', { headers: { Authorization: `Bearer ${token}` } })
				.then((res) => {
					if (res.status === 200) {
						navigate('/admin');
						window.location.reload();
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	const authNhanVien = async () => {
		// get khachHang
		const token = sessionStorage.getItem('token');
		if (token) {
			axios
				.get(API_URL + 'nhan-vien/thong-tin-ca-nhan', { headers: { Authorization: `Bearer ${token}` } })
				.then((res) => {
					if (res.data.nhanVien.role !== 'CS') {
						checkRole(res.data.nhanVien.role);
					}
				})
				.catch((err) => {
					navigate('/admin');
				});
		} else {
			navigate('/admin');
		}
	};

	const checkRole = (role) => {
		switch (role) {
			case 'QL':
				navigate('/admin/quan-ly');
				break;
			case 'KT':
				navigate('/admin/ke-toan');
				break;
			case 'CS':
				navigate('/admin/cham-soc-khach-hang');
				break;
			case 'TX':
				navigate('/admin/tai-xe');
				break;
			case 'VH':
				navigate('/admin/van-hanh');
				break;
			default:
				break;
		}
	};

	return (
		<div>
			<div className="w-44"></div>
			<div className="fixed">
				<div className="bg-blue-500 w-44 h-screen flex flex-col">
					<h1 className="w-full text-white font-bold text-2xl mt-2 text-center">Chăm sóc khách hàng</h1>
					<div className="flex flex-col flex-grow justify-between my-4">
						<div
							className="w-full flex items-center cursor-pointer py-2
                            hover:bg-blue-400 transition-all duration-100 ease-linear"
							onClick={() => navigate('ve-xe')}
						>
							<Buses
								className="ml-4"
								style={{ width: '14px', height: '14px' }}
							/>
							<div className="text-white  text-sm  m-2">Quản lý vé xe</div>
						</div>
						<div>
							<div
								className="w-full flex items-center cursor-pointer py-2 
                            hover:bg-blue-400 transition-all duration-100 ease-linear"
							>
								<Avatar
									className="ml-4"
									style={{ width: '16px', height: '16px' }}
								/>
								<div className="text-white  text-sm  m-2">Quản lý tài khoản</div>
							</div>
							<div
								className="w-full flex items-center cursor-pointer py-2 
                            hover:bg-blue-400 transition-all duration-100 ease-linear"
								onClick={logout}
							>
								<Logout
									className="ml-4"
									style={{ width: '16px', height: '16px' }}
								/>
								<div className="text-white  text-sm  m-2">Đăng xuất</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NavBarCustomerService;
