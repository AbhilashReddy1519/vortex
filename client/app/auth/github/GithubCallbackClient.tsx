"use client";

import { LoaderPinwheel } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { authorization } from "@/api/github.api";

export default function GithubCallbackClient() {
	const params = useSearchParams();
	const code = params.get("code");
	const error = params.get("error");
	const router = useRouter();

	useEffect(() => {
		if (!code && !error) return;
		if(error) {
			console.log(error, params.get('error_description'));
			router.push("/login");
			return;
		}
		// console.log("GitHub auth code:", code);
		async function sendCode() {
			try {
				const res = await authorization(code!); // ! non null assertion
				const ok = res.data;
				if (ok.success) {
					if(ok?.on_boarding) {
						router.push('/onboard');
						return;
					}
					router.push("/feed");
				} 
			} catch (error) {
				console.error("GitHub authentication failed:", error);
				router.push("/login");
			}
		}
		sendCode();
	}, [code, router, error, params]);

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

/* 
1. Pass error info via query params
When redirecting, include a message:
router.push(`/error?reason=${encodeURIComponent(error.message)}`);


"use client";
import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const params = useSearchParams();
  const reason = params.get("reason");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-3xl font-bold">Authentication Failed</h1>
      <p className="mt-4">{reason || "Something went wrong. Please try again."}</p>
      <button
        onClick={() => window.location.href="/"}
        className="mt-6 px-4 py-2 bg-red-600 rounded"
      >
        Go Home
      </button>
    </div>
  );
}
**/
