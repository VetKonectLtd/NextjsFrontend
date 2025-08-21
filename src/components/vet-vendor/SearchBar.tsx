
import Image from "next/image";
import { Search } from "lucide-react"; 
import {Map} from "@/app/assets/icons/vet-vendor"

const SearchBar = () => {
  return (
      <div className="flex items-center flex-1 bg-white rounded-full shadow-sm border border-gray-200 pl-4 pr-1 py-1">
        <Image src={Map} alt="Location" width={20} height={20} className="mr-2" />
        <input
          type="text"
          placeholder="Type in your location"
          className="flex-1 bg-transparent outline-none text-sm px-2"
        />
        <button className="bg-gray-500 rounded-r-full p-3 flex items-center justify-center">
          <Search size={15} color="#fff" />
        </button>
      </div>
      
  );
};

export default SearchBar;