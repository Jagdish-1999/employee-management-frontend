import { TableCell } from "./table-cell";
import { TableRow } from "./table-row";

const NoDataAvailable = ({ noDataText = "No data available" }) => {
	return (
		<TableRow>
			<TableCell>
				<h4 className="text-center p-2">{noDataText}</h4>
			</TableCell>
		</TableRow>
	);
};

export { NoDataAvailable };
