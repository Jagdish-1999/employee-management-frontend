import { useState, useRef } from "react";

import { useEffect } from "react";

const useOutsideClick = (ref, callback) => {
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				callback();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref, callback]);
};

const CustomSelect = ({
	options,
	selectedOption,
	onOptionSelect,
	onChange,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	useOutsideClick(dropdownRef, () => setIsOpen(false));

	const handleSelect = (option) => {
		onChange(option);
		onOptionSelect(option);
		setIsOpen(false);
	};

	return (
		<div className="relative w-full justify-center flex" ref={dropdownRef}>
			<div
				onClick={() => setIsOpen(!isOpen)}
				className="w-full h-fit cursor-pointer border border-gray-300 rounded-md px-2 py-2 bg-white text-gray-700 flex justify-between items-center gap-2">
				<span className="font-medium">{selectedOption || "Select a role"}</span>
				<svg
					className={`w-4 h-4 transform transition-transform ${
						isOpen ? "rotate-180" : "rotate-0"
					}`}
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</div>
			{isOpen && (
				<ul className="absolute z-10 mt-9 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
					{options.map((option, index) => (
						<li
							key={index}
							onClick={() => handleSelect(option)}
							className="cursor-pointer px-4 py-2 hover:bg-blue-100">
							{option}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default CustomSelect;
