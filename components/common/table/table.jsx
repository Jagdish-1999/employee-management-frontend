import { TableHead } from "./table-head";
import { TableBody } from "./table-body";
import { TableRow } from "./table-row";
import { TableCell } from "./table-cell";
import TableLoading from "./table-loading";
import { TableCounter } from "./table-counter";
import { NoDataAvailable } from "./table-no-data";
import { cn } from "../../../utils/cn";

const Table = ({
	data = [],
	columns = {},
	isLoading = false,
	onCellClick,
	onRowClick,
	noDataText = "No data available",
}) => {
	return (
		<div className="overflow-hidden h-full w-full rounded-sm rounded-ee-[3px] border border-neutral-500/20">
			<table
				className="table overflow-auto relative w-full h-full bg-white"
				style={{ width: "100%", height: "100%" }}>
				<TableHead
					columns={columns}
					className="bg-neutral-100 text-[18px] absolute backdrop-blur-md w-full h-fit z-10 py-0.5"
					onCellClick={onCellClick}
				/>
				<TableBody
					className="custom-scrollbar block w-full h-full overflow-auto font-dm-sans text-xs top-10"
					style={{ height: "100%" }}>
					<TableRow className="p-4">
						<TableCell>
							<p></p>
						</TableCell>
					</TableRow>
					{isLoading && !data.length && <TableLoading columns={columns} />}
					{data.length > 0 &&
						data.map((item, idx) => {
							return (
								<TableRow
									key={item._id}
									className={cn(
										idx % 2 !== 0 &&
											"bg-neutral-200 transition-all duration-150",
										item.isDeleting && "pointer-events-none select-none",
										onRowClick && "cursor-pointer"
									)}
									onClick={() => {
										onRowClick?.(item);
									}}>
									{columns.map((column) => (
										<TableCell key={column.id} className={cn(column.className)}>
											{column.bodyCellLabel({ item, onCellClick })}
										</TableCell>
									))}
								</TableRow>
							);
						})}
					{!data.length && !isLoading && (
						<NoDataAvailable noDataText={noDataText} />
					)}
					{data.length > 0 && !isLoading && (
						<TableCounter totalCount={data.length} currentCount={data.length} />
					)}
				</TableBody>
			</table>
		</div>
	);
};

export default Table;
