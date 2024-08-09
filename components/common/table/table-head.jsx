import { TableCell } from "./table-cell";
import { TableRow } from "./table-row";
import { cn } from "../../../utils/cn";

const TableHead = ({ columns, onCellClick, className }) => {
	return (
		<thead className={cn(className)}>
			<TableRow className={cn("bg-inherit text-inherit")}>
				{columns.map((column) => (
					<TableCell
						key={column.id}
						className={cn(
							"w-full h-full flex text-inherit py-2",
							column.className,
							column.headClasses
						)}>
						{column.headCellLabel({ onCellClick })}
					</TableCell>
				))}
			</TableRow>
		</thead>
	);
};

export { TableHead };
