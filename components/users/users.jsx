import { useCallback, useContext, useEffect, useRef } from "react";
import Table from "../common/table/table.jsx";
import { COLUMNS } from "./columns.jsx";
import { ContextProvider } from "../../src/App.jsx";
import fetchApiResponse from "../../utils/fetch-response.js";

const Users = () => {
	const initialRef = useRef(true);
	const { users, setUsers } = useContext(ContextProvider);
	const { user } = useContext(ContextProvider);

	useEffect(() => {
		if (initialRef.current) {
			(async () => {
				const response = await fetchApiResponse({
					url: "users/fetch",
				});
				setUsers(response.data.users);
			})();
			initialRef.current = false;
		}
	}, [setUsers]);

	const onCellClick = useCallback((context) => {
		console.log(context);
	}, []);

	return (
		<Table
			data={users.filter((usr) => usr._id !== user._id)}
			columns={COLUMNS}
			isLoading={false}
			onCellClick={onCellClick}
		/>
	);
};

export default Users;
