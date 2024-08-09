import { useCallback, useContext, useState } from "react";
import Input from "../common/input/input";
import { cn } from "../../utils/cn";
import axios from "axios";
import { ContextProvider } from "../../src/App";
import { useNavigate } from "react-router-dom";

const LOGIN = "Login";

export const USERNAME = "username";
export const EMAIL = "email";
export const PASSWORD = "password";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { setUser, setLogin } = useContext(ContextProvider);
	const navigate = useNavigate();

	const handleSubmit = useCallback(async () => {
		const { data } = await axios.post("http://localhost:8000/users/login", {
			email,
			password,
		});

		if (data?.user) {
			setUser(data.user);
			localStorage.setItem("user", JSON.stringify(data.user));
			localStorage.setItem("token", data.token);
			setLogin(true);
			navigate("/");
		}
	}, [email, navigate, password, setLogin, setUser]);

	return (
		<form
			className={cn(
				"bg-transparent flex gap-2 w-full h-full items-center justify-center rounded-md cursor-default transition-all duration-150"
			)}
			onSubmit={(evt) => {
				evt.preventDefault();
				handleSubmit();
			}}>
			<div className="flex flex-col w-full gap-4">
				<h1 className="text-center text-lg">{LOGIN}</h1>
				<Input
					required
					id={EMAIL}
					type={EMAIL}
					label="Email"
					name={EMAIL}
					placeholder="Email"
					value={email}
					onChange={(evt) => setEmail(evt.target.value)}
				/>
				<Input
					required
					id={PASSWORD}
					label="Password"
					type={PASSWORD}
					name={PASSWORD}
					placeholder="Password"
					value={password}
					onChange={(evt) => setPassword(evt.target.value)}
				/>

				<button
					className={cn(
						"p-2 flex items-center justify-center gap-2 border border-blue-900/20 bg-blue-900/10 rounded-sm hover:bg-blue-900/15 hover:border-blue-900/25 transition-all duration-150 text-sm backdrop-blur-md disabled:bg-neutral-500/10 disabled:hover:bg-neutral-500/10 disabled:text-neutral-500/80 disabled:hover:border-slate-500/10 disabled:border-slate-500/10"
					)}
					type="submit">
					{LOGIN}
				</button>
			</div>
		</form>
	);
};

export default Login;
