import { cn } from "../../../utils/cn";

const TableBody = ({ children, className, style }) => {
	return (
		<tbody className={cn(className)} style={style}>
			{children}
		</tbody>
	);
};

export { TableBody };
