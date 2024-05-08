/** @format */

import React from 'react';
import TravelScheduleInfo from '../components/TravelScheduleInfo';
import HomeSearch from '../components/HomeSearch';

function TravelSchedulePage(props) {
	return (
		<div>
			<HomeSearch />
			<TravelScheduleInfo />
		</div>
	);
}

export default TravelSchedulePage;
