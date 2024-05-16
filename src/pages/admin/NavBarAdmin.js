/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../configs/env';
import { useNavigate } from 'react-router-dom';
import NavBarCustomerService from '../../components/admin/nav/NavBarCustomerService';
import NavBarOperator from '../../components/admin/nav/NavBarOperator';
import NavBarManager from '../../components/admin/nav/NavBarManager';
import NavBarDriver from '../../components/admin/nav/NavBarDriver';

const NavBarAdmin = () => {
	const navigate = useNavigate();
	const [role, setRole] = useState('');
	let roleResponse = '';

	useEffect(() => {
		getRole();
	}, []);

	const getRole = async () => {
		// get customer
		const token = sessionStorage.getItem('token');
		if (token) {
			axios
				.get(API_URL + 'employee/me', { headers: { Authorization: `Bearer ${token}` } })
				.then((res) => {
					roleResponse = res.data.employee.role;
					setRole(roleResponse);
				})
				.catch((err) => {
					navigate('/admin');
				});
		} else {
			navigate('/admin');
		}
	};

	const renderNavbar = () => {
		switch (role) {
			case 'manager':
				return <NavBarManager />;
			case 'accountant':
				// navigate('/admin/ke-toan');
				break;
			case 'customer_service':
				return <NavBarCustomerService />;
			case 'driver':
				return <NavBarDriver />;
			case 'operator':
				return <NavBarOperator />;
			default:
				break;
		}
	};
	return <>{role && renderNavbar()}</>;
};

export default NavBarAdmin;
