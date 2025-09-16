"use client";
import Image from "next/image";
import { Icon1, Icon2, Icon3, Arrow } from "@/app/assets/icons/auth";
import { usePathname } from "next/navigation";
import { AuthBg } from "@/app/assets/images";

export default function SignupLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const steps = [
		{ path: "/signup/account", label: "Account Details", icon: Icon1 },
		{ path: "/signup/verification", label: "Verify Account", icon: Icon3 },
		{ path: "/signup/personal-info", label: "Personal Info", icon: Icon2 },
	];

	const currentIndex = steps.findIndex((step) =>
		pathname.startsWith(step.path),
	);

	const progressItem = (icon: any, label: string, index: number) => (
		<div
			className={`flex flex-col items-center space-y-2 ${
				currentIndex === index
					? "text-primary-400"
					: currentIndex > index
						? "text-primary-400"
						: "text-gray-500"
			}`}
		>
			<Image
				src={icon}
				alt={label}
				className={`w-10 h-10 ${
					currentIndex === index
						? "filter-green"
						: currentIndex > index
							? "scale-110 filter-green"
							: "filter-gray"
				}`}
			/>
			<span className="text-xs text-center">{label}</span>
		</div>
	);

	return (
		<div
			style={{ backgroundImage: `url(${AuthBg.src})` }}
			className="md:min-h-screen bg-white bg-center bg-cover bg-no-repeat flex flex-col py-12 px-4"
		>
			<div className="w-full pt-36 max-w-md mx-auto">
				<div className="text-center mb-8">
					<h1 className="text-4xl font-extrabold mb-2 text-gray-55">
						Create Account
					</h1>
					<p className="text-base max-w-sm m-auto font-normal text-[#666666] mb-6">
						Create a new account to become a user or a veterinarian on Vet
						Konect by clicking on one of the cards below
					</p>
				</div>
			</div>

			<div className="flex items-center max-w-xs mx-auto justify-center gap-8 mb-8">
				{steps.map((step, i) => (
					<div key={i} className="flex items-center gap-8">
						{progressItem(step.icon, step.label, i)}

						{/* Render arrow except after last step */}
						{i < steps.length - 1 && (
							<Image
								src={Arrow}
								alt="arrow"
								className={`w-3 h-2 ${
									currentIndex === i
										? "filter-green"
										: currentIndex > i
											? "scale-110 filter-green"
											: "filter-gray"
								}`}
							/>
						)}
					</div>
				))}
			</div>

			{children}
		</div>
	);
}
