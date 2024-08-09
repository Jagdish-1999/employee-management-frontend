import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

// Custom hook to handle outside clicks
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

const Modal = ({ trigger, children, onSubmit, continueText }) => {
	const [isOpen, setIsOpen] = useState(false);
	const modalRef = useRef(null);

	useOutsideClick(modalRef, () => setIsOpen(false));

	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);

	return (
		<>
			<div onClick={openModal}>{trigger}</div>
			{isOpen &&
				createPortal(
					<div
						className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 bg-gray-900 bg-opacity-50 backdrop-blur-md`}>
						<div
							ref={modalRef}
							className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
							{children}
							<div className="flex justify-end mt-4 gap-4">
								<button
									type="button"
									className="inline-flex justify-center px-4 py-2 text-sm font-medium text-black bg-indigo-300 border border-transparent rounded-md shadow-sm hover:bg-indigo-300/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									onClick={closeModal}>
									Close
								</button>
								<button
									type="button"
									className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									onClick={onSubmit}>
									{continueText || "Update"}
								</button>
							</div>
						</div>
					</div>,
					document.body // Render modal at the end of the body
				)}
		</>
	);
};

export default Modal;
