import Image from "next/image";
import { Hand } from "@/app/assets/icons";

interface EmptyStateProps {
  title: string;
  image?: string;
  description?: string;
}

const EmptyState = ({ title, image, description }: EmptyStateProps) => {
  return (
    <div className="max-w-xs text-center py-20  flex-col md:h-96  h-auto justify-center m-auto">
      <div className="w-20 h-20 mb-3 m-auto overflow-hidden">
        <Image
          src={image || Hand}
          alt={"Messages"}
          width={80}
          height={80}
          className="object-contain w-full h-full"
        />
      </div>

      <h1 className="text-gray-55 font-bold text-2xl">{title}</h1>

      <p className="text-[#666666] font-normal text-xl">{description}</p>
    </div>
  );
};

export default EmptyState;
