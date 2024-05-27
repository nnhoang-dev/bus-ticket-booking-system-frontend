/** @format */

import React, { useEffect } from 'react';
import { Avatar, BusStation, Buses, Customer, Employee, Logout, Route, Ticket, Trip } from '../../../svg/svg';
import axios from 'axios';
import { API_URL } from '../../../configs/env';
import { useNavigate } from 'react-router-dom';

const NavBarManager = () => {
	const navigate = useNavigate();

	const logout = async () => {
		const token = sessionStorage.getItem('token');
		if (token) {
			await axios
				.get(API_URL + 'employee/logout', { headers: { Authorization: `Bearer ${token}` } })
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

	return (
		<div>
			<div className="w-60"></div>
			<div className="fixed">
				<div className="bg-blue-500 w-60 h-screen flex flex-col">
					<h1 className="w-full text-white font-bold text-2xl mt-2 text-center">Manager</h1>
					<div className="flex flex-col flex-grow justify-between my-4">
						<div>
							<div
								className="w-full flex items-center cursor-pointer py-2
                            hover:bg-blue-400 transition-all duration-100 ease-linear"
								onClick={() => navigate('trip')}
							>
								<Trip
									className="ml-4"
									style={{ width: '14px', height: '14px' }}
								/>
								<div className="text-white  text-sm  m-2">Trip Management</div>
							</div>
							<div
								className="w-full flex items-center cursor-pointer py-2
                            hover:bg-blue-400 transition-all duration-100 ease-linear"
								onClick={() => navigate('route')}
							>
								<Route
									className="ml-4"
									style={{ width: '14px', height: '14px' }}
								/>
								<div className="text-white  text-sm  m-2">Route Management</div>
							</div>
							<div
								className="w-full flex items-center cursor-pointer py-2
                            hover:bg-blue-400 transition-all duration-100 ease-linear"
								onClick={() => navigate('bus-station')}
							>
								<BusStation
									className="ml-4"
									style={{ width: '14px', height: '14px' }}
								/>
								<div className="text-white  text-sm  m-2">Bus Station Management</div>
							</div>
							<div
								className="w-full flex items-center cursor-pointer py-2
                            hover:bg-blue-400 transition-all duration-100 ease-linear"
								onClick={() => navigate('bus')}
							>
								<Buses
									className="ml-4"
									style={{ width: '14px', height: '14px' }}
								/>
								<div className="text-white  text-sm  m-2">Bus Management</div>
							</div>
							<div
								className="w-full flex items-center cursor-pointer py-2
                            hover:bg-blue-400 transition-all duration-100 ease-linear"
								onClick={() => navigate('ticket')}
							>
								<Ticket
									className="ml-4"
									style={{ width: '14px', height: '14px' }}
								/>
								<div className="text-white  text-sm  m-2">Ticket Management</div>
							</div>
							<div
								className="w-full flex items-center cursor-pointer py-2
                            hover:bg-blue-400 transition-all duration-100 ease-linear"
								onClick={() => navigate('employee')}
							>
								<Employee
									className="ml-4"
									style={{ width: '16', height: '16' }}
								/>
								<div className="text-white  text-sm  m-2">Employee Management</div>
							</div>
							<div
								className="w-full flex items-center cursor-pointer py-2
                            hover:bg-blue-400 transition-all duration-100 ease-linear"
								onClick={() => navigate('customer')}
							>
								<Customer
									className="ml-4"
									style={{ width: '14px', height: '14px' }}
								/>
								<div className="text-white  text-sm  m-2">Customer Management</div>
							</div>
						</div>
						<div>
							<div
								className="w-full flex items-center cursor-pointer py-2 
                            hover:bg-blue-400 transition-all duration-100 ease-linear"
								onClick={() => navigate('account')}
							>
								<Avatar
									className="ml-4"
									style={{ width: '16px', height: '16px' }}
								/>
								<div className="text-white  text-sm  m-2">My Account</div>
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
								<div className="text-white  text-sm  m-2">Logout</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NavBarManager;
