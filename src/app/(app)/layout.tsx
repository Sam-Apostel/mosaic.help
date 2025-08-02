import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import type { PropsWithChildren } from "react";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Mosaic Helper",
	description: "track progress on your mosaic or knitting projects",
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<ClerkProvider appearance={{ cssLayerName: "clerk" }}>
			<html lang="en">
				<head>
					<link
						rel="icon"
						type="image/png"
						href="/favicon-96x96.png"
						sizes="96x96"
					/>
					<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
					<link rel="shortcut icon" href="/favicon.ico" />
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/apple-touch-icon.png"
					/>
				</head>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
