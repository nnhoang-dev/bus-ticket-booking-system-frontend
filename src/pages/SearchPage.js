/** @format */

import Banner from '../components/Banner';
import HomeSearch from '../components/HomeSearch';
import SearchResult from '../components/SearchResult';

function SearchPage(props) {
	return (
		<div>
			<Banner />
			<HomeSearch />
			<SearchResult />
		</div>
	);
}

export default SearchPage;
