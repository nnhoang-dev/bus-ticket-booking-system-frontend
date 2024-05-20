/** @format */

import React, { useState } from 'react';
import { WarningIcon } from '../../svg/svg';

const ChangeTicketNotification = ({ id, func }) => {
	const [seat, setSeat] = useState('');
	return (
		<div className="fixed top-0 left-0 w-full h-screen justify-center bg-black/20 ">
			<div className="overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
				<div className="relative p-4 w-full max-w-md max-h-full">
					<div className="relative bg-white rounded-lg shadow ">
						<button
							type="button"
							className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
							onClick={func.closeModal}
						>
							<svg
								className="w-3 h-3"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 14"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
								/>
							</svg>
							<span className="sr-only">Close modal</span>
						</button>
						<div className="p-4 md:p-5 text-center">
							<div className="flex justify-center">
								<WarningIcon className="w-[80px] aspect-square" />
							</div>

							<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{`Enter your desired seat?`}</h3>
							<input
								type="text"
								id="first_name"
								class="mb-4 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg "
								required
								onChange={(e) => setSeat(e.target.value)}
								value={seat}
							/>
							<div>
								<button
									type="button"
									className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
									onClick={() => func.handleChangeTicket(id, seat)}
								>
									Change
								</button>
								<button
									type="button"
									className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
									onClick={func.closeModal}
								>
									No, cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ChangeTicketNotification;
