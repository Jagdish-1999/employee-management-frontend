import { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "../components/common/nav/navbar.jsx";
import Employees from "../components/employees/employees.jsx";
import Users from "../components/users/users.jsx";

export const ContextProvider = createContext(null);

function App() {
	const [user, setUser] = useState(null);
	const [users, setUsers] = useState([]);
	const [employees, setEmployees] = useState([]);
	const [login, setLogin] = useState(false);

	return (
		<ContextProvider.Provider
			value={{
				user,
				setUser,
				login,
				setLogin,
				users,
				setUsers,
				employees,
				setEmployees,
			}}>
			<div className="w-full h-full text-center">
				<Router>
					<Navbar>
						<Routes>
							<Route path="users" element={<Users />} />
							<Route path="/" element={<Employees />} />
						</Routes>
					</Navbar>
				</Router>
			</div>
		</ContextProvider.Provider>
	);
}

export default App;
