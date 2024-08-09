const DeleteIcon = ({ className, onClick }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 48 48"
			width="48"
			height="48"
			className={className}
			onClick={onClick}
			fill="red">
			<path d="m17.43 19 1.14 16.12H29.7L30.84 19h2.63l-1.15 16.3a2.63 2.63 0 0 1-2.62 2.44H18.57A2.61 2.61 0 0 1 16 35.3L14.81 19Z"></path>
			<path d="M20.52 19.81h2.62v12.23h-2.62zM25.31 19.81h2.62v12.23h-2.62zM10.89 14.63H37.1v2.62H10.89zM18.98 10.26h10.49v2.62H18.98z"></path>
		</svg>
	);
};

export default DeleteIcon;
