import Image from 'next/image'
import { useRouter } from 'next/navigation';
import Success from "@/app/assets/icons/auth/success.svg";

const LoginSuccess = () => {
    const router = useRouter();
  return (
    <>
			<div className="w-full  pt-36  max-w-sm mx-auto flex flex-col items-center">
				<div className="mb-6">
					<span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-600">
						<Image
							src={Success}
							alt="success Logo"
							className="object-contain"
						/>
					</span>
				</div>

				<h1 className="text-2xl font-bold text-center text-[#1D2432] mb-2">
					Congratulations!
				</h1>
				<p className="text-base font-normal text-center text-[#666666] mb-8">
					Login Successful
				</p>

				<button
					type="button"
					className="w-full py-3 rounded-md text-white text-base font-semibold bg-[#0B6614] hover:bg-[#0b6614dc] transition"
					onClick={() => router.push("#")}
				>
					Go to Dashboard
				</button>
			</div>
		</>
  )
}

export default LoginSuccess