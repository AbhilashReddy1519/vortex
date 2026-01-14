import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
	title: "Finish setting up your account",
	description: "Become professional developer",
};

function OnBoardingLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="relative flex flex-col h-screen">
			<div className="w-full bg-black flex lg:justify-start justify-center">
				<Link href={"/"} className="flex pt-4 items-center relative">
					<Image
						src={"/images/logo.png"}
						width={120}
						height={20}
						alt={"logo"}
						className="-rotate-55 rounded-full lg:ml-20 -ml-10"
						style={{ width: "auto", height: "auto" }}
					/>
					<h1 className="font-fleur-de-leah text-5xl">Vortex</h1>
				</Link>
			</div>
			<div className="bg-black flex-1 pt-6 px-20 lg:px-0 flex justify-center items-center flex-col">
				{children}
			</div>
			<div className="p-10 bg-black -z-1">
				<h1 className="text-center font-serif">
					&copy; Vortex {new Date().getFullYear()}
				</h1>
			</div>
		</div>
	);
}

export default OnBoardingLayout;
