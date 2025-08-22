import Image from "next/image";
 const progressItem = (icon: any, label: string, index: number) => (
    <div
        className="flex flex-col items-center space-y-3 justify-center text-primary-400"		
    >
        <Image
            src={icon}
            alt={label}
            className="object-contain w-10 h-10 filter-green"
        />
        <span className="text-xs font-normal">{label}</span>
    </div>
);

export default progressItem;