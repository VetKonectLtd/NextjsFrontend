
import { Share2, SquareArrowOutDownLeft, SquarePen, Trash } from "lucide-react";
import Image from "next/image";

const PetCard = ({ name,image, species, breed, sex, age }: any) => (
	<div className="bg-white shadow-md rounded-xl border border-gray-200 p-4 flex flex-col gap-4">
		<div className="flex md:flex-row flex-col-reverse justify-center items-center md:justify-between">
			{/* Image + Name */}
			<div className="flex md:flex-row flex-col gap-4">
				<Image
					src={image}
					alt={name}
					width={200}
					height={200}
					className="md:w-12 md:h-12 w-16 h-16 m-auto border-2 border-gray-225 rounded-full object-cover"
				/>
				<div className="md:text-left text-center">
					<h2 className="font-bold text-lg">{name}</h2>
					<p className="text-xs text-gray-400">PT092201a</p>
				</div>
			</div>

			{/* Actions */}
			<div className="flex md:flex-row flex-col mb-5 md:mb-0 items-center md:gap-3 gap-2">
				<span className="px-3 py-1 mb-3 md:mb-0 bg-gray-100 border border-gray-225 text-gray-700 text-sm rounded-full">
					15 mins ago
				</span>
				<div className="flex items-center md:gap-3 gap-2">
					<button className="bg-white border cursor-pointer border-gray-225 shadow-md rounded-full p-2">
						<SquarePen size={14} color="#1D2432" />
					</button>
					<button className="bg-white border border-gray-225 shadow-md rounded-full p-2">
						<Trash size={14} color="#1D2432" />
					</button>
					<button className="bg-white border border-gray-225 shadow-md rounded-full p-2">
						<SquareArrowOutDownLeft size={14} color="#1D2432" />
					</button>
					<button className="bg-white border cursor-pointer border-gray-225 shadow-md rounded-full p-2">
						<Share2 size={14} color="#1D2432" />
					</button>
				</div>
			</div>
		</div>

		{/* Details */}
		<div className="mt-2 space-y-2 text-sm text-gray-55">
			<p className="flex md:flex-row justify-center items-center md:justify-between flex-col">
				<span className="font-semibold">Species</span> {species}
			</p>
			<p className="flex md:flex-row flex-col justify-center items-center md:justify-between">
				<span className="font-semibold">Breed</span> {breed}
			</p>
			<p className="flex md:flex-row flex-col justify-center items-center md:justify-between">
				<span className="font-semibold">Sex</span> {sex}
			</p>
			<p className="flex md:flex-row flex-col justify-center items-center md:justify-between">
				<span className="font-semibold">Age</span> {age}
			</p>
		</div>
	</div>
);

export default PetCard;
