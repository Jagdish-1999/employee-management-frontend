import CreatedUpdatedAt from "../common/time-stamps/time-stamp.jsx";
import { tableCellWrapper } from "../../utils/cell-actions.js";
import { useContext } from "react";
import { ContextProvider } from "../../src/App.jsx";
import DeleteIcon from "../icons/delete.jsx";
import fetchApiResponse from "../../utils/fetch-response.js";

export const COLUMNS = [
	{
		id: "id",
		accessKey: "_id",
		headClasses:
			"py-1 text-sm text-[15px] text-slate-900/80 font-semibold cursor-default select-none font-afacad",
		className:
			"w-[20%] min-w-[120px] text-[13px] text-slate-900/75 capitalize cursor-default font-dm-sans text-start pl-6",
		headCellLabel: function () {
			return "Employee Id";
		},
		bodyCellLabel: function ({ item }) {
			return item[this.accessKey];
		},
	},
	{
		id: "name",
		accessKey: "name",
		headClasses:
			"py-1 text-sm text-[15px] text-slate-900/80 font-semibold cursor-default select-none font-afacad",
		className:
			"w-[10%] min-w-[120px] text-[13px] text-slate-900/75 capitalize cursor-default font-dm-sans text-start",
		headCellLabel: function () {
			return "Employee Name";
		},
		bodyCellLabel: function ({ item }) {
			return item[this.accessKey];
		},
	},
	{
		id: "position",
		accessKey: "position",
		headClasses:
			"py-1 text-sm text-[15px] text-slate-900/80 font-semibold capitalize cursor-default select-none font-afacad",
		className:
			"w-[10%] min-w-[120px] text-[13px] text-slate-900/75 cursor-default font-dm-sans text-start",
		headCellLabel: function () {
			return "Position";
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
			"w-[15%] min-w-[120px] text-[13px] text-slate-900/75 cursor-default font-dm-sans text-start",
		headCellLabel: function () {
			return "Email";
		},
		bodyCellLabel: function ({ item }) {
			return item[this.accessKey];
		},
	},
	{
		id: "department",
		accessKey: "department",
		headClasses:
			"py-1 text-sm text-[15px] text-slate-900/80 font-semibold capitalize cursor-default select-none font-afacad",
		className:
			"w-[10%] min-w-[120px] text-[13px] text-slate-900/75 cursor-default justify-center font-dm-sans",
		headCellLabel: function () {
			return "Department";
		},
		bodyCellLabel: function ({ item }) {
			return item[this.accessKey];
		},
	},
	{
		id: "createdAt",
		accessKey: "createdAt",
		headClasses:
			"py-1 pr-2 text-[15px] text-slate-900/80 font-semibold cursor-default select-none font-afacad",
		className:
			"w-[10%] min-w-[90px] flex items-center justify-center text-[13px] text-slate-900/75 cursor-default font-dm-sans",
		headCellLabel: function () {
			return "Created At";
		},
		bodyCellLabel: function ({ item }) {
			return <CreatedUpdatedAt item={item} accessKey={this.accessKey} />;
		},
	},
	{
		id: "updatedAt",
		accessKey: "updatedAt",
		headClasses:
			"py-1 text-[15px] text-slate-900/80 font-semibold cursor-default select-none font-afacad",
		className:
			"w-[10%] min-w-[90px] flex items-center justify-center text-[13px] text-slate-900/75 cursor-default font-dm-sans",
		headCellLabel: function () {
			return "Updated At";
		},
		bodyCellLabel: function ({ item }) {
			return <CreatedUpdatedAt item={item} accessKey={this.accessKey} />;
		},
	},
	{
		id: "edit",
		accessKey: "edit",
		headClasses: "py-1 cursor-default font-semibold ",
		className:
			"w-[10%] flex items-center justify-center min-w-[40px] text-[13px] text-slate-900/90 font-dm-sans text-center pl-6",
		bodyCellLabel: tableCellWrapper?.call(
			{ id: "edit", accessKey: "edit" },
			function Label() {
				return null;
			}
		),
		headCellLabel: function Label() {
			const { user } = useContext(ContextProvider);
			return user?.role !== "Viewer" ? "Edit" : "";
		},
	},
	{
		id: "delete",
		accessKey: "delete",
		headClasses: "py-1 cursor-default h-auto font-semibold ",
		className:
			"w-[10%] h-[49px] flex items-center justify-center min-w-[40px] text-[13px] text-slate-900/90 font-dm-sans text-center",
		bodyCellLabel: tableCellWrapper?.call(
			{ id: "edit", accessKey: "edit" },
			function (context) {
				const { user, setEmployees } = useContext(ContextProvider);
				return user?.role === "Admin" ? (
					<DeleteIcon
						className="w-8 h-8 p-1 hover:bg-red-600/10 rounded-full transition-all duration-150"
						onClick={() => removeEmployeeHandler(context.item, setEmployees)}
					/>
				) : null;
			}
		),
		headCellLabel: function Label() {
			const { user } = useContext(ContextProvider);
			return user?.role === "Admin" ? "Delete" : "";
		},
	},
];

async function removeEmployeeHandler(emp, setEmployees) {
	const response = await fetchApiResponse({
		url: `employee/${emp._id}`,
		method: "delete",
	});

	if (response.status === 200) {
		const deletedEmp = response.data.employee;
		setEmployees((prev) => prev.filter((emp) => emp._id !== deletedEmp._id));
	}
}
