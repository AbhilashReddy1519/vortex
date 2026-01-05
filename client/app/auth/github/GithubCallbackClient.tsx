"use client";

import { LoaderPinwheel } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { api } from "../../../api/api";

export default function GithubCallbackClient() {
	const params = useSearchParams();
	const code = params.get("code");

	useEffect(() => {
		if (!code) return;

		console.log("GitHub auth code:", code);

		// TODO:
		// Send `code` to backend to exchange for access token
		async function sendCode() {
			try {
				const res = await api.get(
					`/github/getAccessToken?code=${code}`,
				);
				console.log(res);
			} catch (error) {
				console.error("GitHub authentication failed:", error);
			}
		}
		sendCode();
	}, [code]);

	return (
		<div className="w-full h-screen flex justify-center items-center bg-black relative overflow-hidden">
			<div className="w-full bg-black flex pt-4 items-center absolute top-0 left-0">
				<Image
					src="/images/logo.png"
					width={120}
					height={20}
					alt="logo"
					className="-rotate-55 rounded-full ml-20"
				/>
				<h1 className="font-fleur-de-leah text-5xl text-white">
					Vortex
				</h1>
			</div>

			<LoaderPinwheel className="h-40 w-40 text-white animate-spin animation-duration-3000" />
		</div>
	);
}
