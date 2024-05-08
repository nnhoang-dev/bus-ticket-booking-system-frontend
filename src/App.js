/** @format */

import './App.css';
import { Outlet, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LookUpPage from './pages/LookUpPage';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import TravelSchedulePage from './pages/TravelSchedulePage';
import BookingTicketPage from './pages/BookingTicketPage';
import ResultBookingPage from './pages/ResultBookingPage';
import SignupPage from './pages/SignupPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import ProfileManagementPage from './pages/ProfileManagementPage';

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route
					path="/"
					element={<HomePage />}
				/>
				<Route
					path="/dang-nhap"
					element={<LoginPage />}
				/>
				<Route
					path="/dang-ky"
					element={<SignupPage />}
				/>
				<Route
					path="/xac-thuc-email"
					element={<EmailVerificationPage />}
				/>
				<Route
					path="/tra-cuu-ve"
					element={<LookUpPage />}
				/>
				<Route
					path="/lich-trinh"
					element={<TravelSchedulePage />}
				/>
				<Route
					path="/dat-ve"
					element={<BookingTicketPage />}
				/>
				<Route
					path="/ket-qua-dat-ve"
					element={<ResultBookingPage />}
				/>

				<Route
					path="/admin"
					element={<Outlet />}
				>
					<Route
						path="/dang-nhap"
						element={<ProfileManagementPage />}
					/>
				</Route>
			</Routes>
			<Footer />
		</>
	);
}

export default App;
