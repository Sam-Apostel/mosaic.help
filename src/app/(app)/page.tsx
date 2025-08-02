"use client";

import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	UserButton,
} from "@clerk/nextjs";
import type { Color } from "@react-types/color";
import { UploadIcon } from "lucide-react";
import {
	type ChangeEvent,
	type CSSProperties,
	useMemo,
	useRef,
	useState,
} from "react";
import { parseColor } from "react-stately";
import { ColorPicker } from "@/components/react-aria-components/ColorPicker";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";

export default function Home() {
	const [image, setImage] = useState<string | null>(null);

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setImage(e.target?.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	if (image) {
		return <WithImage image={image} key={image} />;
	}

	return (
		<main className="bg-accent min-h-screen p-4">
			<div className="mx-auto max-w-6xl space-y-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<SignedOut>
								<div className="h-8 w-8 rounded bg-gradient-to-br from-blue-500 to-purple-600 shrink-0" />
							</SignedOut>
							<SignedIn>
								<UserButton
									appearance={{
										elements: {
											userButtonTrigger: "rounded",
											avatarBox: "h-8 w-8 rounded",
										},
									}}
								/>
							</SignedIn>
							Mosaic & Knitting Tracker
							<div className="ml-auto flex gap-4">
								<SignedOut>
									<SignInButton mode="modal">
										<Button>Sign in</Button>
									</SignInButton>
									<SignUpButton mode="modal">
										<Button variant="secondary">Sign up</Button>
									</SignUpButton>
								</SignedOut>
							</div>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12">
							<UploadIcon className="h-12 w-12 text-gray-400" />
							<h3 className="mt-4 text-lg font-medium">
								Upload your reference image
							</h3>
							<p className="mt-2 text-sm text-gray-500">
								Choose an image you want to recreate as a mosaic
							</p>
							<Button
								onClick={() => fileInputRef.current?.click()}
								className="mt-4"
							>
								Select Image
							</Button>
							<input
								ref={fileInputRef}
								type="file"
								accept="image/*"
								onChange={handleImageUpload}
								className="hidden"
							/>
						</div>
					</CardContent>
				</Card>
				{/*<UserProjectsCard />*/}
			</div>
		</main>
	);
}

// const projects = [
// 	{
// 		name: "Ahri",
// 		slug: "ahri",
// 		image: {
// 			full: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzMwU1hKd1lLMGRjY09OMXpkdURRRlQ0QktiZSJ9?width=160",
// 			thumbHash: "ojfdoaf",
// 		},
// 		gridSize: [10, 20],
// 		theme: { grid: "#fff", completed: "#0f0" },
// 		completed: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
// 	},
// ];
//
// function UserProjectsCard() {
// 	if (!projects.length) return null;
//
// 	return (
// 		<SignedIn>
// 			<Card>
// 				<CardHeader>
// 					<CardTitle>Your Projects</CardTitle>
// 				</CardHeader>
// 				<CardContent>
// 					<div className="grid grid-cols-12 gap-4">
// 						{projects.map((project) => (
// 							<div key={project.slug} className="col-span-6">
// 								<div className="flex items-center justify-between">
// 									<div className="flex items-center gap-2">
// 										{/** biome-ignore lint/performance/noImgElement: <explanation> */}
// 										<img
// 											src={project.image.full}
// 											alt={project.name}
// 											className="h-12 w-12 rounded-lg"
// 										/>
// 										<div className="flex flex-col">
// 											<span className="text-lg font-medium">
// 												{project.name}
// 											</span>
// 											<span className="text-sm text-gray-500">
// 												{project.gridSize[0]}x{project.gridSize[1]}
// 											</span>
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 						))}
// 					</div>
// 				</CardContent>
// 			</Card>
// 		</SignedIn>
// 	);
// }

function WithImage({ image }: { image: string }) {
	const [completedSquares, setCompletedSquares] = useState<Set<string>>(
		new Set(),
	);
	const [imageLoaded, setImageLoaded] = useState(false);
	const imageRef = useRef<HTMLImageElement>(null);
	const [gridSize, setGridSize] = useState([20]);

	const { totalSquares, cols, rows } = useMemo(() => {
		if (!imageLoaded || !imageRef.current)
			return { totalSquares: 0, cols: 0, rows: 0 };
		const canvas = imageRef.current;
		const squareSize = Math.min(canvas.width, canvas.height) / gridSize[0];
		const cols = Math.ceil(canvas.width / squareSize);
		const rows = Math.ceil(canvas.height / squareSize);
		return { totalSquares: cols * rows, cols, rows };
	}, [imageLoaded, gridSize]);

	const completionPercentage =
		totalSquares > 0 ? (completedSquares.size / totalSquares) * 100 : 0;

	const handleImageLoad = () => {
		setImageLoaded(true);
	};
	const [gridColor, setGridColor] = useState<Color>(parseColor("#6a728296"));
	const [completedColor, setCompletedColor] = useState<Color>(
		parseColor("#D2CFF196"),
	);

	return (
		<main
			className="bg-accent min-h-screen p-4"
			style={
				{
					"--grid-color": gridColor.toString("css"),
					"--completed-color": completedColor.toString("css"),
				} as CSSProperties
			}
		>
			<div className="mx-auto max-w-6xl space-y-6">
				<Card>
					<CardHeader className="gap-0">
						<CardTitle className="flex items-center gap-2">
							<SignedOut>
								<div className="h-8 w-8 rounded bg-gradient-to-br from-blue-500 to-purple-600 shrink-0" />
							</SignedOut>
							<SignedIn>
								<UserButton
									appearance={{
										elements: {
											userButtonTrigger: "rounded",
											avatarBox: "h-8 w-8 rounded",
										},
									}}
								/>
							</SignedIn>
							Mosaic & Knitting Tracker
							<div className="ml-auto flex gap-4">
								<SignedOut>
									<SignInButton mode="modal">
										<Button>Sign in</Button>
									</SignInButton>
									<SignUpButton mode="modal">
										<Button variant="secondary">Sign up</Button>
									</SignUpButton>
								</SignedOut>
							</div>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="relative">
							{/** biome-ignore lint/performance/noImgElement: Want raw access to element */}
							<img
								ref={imageRef}
								src={image || "/placeholder.svg"}
								alt="Reference artwork"
								className="max-w-full h-auto rounded-lg shadow-lg"
								onLoad={handleImageLoad}
							/>
							{imageLoaded && (
								<div
									className="absolute inset-0 cursor-pointer rounded-lg grid overflow-clip"
									style={{
										gridTemplateColumns: `repeat(${cols}, 1fr)`,
										gridTemplateRows: `repeat(${rows}, 1fr)`,
									}}
								>
									{Array.from({ length: totalSquares }).map((_, i) => (
										<input
											id={i.toString()}
											type="checkbox"
											// biome-ignore lint/suspicious/noArrayIndexKey: we don't have an id yet
											key={i}
											onChange={() =>
												setCompletedSquares((prev) => {
													const id = i.toString();
													const next = new Set(prev);
													if (next.has(id)) next.delete(id);
													else next.add(id);
													return next;
												})
											}
											checked={completedSquares.has(i.toString())}
											className="border-[.5px] border-[var(--grid-color)] appearance-none checked:bg-[var(--completed-color)]"
										></input>
									))}
								</div>
							)}
						</div>
					</CardContent>
					<CardFooter>
						{completionPercentage > 0 ? (
							<>
								<div className="space-y-2">
									<Progress value={completionPercentage} className="w-full" />
									<p className="text-sm text-gray-600">
										{completedSquares.size} of {totalSquares} squares completed
										({Math.round(completionPercentage)}%)
									</p>
								</div>
								<div className="flex basis-2xs ml-auto gap-6">
									<ColorPicker
										label="grid color"
										value={gridColor}
										onChange={(color) => setGridColor(color)}
									/>
									<ColorPicker
										label="completed color"
										value={completedColor}
										onChange={(color) => setCompletedColor(color)}
									/>
								</div>
							</>
						) : (
							<div className="space-y-2 w-full">
								<Label>
									Detail Level: {cols}×{rows}
								</Label>
								<Slider
									value={gridSize}
									onValueChange={setGridSize}
									min={50}
									max={400}
									step={1}
									className="w-full"
								/>
								<p className="text-xs text-gray-500">
									Lower = fewer, larger squares
								</p>
							</div>
						)}
					</CardFooter>
				</Card>
			</div>
		</main>
	);
}
