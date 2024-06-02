/** @format */

import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../configs/env';
import { NavLink } from 'react-router-dom';
function Navbar() {
	const [customer, setCustomer] = useState({});

	useEffect(() => {
		const token = sessionStorage.getItem('token');
		if (token) {
			axios
				.get(API_URL + 'customer/me', { headers: { Authorization: `Bearer ${token}` } })
				.then((res) => {
					setCustomer(res.data?.customer);
				})
				.catch((err) => {});
		}
	}, []);

	return (
		<nav className="bg-white w-full z-20 top-0 start-0 border-b border-gray-200">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<NavLink
					to="/"
					className="flex items-center space-x-3 rtl:space-x-reverse"
				>
					<img
						src="https://cdn.iconscout.com/icon/free/png-256/free-bus-1817190-1538058.png"
						className="h-12"
						alt="Flowbite Logo"
					></img>
					<span className="self-center text-2xl font-semibold whitespace-nowrap">Futa Bus Lines</span>
				</NavLink>
				<div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
					{!customer.id ? (
						<NavLink
							to="login"
							className=" md:hidden text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-4 py-2 text-center"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="w-6 h-6"
							>
								<path
									fillRule="evenodd"
									d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
									clipRule="evenodd"
								/>
							</svg>
						</NavLink>
					) : (
						<span
							type="button"
							className=" md:hidden text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-4 py-2 text-center"
						>
							<div>
								{customer.first_name} {customer.last_name}
							</div>
						</span>
					)}
					{!customer.id ? (
						<NavLink
							to="login"
							className="cursor-pointer hidden md:flex text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-4 py-2 text-center"
						>
							Đăng nhập/Đăng ký
						</NavLink>
					) : (
						<NavLink
							to="/tai-khoan"
							className="cursor-pointer hidden md:flex text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-4 py-2 text-center"
						>
							{customer.first_name} {customer.last_name}
						</NavLink>
					)}
					<button
						data-collapse-toggle="navbar-sticky"
						type="button"
						className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100"
						aria-controls="navbar-sticky"
						aria-expanded="false"
					>
						<span className="sr-only">Open main menu</span>
						<svg
							className="w-5 h-5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 17 14"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M1 1h15M1 7h15M1 13h15"
							/>
						</svg>
					</button>
				</div>
				<div
					className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
					id="navbar-sticky"
				>
					<ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
						<li>
							<NavLink
								to=""
								href="/"
								className="block py-2 px-3 text-gray-900 rounded md:bg-transparent md:p-0"
								aria-current="page"
							>
								Trang chủ
							</NavLink>
						</li>
						<li>
							<NavLink
								to=""
								href="/"
								className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-500 md:p-0"
							>
								Tin tức
							</NavLink>
						</li>
						<li>
							<NavLink
								to="lich-trinh"
								className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-500 md:p-0"
							>
								Lịch trình
							</NavLink>
						</li>
						<li>
							<NavLink
								to="tra-cuu-ve"
								className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-500 md:p-0"
							>
								Tra cứu vé
							</NavLink>
						</li>
						<li>
							<NavLink
								to=""
								className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-500 md:p-0"
							>
								Liên hệ
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
