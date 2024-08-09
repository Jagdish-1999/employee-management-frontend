import { cn } from "../../../utils/cn";

const TableRow = ({ children, className, ...props }) => {
	return (
		<tr
			className={cn(
				"border-b border-neutral-500/15 w-full h-fit flex items-center transition-all duration-150",
				className
			)}
			{...props}>
			{children}
		</tr>
	);
};

export { TableRow };
