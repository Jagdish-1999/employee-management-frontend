import axios from "axios";
import { Outlet, NavLink } from "react-router-dom";
import ProfileIcon from "../../icons/profile";
import { useContext, useEffect } from "react";
import Login from "../../login/login";
import { ContextProvider } from "../../../src/App";

const Navbar = ({ children }) => {
	const { user, setUser, login, setLogin } = useContext(ContextProvider);

	useEffect(() => {
		const token = localStorage.getItem("token");
		const user = localStorage.getItem("user");
		if (user) {
			setUser(JSON.parse(user));
		}
		if (token) setLogin(true);
		else setLogin(false);
	}, [setLogin, setUser]);

	return (
		<div className="h-full w-full flex flex-col">
			<nav className="h-14 bg-neutral-300 flex items-center justify-between px-16">
				<div className="w-full"></div>
				<ul className="flex gap-8">
					<li>
						<NavLink
							to="/"
							className={({ isActive }) =>
								isActive ? "font-extrabold text-blue-500" : "font-extrabold"
							}>
							Employees
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/users"
							className={({ isActive }) =>
								isActive ? "font-extrabold text-blue-500" : "font-extrabold"
							}>
							Users
						</NavLink>
					</li>
				</ul>
				{login && (
					<button
						className="ml-6 border px-2 py-1 border-black rounded-md"
						onClick={async () => {
							const response = await axios.get(
								`http://localhost:8000/users/logout/${user.email}`
							);

							if (response.status === 200) {
								setLogin(false);
								setUser(null);
								localStorage.removeItem("token");
								localStorage.removeItem("user");
							}
						}}>
						logout
					</button>
				)}
				{!login ? (
					<ProfileIcon
						className="ml-6 border rounded-full p-1 cursor-pointer min-w-10 min-h-10"
						onClick={() => setLogin((prev) => !prev)}
					/>
				) : (
					<div className="flex justify-center items-center text-[18px] font-extrabold ml-6 border border-neutral-500 rounded-full p-1 cursor-pointer min-w-9 min-h-9 text-black font-dm-sans uppercase bg-blue-300">
						{user?.username?.[0]}
					</div>
				)}
			</nav>
			<Outlet />
			{!login && (
				<div className="w-full h-full flex items-center justify-center bg-inherit absolute z-[99] bg-white">
					<div className="border w-[32rem] max-h-fit border-neutral-300 p-6 rounded-md bg-white">
						<Login />
					</div>
				</div>
			)}
			<>
				{!login ? null : (
					<div className="h-[calc(100%-56px)] w-full p-6">{children}</div>
				)}
			</>
		</div>
	);
};

export default Navbar;
