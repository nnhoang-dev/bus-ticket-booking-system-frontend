/** @format */

import './App.css';
import { Outlet, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LookUpPage from './pages/LookUpPage';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import LoginPageAdmin from './pages/admin/LoginPageAdmin';
import TravelSchedulePage from './pages/TravelSchedulePage';
import BookingTicketPage from './pages/BookingTicketPage';
import ResultBookingPage from './pages/ResultBookingPage';
import SignupPage from './pages/SignupPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import ProfileManagementPage from './pages/ProfileManagementPage';
import TripManagement from './components/admin/TripManagement';
import NavBarAdmin from './pages/admin/NavBarAdmin';
import TicketManagement from './components/admin/TicketManagement';
import BusManagerment from './components/admin/BusManagement';
import BusStationManagement from './components/admin/BusStationManagement';
import RouteManagement from './components/admin/RouteManagement';

function App() {
	return (
		<>
			<Routes>
				<Route
					path="/"
					element={
						<>
							<Navbar />
							<Outlet />
							<Footer />
						</>
					}
				>
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
						path="/tai-khoan"
						element={<ProfileManagementPage />}
					/>
				</Route>
				<Route
					path="/admin"
					element={<LoginPageAdmin />}
				/>
				<Route
					path="/admin"
					element={
						<div className="flex">
							<NavBarAdmin />
							<Outlet />
						</div>
					}
				>
					<Route
						path="home"
						element={<></>}
					/>
					<Route
						path="trip"
						element={<TripManagement />}
					/>
					<Route
						path="ve-xe"
						element={<TicketManagement />}
					/>
					<Route
						path="bus"
						element={<BusManagerment />}
					/>
					<Route
						path="bus-station"
						element={<BusStationManagement />}
					/>
					<Route
						path="route"
						element={<RouteManagement />}
					/>
					{/* 
					<Route
						path="quan-ly"
						element={<ManagerPage />}
					/>

					<Route
						path="cham-soc-khach-hang"
						element={
							<div className="flex">
								<NavBarCustomerService />
								<Outlet />
							</div>
						}
					>
						<Route
							path="ve-xe"
							element={<BusesManagement />}
						/>
					</Route>

					<Route
						path="van-hanh"
						element={
							<div className="flex">
								<NavBarOperator />
								<Outlet />
							</div>
						}
					></Route> */}

					{/* <Route
						path="tai-xe"
						element={<ManagerPage />}
					/>

					<Route
						path="ke-toan"
						element={<ManagerPage />}
					/> */}
				</Route>
			</Routes>
		</>
	);
}

export default App;
