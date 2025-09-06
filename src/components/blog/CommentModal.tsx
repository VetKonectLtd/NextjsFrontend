import React from "react";

const CommentModal = (setOpenDropdownId:any) => {
	return (
		<div className="absolute right-0  mt-8 w-28 bg-white border duration-75 transition-all border-gray-200 rounded-lg shadow-lg z-10">
			<button
				className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
				onClick={() => setOpenDropdownId(null)}
			>
				Edit
			</button>
			<button
				className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-red-500"
				onClick={() => setOpenDropdownId(null)}
			>
				Delete
			</button>
		</div>
	);
};

export default CommentModal;
