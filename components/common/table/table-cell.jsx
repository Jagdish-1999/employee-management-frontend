import { cn } from "../../../utils/cn";

const TableCell = ({ children, className = "" }) => {
	return (
		<td
			className={cn(
				"cursor-pointer w-full h-full text-sm text-inherit transition-all duration-150",
				className
			)}>
			{children}
		</td>
	);
};

export { TableCell };
