import { useState, useRef, useEffect } from "react";

interface Option {
	value: string;
	label: string;
}

interface FormSelectProps {
	label: string;
	focusLabel?: string;
	isRequired?: boolean;
	searchable?: boolean;
	options: Option[];
	value: string;
	onChange: (value: string) => void;
    disabled?: boolean; 
}

const FormSelect = ({
	label,
	focusLabel,
	isRequired,
	searchable = false,
	options,
	value,
	onChange,
    disabled = false,
}: FormSelectProps) => {
	const [isFocused, setIsFocused] = useState(false);
	const [search, setSearch] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const filteredOptions = searchable
		? options?.filter((opt) =>
				opt.label.toLowerCase().includes(search.toLowerCase())
		  )
		: options;

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				setIsOpen(false);
				setIsFocused(false);
				setSearch("");
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="relative w-full" ref={containerRef}>
			{/* Container */}
			<div
				className={`relative border rounded-sm bg-white ${
					disabled ? "border-[#1D2432] cursor-not-allowed" : "border-[#1D2432] cursor-pointer"
				}`}
				onClick={() => {
					if (!disabled) {
						setIsFocused(true);
						setIsOpen((prev) => !prev);
					}
				}}
			>
				{/* Input or Display */}
				{searchable ? (
					<input
						type="text"
						value={
							isOpen
								? search
								: options?.find((o) => o.value === value)?.label || ""
						}
						onChange={(e) => {
							if (!disabled) {
								setSearch(e.target.value);
								setIsOpen(true);
							}
						}}
						onFocus={() => {
							if (!disabled) {
								setIsFocused(true);
								setIsOpen(true);
							}
						}}
						className={`w-full px-4 pt-6 pb-1 rounded-sm text-sm border-none outline-none`}
					/>
				) : (
						<div className={`w-full px-4 pt-6 pb-1 text-sm ${disabled ? "text-gray-500" : ""}`}>
						{options?.find((o) => o.value === value)?.label || ""}
					</div>
				)}

				{/* Floating Label */}
				<label
					className={`absolute left-4 transition-all duration-200 pointer-events-none ${
						isFocused || value
							? "top-2 text-xs text-[#555555]"
							: "top-3.5 text-sm text-[#555555]"
					}`}
				>
					{isFocused && focusLabel ? focusLabel : label}
				</label>
			</div>

			{/* Dropdown */}
			{isOpen && (
				<ul className="absolute z-20 w-full bg-white border border-[#1D2432] rounded-sm mt-1 max-h-48 overflow-auto shadow-md">
					{filteredOptions?.length === 0 ? (
						<li className="px-4 py-2 text-sm text-gray-500">No results</li>
					) : (
						filteredOptions?.map((opt) => (
							<li
								key={opt.value}
								onClick={() => {
									onChange(opt.value);
									setSearch("");
									setIsOpen(false);
									setIsFocused(false);
								}}
								className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
									opt.value === value ? "bg-gray-100" : ""
								}`}
							>
								{opt.label}
							</li>
						))
					)}
				</ul>
			)}
		</div>
	);
};

export default FormSelect;
