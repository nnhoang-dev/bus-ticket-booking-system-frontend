/** @format */

import * as React from 'react';
const CheckFailure = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		width={80}
		height={80}
		viewBox="0 0 256 256"
		xmlSpace="preserve"
		{...props}
	>
		<defs />
		<g
			style={{
				stroke: 'none',
				strokeWidth: 0,
				strokeDasharray: 'none',
				strokeLinecap: 'butt',
				strokeLinejoin: 'miter',
				strokeMiterlimit: 10,
				fill: 'none',
				fillRule: 'nonzero',
				opacity: 1,
			}}
			transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
		>
			<path
				d="M 45 90 C 20.187 90 0 69.813 0 45 C 0 20.187 20.187 0 45 0 c 24.813 0 45 20.187 45 45 C 90 69.813 69.813 90 45 90 z"
				style={{
					stroke: 'none',
					strokeWidth: 1,
					strokeDasharray: 'none',
					strokeLinecap: 'butt',
					strokeLinejoin: 'miter',
					strokeMiterlimit: 10,
					fill: 'rgb(236,0,0)',
					fillRule: 'nonzero',
					opacity: 1,
				}}
				transform=" matrix(1 0 0 1 0 0) "
				strokeLinecap="round"
			/>
			<path
				d="M 28.5 65.5 c -1.024 0 -2.047 -0.391 -2.829 -1.172 c -1.562 -1.562 -1.562 -4.095 0 -5.656 l 33 -33 c 1.561 -1.562 4.096 -1.562 5.656 0 c 1.563 1.563 1.563 4.095 0 5.657 l -33 33 C 30.547 65.109 29.524 65.5 28.5 65.5 z"
				style={{
					stroke: 'none',
					strokeWidth: 1,
					strokeDasharray: 'none',
					strokeLinecap: 'butt',
					strokeLinejoin: 'miter',
					strokeMiterlimit: 10,
					fill: 'rgb(255,255,255)',
					fillRule: 'nonzero',
					opacity: 1,
				}}
				transform=" matrix(1 0 0 1 0 0) "
				strokeLinecap="round"
			/>
			<path
				d="M 61.5 65.5 c -1.023 0 -2.048 -0.391 -2.828 -1.172 l -33 -33 c -1.562 -1.563 -1.562 -4.095 0 -5.657 c 1.563 -1.562 4.095 -1.562 5.657 0 l 33 33 c 1.563 1.562 1.563 4.095 0 5.656 C 63.548 65.109 62.523 65.5 61.5 65.5 z"
				style={{
					stroke: 'none',
					strokeWidth: 1,
					strokeDasharray: 'none',
					strokeLinecap: 'butt',
					strokeLinejoin: 'miter',
					strokeMiterlimit: 10,
					fill: 'rgb(255,255,255)',
					fillRule: 'nonzero',
					opacity: 1,
				}}
				transform=" matrix(1 0 0 1 0 0) "
				strokeLinecap="round"
			/>
		</g>
	</svg>
);

const Buses = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 448 512"
		{...props}
	>
		<path
			fill="#ffffff"
			d="M224 0C348.8 0 448 35.2 448 80V96 416c0 17.7-14.3 32-32 32v32c0 17.7-14.3 32-32 32H352c-17.7 0-32-14.3-32-32V448H128v32c0 17.7-14.3 32-32 32H64c-17.7 0-32-14.3-32-32l0-32c-17.7 0-32-14.3-32-32V96 80C0 35.2 99.2 0 224 0zM64 128V256c0 17.7 14.3 32 32 32H352c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H96c-17.7 0-32 14.3-32 32zM80 400a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm288 0a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"
		/>
	</svg>
);

const Avatar = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512 512"
		{...props}
	>
		<path
			fill="#fff"
			d="M399 384.2c-22.1-38.4-63.6-64.2-111-64.2h-64c-47.4 0-88.9 25.8-111 64.2 35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0 256 256 0 1 1-512 0zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"
		/>
	</svg>
);

const Logout = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512 512"
		{...props}
	>
		<path
			fill="#fff"
			d="m377.9 105.9 122.8 122.8c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9-18.7 0-33.9-15.2-33.9-33.9V320H192c-17.7 0-32-14.3-32-32v-64c0-17.7 14.3-32 32-32h128v-62.1c0-18.7 15.2-33.9 33.9-33.9 9 0 17.6 3.6 24 9.9zM160 96H96c-17.7 0-32 14.3-32 32v256c0 17.7 14.3 32 32 32h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-53 0-96-43-96-96V128c0-53 43-96 96-96h64c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
		/>
	</svg>
);

export { CheckFailure, Buses, Avatar, Logout };
