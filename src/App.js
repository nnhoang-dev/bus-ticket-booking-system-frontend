/** @format */

import './App.css';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
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
import EmployeeManagement from './components/admin/EmployeeManagement';
import ProtectRoute from './components/admin/ProtectRoute';
import CustomerManagement from './components/admin/CustomerManagement';
import AccountManagement from './components/admin/AccountManagement';
import TripDriver from './components/admin/TripDriver';

function App() {
	return (
		<>
			<BrowserRouter>
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
							path="/login"
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
							element={
								<ProtectRoute
									children={<TripManagement />}
									allowedRoles={['manager', 'operator']}
								/>
							}
						/>

						<Route
							path="ticket"
							element={
								<ProtectRoute
									children={<TicketManagement />}
									allowedRoles={['manager', 'customer_service']}
								/>
							}
						/>
						<Route
							path="bus"
							element={
								<ProtectRoute
									children={<BusManagerment />}
									allowedRoles={['manager', 'operator']}
								/>
							}
						/>
						<Route
							path="bus-station"
							element={
								<ProtectRoute
									children={<BusStationManagement />}
									allowedRoles={['manager', 'operator']}
								/>
							}
						/>
						<Route
							path="route"
							element={
								<ProtectRoute
									children={<RouteManagement />}
									allowedRoles={['manager', 'operator']}
								/>
							}
						/>
						<Route
							path="employee"
							element={
								<ProtectRoute
									children={<EmployeeManagement />}
									allowedRoles={['manager']}
								/>
							}
						/>
						<Route
							path="customer"
							element={
								<ProtectRoute
									children={<CustomerManagement />}
									allowedRoles={['manager', 'customer_service']}
								/>
							}
						/>
						<Route
							path="my-trip"
							element={
								<ProtectRoute
									children={<TripDriver />}
									allowedRoles={['driver']}
								/>
							}
						/>
						<Route
							path="account"
							element={<AccountManagement />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
