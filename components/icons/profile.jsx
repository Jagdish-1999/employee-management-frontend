const ProfileIcon = ({ className, onClick }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
			width={45}
			height={40}
			className={className}
			onClick={onClick}>
			<path d="M256 250.8a73.34 73.34 0 1 1 73.33-73.34A73.41 73.41 0 0 1 256 250.8zm0-125.53a52.2 52.2 0 1 0 52.19 52.19A52.25 52.25 0 0 0 256 125.27zm117.07 282.6H138.93l-10.57-10.57a127.64 127.64 0 1 1 255.28 0zM150 386.73h212a106.51 106.51 0 0 0-212 0z"></path>
		</svg>
	);
};

export default ProfileIcon;
