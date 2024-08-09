import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Table from "../common/table/table.jsx";
import { COLUMNS } from "./column.jsx";
import { ContextProvider } from "../../src/App.jsx";
import fetchApiResponse from "../../utils/fetch-response.js";
import Modal from "../common/modal/modal.jsx";
import Input from "../common/input/input.jsx";
import EditIcon from "../icons/edit.jsx";
import DeleteIcon from "../icons/delete.jsx";

// const Employees = () => {
// 	const { user, employees, setEmployees } = useContext(ContextProvider);
// 	const initialRef = useRef(true);
// 	const [values, setValues] = useState({
// 		name: "",
// 		email: "",
// 		position: "",
// 		department: "",
// 		joiningDate: new Date(),
// 		salary: 80000,
// 	});

// 	useEffect(() => {
// 		if (initialRef.current) {
// 			(async () => {
// 				const response = await fetchApiResponse({
// 					url: "employee/fetch",
// 				});
// 				setEmployees(response.data.users);
// 				initialRef.current = false;

// 				setEmployees(response.data.employees);
// 			})();
// 			initialRef.current = false;
// 		}
// 	}, [setEmployees, user.token]);

// 	const handleChange = useCallback((evt) => {
// 		setValues((prev) => ({
// 			...prev,
// 			[evt.target.name]: evt.target.value,
// 		}));
// 	}, []);

// 	const handleSubmit = async () => {
// 		const response = await fetchApiResponse({
// 			url: `employee/create`,
// 			payload: values,
// 			method: "post",
// 		});

// 		if (response.status === 201) {
// 			const createdEmp = response.data.employee;
// 			setEmployees((prev) => [createdEmp, ...prev]);
// 		}
// 	};

// 	return (
// 		<>
// 			<div>
// 				<>
// 					{user?.role !== "Viewer" ? (
// 						<Modal
// 							continueText="Create"
// 							trigger={
// 								<div
// 									className="p-1.5 bg-blue-600 text-white hover:bg-blue-600  px-2 rounded-md transition-all duration-150 w-fit float-end mb-3 -mt-2 cursor-pointer"
// 									onClick={() => {}}>
// 									Create Employee
// 								</div>
// 							}
// 							onSubmit={handleSubmit}>
// 							<h2 className="text-xl font-semibold mb-4">Employee details</h2>
// 							<form>
// 								<div className="mb-4">
// 									<Input
// 										required
// 										id="name"
// 										type="name"
// 										label="Name"
// 										name="name"
// 										placeholder="Name"
// 										value={values.name}
// 										onChange={handleChange}
// 									/>
// 								</div>
// 								<div className="mb-4">
// 									<Input
// 										required
// 										id="email"
// 										type="email"
// 										label="Email"
// 										name="email"
// 										placeholder="Email"
// 										value={values.email}
// 										onChange={handleChange}
// 									/>
// 								</div>
// 								<div className="mb-4">
// 									<Input
// 										required
// 										id="position"
// 										type="position"
// 										label="position"
// 										name="position"
// 										placeholder="position"
// 										value={values.position}
// 										onChange={handleChange}
// 									/>
// 								</div>
// 								<div className="mb-4">
// 									<Input
// 										required
// 										id="department"
// 										type="department"
// 										label="Department"
// 										name="department"
// 										placeholder="Department"
// 										value={values.department}
// 										onChange={handleChange}
// 									/>
// 								</div>
// 							</form>
// 						</Modal>
// 					) : null}
// 				</>
// 			</div>
// 			<Table data={employees} columns={COLUMNS} isLoading={false} />
// 		</>
// 	);
// };

// export default Employees;

const Employees = () => {
	const { user, employees, setEmployees } = useContext(ContextProvider);
	const initialRef = useRef(true);
	const [values, setValues] = useState({
		name: "",
		email: "",
		position: "",
		department: "",
		joiningDate: new Date(),
		salary: 80000,
	});
	const [updatedValues, setUpdatedValues] = useState({
		name: "",
		email: "",
		position: "",
		department: "",
		joiningDate: new Date(),
		salary: 80000,
	});

	useEffect(() => {
		if (initialRef.current) {
			(async () => {
				const response = await fetchApiResponse({
					url: "employee/fetch",
				});
				setEmployees(response.data.users);
				initialRef.current = false;

				setEmployees(response.data.employees);
			})();
			initialRef.current = false;
		}
	}, [setEmployees, user.token]);

	const handleChange = useCallback(
		(evt) => {
			setValues((prev) => ({
				...prev,
				[evt.target.name]: evt.target.value,
			}));
		},
		[setValues]
	);

	const handleUpdateChange = useCallback(
		(evt) => {
			setUpdatedValues((prev) => ({
				...prev,
				[evt.target.name]: evt.target.value,
			}));
		},
		[setUpdatedValues]
	);

	const handleSubmit = async () => {
		const response = await fetchApiResponse({
			url: `employee/create`,
			payload: values,
			method: "post",
		});

		if (response.status === 201) {
			const createdEmp = response.data.employee;
			setEmployees((prev) => [createdEmp, ...prev]);
		}
	};

	const handleUpdate = useCallback(
		async (_id) => {
			const response = await fetchApiResponse({
				url: `employee/${_id}`,
				payload: updatedValues,
				method: "put",
			});

			if (response.status < 400) {
				const updatedEmp = response.data.employee;
				setEmployees((prev) =>
					prev.map((emp) => (emp._id === updatedEmp._id ? updatedEmp : emp))
				);
			}
		},
		[setEmployees, updatedValues]
	);

	const handleEdit = useCallback((emp) => {
		setUpdatedValues((prev) => ({
			...prev,
			name: emp.name,
			email: emp.email,
			position: emp.position,
			department: emp.department,
		}));
	}, []);

	const handleDelete = async (emp) => {
		const response = await fetchApiResponse({
			url: `employee/${emp._id}`,
			method: "delete",
		});

		if (response.status === 200) {
			const deletedEmp = response.data.employee;
			setEmployees((prev) => prev.filter((emp) => emp._id !== deletedEmp._id));
		}
	};

	return (
		<>
			<div>
				<>
					{user?.role === "Admin" ? (
						<Modal
							continueText="Create"
							trigger={
								<div className="p-1.5 bg-blue-600 text-white hover:bg-blue-600  px-2 rounded-md transition-all duration-150 w-fit float-end mb-3 -mt-2 cursor-pointer">
									Create Employee
								</div>
							}
							onSubmit={handleSubmit}>
							<h2 className="text-xl font-semibold mb-4">Employee details</h2>
							<form>
								<div className="mb-4">
									<Input
										required
										id="name"
										type="name"
										label="Name"
										name="name"
										placeholder="Name"
										value={values.name}
										onChange={handleChange}
									/>
								</div>
								<div className="mb-4">
									<Input
										required
										id="email"
										type="email"
										label="Email"
										name="email"
										placeholder="Email"
										value={values.email}
										onChange={handleChange}
									/>
								</div>
								<div className="mb-4">
									<Input
										required
										id="position"
										type="position"
										label="position"
										name="position"
										placeholder="position"
										value={values.position}
										onChange={handleChange}
									/>
								</div>
								<div className="mb-4">
									<Input
										required
										id="department"
										type="department"
										label="Department"
										name="department"
										placeholder="Department"
										value={values.department}
										onChange={handleChange}
									/>
								</div>
							</form>
						</Modal>
					) : null}
				</>
			</div>
			<div className="h-[calc(100%-35px)]">
				<Table
					data={employees}
					columns={COLUMNS.map((col) => {
						if (col.id === "edit") {
							return {
								...col,
								bodyCellLabel: (context) => (
									<>
										{user?.role !== "Viewer" ? (
											<Modal
												trigger={
													<EditIcon
														className="w-8 h-8 p-1.5 hover:bg-blue-600/10 rounded-full transition-all duration-150"
														onClick={() => handleEdit(context.item)}
													/>
												}
												onSubmit={() => handleUpdate(context.item._id)}>
												<h2 className="text-xl font-semibold mb-4">
													Update Employee details
												</h2>
												<form>
													<div className="mb-4">
														<Input
															required
															id="name"
															type="name"
															label="Name"
															name="name"
															placeholder="Name"
															value={updatedValues.name}
															onChange={handleUpdateChange}
														/>
													</div>
													<div className="mb-4">
														<Input
															required
															id="email"
															type="email"
															label="Email"
															name="email"
															placeholder="Email"
															value={updatedValues.email}
															onChange={handleUpdateChange}
														/>
													</div>
													<div className="mb-4">
														<Input
															required
															id="position"
															type="position"
															label="position"
															name="position"
															placeholder="position"
															value={updatedValues.position}
															onChange={handleUpdateChange}
														/>
													</div>
													<div className="mb-4">
														<Input
															required
															id="department"
															type="department"
															label="Department"
															name="department"
															placeholder="Department"
															value={updatedValues.department}
															onChange={handleUpdateChange}
														/>
													</div>
												</form>
											</Modal>
										) : null}
									</>
								),
							};
						}
						if (col.id === "delete") {
							return {
								...col,
								bodyCellLabel: (context) => (
									<>
										{user.role === "Admin" ? (
											<DeleteIcon
												className="w-8 h-8 p-1 hover:bg-red-600/10 rounded-full transition-all duration-150"
												onClick={() => handleDelete(context.item)}
											/>
										) : null}
									</>
								),
							};
						}
						return col;
					})}
					isLoading={false}
				/>
			</div>
		</>
	);
};

export default Employees;
