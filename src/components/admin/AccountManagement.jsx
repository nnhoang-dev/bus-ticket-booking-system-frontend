/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../configs/env';
import { useNavigate } from 'react-router-dom';
import SuccessNotification from '../Noti/SuccessNotification';
import FailureNotification from '../Noti/FailureNotification';

import { imageDB } from '../../configs/firebase';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import ChangePassword from './modal/ChangePassword';
import UpdateAccount from './modal/UpdateAccount';

const AccountManagement = () => {
	const navigate = useNavigate();

	// Data
	const [account, setAccount] = useState({});
	const [avatar, setAvatar] = useState(
		'https://images.unsplash.com/photo-1618500299034-abce7ed0e8df?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
	);

	// Modal
	const [successModal, setSuccessModal] = useState(false);
	const [failureModal, setFailureModal] = useState(false);
	const [changePasswordModal, setChangePasswordModal] = useState(false);
	const [modelUpdate, setUpdateModal] = useState(false);
	const [message, setMessage] = useState('');

	useEffect(() => {
		getEmployee();
	}, []);

	// Send GET request to retrieve personal account information
	const getEmployee = async () => {
		const token = sessionStorage.getItem('token');
		if (token) {
			axios
				.get(API_URL + 'employee/me', { headers: { Authorization: `Bearer ${token}` } })
				.then(async (res) => {
					await renderAvatar(res.data.employee);
					// res.data.employee.avatar

					setAccount(res.data.employee);
				})
				.catch((err) => {
					navigate('/admin');
				});
		} else {
			navigate('/admin');
		}

		// await renderAvatar();
	};

	// Render avatar to UI
	const renderAvatar = async (employee) => {
		if (employee.avatar) {
			setAvatar(await getDownloadURL(ref(imageDB, employee.avatar)));
		}
	};

	// Close Update Modal
	const closeUpdateModal = () => {
		setUpdateModal(false);
	};

	// Close Change Password Modal
	const closeChangePasswordModal = () => {
		setChangePasswordModal(false);
	};

	// Close Success Modal
	const closeSuccessModal = () => {
		setSuccessModal(false);
	};

	// Close Failure Modal
	const closeFailureModal = () => {
		setFailureModal(false);
	};

	// Open Success Modal
	const openSuccessModal = () => {
		setSuccessModal(true);
	};

	// Open Failure Modal
	const openFailureModal = () => {
		setFailureModal(true);
	};

	// Send PUT request to change avatar
	const handleChangeImage = async (file) => {
		const url = `avatars/${v4()}`;
		const imageRef = ref(imageDB, url);
		await uploadBytes(imageRef, file);

		let data = {
			avatar: url,
		};

		const token = sessionStorage.getItem('token');
		if (token) {
			axios
				.put(API_URL + 'employee/change-avatar', data, { headers: { Authorization: `Bearer ${token}` } })
				.then(async (res) => {
					setMessage(res.data.message);
					openSuccessModal();
					if (account.avatar) {
						const imageRef = ref(imageDB, account.avatar);
						await deleteObject(imageRef);
					}
					getEmployee();
				})
				.catch((err) => {
					if (err.response.status === 401) {
						navigate('/admin');
					}
					setMessage(err.response.data.message);
					openFailureModal();
				});
		} else {
			navigate('/admin');
		}
	};

	return (
		<>
			<div className="max-w-screen-lg mx-auto w-full px-4">
				<h3 className="text-2xl font-semibold my-2">My Account</h3>
				<div className="w-full border border-slate-300 rounded-xl p-3 flex flex-col md:flex-row">
					<div className="basis-1/3 flex flex-col p-2">
						<div className="flex justify-center mx-auto md:mx-0">
							<img
								src={avatar}
								alt="avatar"
								className="aspect-square max-w-[200px] rounded-full object-cover"
							/>
						</div>
						<div className="mb-5 mt-8 text-center">
							<label
								htmlFor="image"
								className="cursor-pointer bg-slate-200 px-4 py-2 rounded-full hover:bg-slate-300"
							>
								Choose picture
							</label>
							<input
								type="file"
								accept=".jpg,.png"
								id="image"
								onChange={(e) => handleChangeImage(e.target.files[0])}
								className="hidden"
							/>
						</div>
						<div className="text-center text-slate-500">The maximum file size is 1 MB, and the only accepted formats are JPEG and PNG</div>
					</div>
					<div className="basis-2/3 w-full flex flex-col p-3 md:p-5">
						<div className="flex flex-row mb-3 items-center">
							<div className="basis-1/3 text-slate-500">Last Name</div>
							<div className="basis-2/3">: {account.last_name}</div>
						</div>
						<div className="flex flex-row mb-3 items-center">
							<div className="basis-1/3 text-slate-500">First Name</div>
							<div className="basis-2/3">: {account.first_name}</div>
						</div>
						<div className="flex flex-row mb-3 items-center">
							<div className="basis-1/3 text-slate-500">Phone</div>
							<div className="basis-2/3">: {account.phone_number}</div>
						</div>
						<div className="flex flex-row mb-3 items-center">
							<div className="basis-1/3 text-slate-500">Gender</div>
							<div className="basis-2/3">: {account.gender === 0 ? 'Female' : 'Male'}</div>
						</div>
						<div className="flex flex-row mb-3 items-center">
							<div className="basis-1/3 text-slate-500">Email</div>
							<div className="basis-2/3">: {account.email}</div>
						</div>
						<div className="flex flex-row mb-3 items-center">
							<div className="basis-1/3 text-slate-500">Date of Birth</div>
							<div className="basis-2/3">: {account.date_of_birth}</div>
						</div>
						<div className="flex flex-row mb-3 items-center">
							<div className="basis-1/3 text-slate-500">Address</div>
							<div className="basis-2/3 line-clamp-1">: {account.address}</div>
						</div>
						<div className="flex -mx-2">
							<div
								className="mx-2 bg-blue-500 px-8 py-2 rounded-full text-white mt-3 hover:bg-blue-600 transition-colors cursor-pointer"
								onClick={() => setUpdateModal(true)}
							>
								Update
							</div>
							<div
								className="mx-2 bg-blue-500 px-8 py-2 rounded-full text-white mt-3 hover:bg-blue-600 transition-colors cursor-pointer"
								onClick={() => setChangePasswordModal(true)}
							>
								Change password
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* <!-- Main changePasswordModal --> */}
			{changePasswordModal && (
				<ChangePassword
					closeModal={closeChangePasswordModal}
					refresh={getEmployee}
					setMessage={setMessage}
					openFailureModal={openFailureModal}
					openSuccessModal={openSuccessModal}
				/>
			)}
			{modelUpdate && (
				<UpdateAccount
					closeModal={closeUpdateModal}
					refresh={getEmployee}
					setMessage={setMessage}
					openFailureModal={openFailureModal}
					openSuccessModal={openSuccessModal}
				/>
			)}
			{successModal && (
				<SuccessNotification
					func={{ closeModal: closeSuccessModal }}
					message={message}
				/>
			)}
			{failureModal && (
				<FailureNotification
					func={{ closeModal: closeFailureModal }}
					message={message}
				/>
			)}
		</>
	);
};

export default AccountManagement;
