/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../configs/env';
import { useNavigate } from 'react-router-dom';
import NavBarCustomerService from '../../components/admin/nav/NavBarCustomerService';
import NavBarOperator from '../../components/admin/nav/NavBarOperator';

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
				.get(API_URL + 'employee/thong-tin-ca-nhan', { headers: { Authorization: `Bearer ${token}` } })
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
			case 'QL':
				// navigate('/admin/quan-ly');
				break;
			case 'KT':
				// navigate('/admin/ke-toan');
				break;
			case 'CS':
				return <NavBarCustomerService />;
			case 'TX':
				// navigate('/admin/tai-xe');
				break;
			case 'VH':
				return <NavBarOperator />;
			default:
				break;
		}
	};
	return <>{role && renderNavbar()}</>;
};

export default NavBarAdmin;
