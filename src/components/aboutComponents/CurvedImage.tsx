import { useId } from "react";

const CurvedImage=({
	src,
	alt,
}: {
	src: string;
	alt?: string;
	width?: number;
	height?: number;
})=> {
	const id = useId();
	const clipId = `clip-${id}`;
	const pathD = `
    M 0 0
    C 200 40, 800 40, 1000 0
    L 1000 300
    C 800 260, 200 260, 0 300
    Z
  `;

	return (
		<svg
			viewBox="0 0 1000 300"
			width="100%"
			height="auto"
			preserveAspectRatio="xMidYMid slice"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label={alt}
		>
			<defs>
				<clipPath id={clipId} clipPathUnits="userSpaceOnUse">
					<path d={pathD} />
				</clipPath>
			</defs>

			<image
				href={src}
				x="0"
				y="0"
				width="1000"
				height="300"
				preserveAspectRatio="xMidYMid slice"
				clipPath={`url(#${clipId})`}
			/>
		</svg>
	);
}
export default CurvedImage;