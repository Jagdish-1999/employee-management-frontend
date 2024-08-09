import { useContext, useState } from "react";
import { tableCellWrapper } from "../../utils/cell-actions.js";
import { ContextProvider } from "../../src/App.jsx";
import Select from "../common/select/select.jsx";
import fetchApiResponse from "../../utils/fetch-response.js";

export const COLUMNS = [
	{
		id: "",
		accessKey: "",
		className: "w-[3%]",
		headCellLabel: function () {
			return "";
		},
		bodyCellLabel: function () {
			return "";
		},
	},
	{
		id: "id",
		accessKey: "_id",
		headClasses:
			"py-1 text-sm text-[15px] text-slate-900/80 font-semibold cursor-default select-none font-afacad",
		className:
			"w-[25%] min-w-[120px] text-[13px] text-slate-900/75 capitalize cursor-default font-dm-sans text-start",
		headCellLabel: function () {
			return "User Id";
		},
		bodyCellLabel: function ({ item }) {
			return item[this.accessKey];
		},
	},
	{
		id: "name",
		accessKey: "username",
		headClasses:
			"py-1 text-sm text-[15px] text-slate-900/80 font-semibold cursor-default select-none font-afacad",
		className:
			"w-[15%] min-w-[120px] text-[13px] text-slate-900/75 capitalize cursor-default font-dm-sans text-start",
		headCellLabel: function () {
			return "User Name";
		},
		bodyCellLabel: function ({ item }) {
			return item[this.accessKey];
		},
	},
	{
		id: "role",
		accessKey: "role",
		headClasses:
			"py-1 text-sm text-[15px] text-slate-900/80 font-semibold cursor-default select-none font-afacad",
		className:
			"w-[15%] min-w-[120px] text-[13px] text-slate-900/75 capitalize cursor-default font-dm-sans text-start",
		headCellLabel: function () {
			return "Role";
		},
		bodyCellLabel: function ({ item }) {
			return item[this.accessKey];
		},
	},
	{
		id: "email",
		accessKey: "email",
		headClasses:
			"py-1 text-sm text-[15px] text-slate-900/80 font-semibold capitalize cursor-default select-none font-afacad",
		className:
			"w-[20%] min-w-[120px] text-[13px] text-slate-900/75 cursor-default font-dm-sans text-start",
		headCellLabel: function () {
			return "Email";
		},
		bodyCellLabel: function ({ item }) {
			return item[this.accessKey];
		},
	},
	{
		id: "update",
		accessKey: "update",
		headClasses: "py-1 cursor-default h-auto font-semibold",
		className:
			"w-[10%] h-[49px] flex items-center justify-center min-w-[40px] text-[13px] text-slate-900/90 font-dm-sans text-center",
		bodyCellLabel: tableCellWrapper?.call(
			{ id: "update", accessKey: "update" },
			function Label(context) {
				const { user, setUsers } = useContext(ContextProvider);
				const [selectedOption, setSelectedOption] = useState(context.item.role);

				return user?.role === "Admin" ? (
					<Select
						options={["Admin", "Editor", "Viewer"]}
						selectedOption={selectedOption}
						onOptionSelect={setSelectedOption}
						onChange={(role) => handleRoleChange(role, context.item, setUsers)}
					/>
				) : null;
			}
		),
		headCellLabel: function Label() {
			const { user } = useContext(ContextProvider);
			return user?.role === "Admin" ? "Update Role" : "";
		},
	},
];

async function handleRoleChange(role, user, setUsers) {
	const response = await fetchApiResponse({
		url: "users/assign-role",
		payload: { userId: user._id, role },
		method: "post",
	});

	if (response.status === 200) {
		const updatedUser = response.data.user;
		setUsers((prev) =>
			prev.map((usr) => (usr._id === updatedUser._id ? updatedUser : usr))
		);
	}

	console.log(response);
}
