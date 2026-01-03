import { Suspense } from "react";
import GithubCallbackClient from "./GithubCallbackClient";

export default function Page() {
	return (
		<Suspense fallback={<GithubLoading />}>
			<GithubCallbackClient />
		</Suspense>
	);
}

function GithubLoading() {
	return (
		<div className="w-full h-screen flex justify-center items-center bg-black">
			<span className="text-white">Signing you in…</span>
		</div>
	);
}
