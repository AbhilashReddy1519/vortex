"use client";

import PasswordInput from "@/components/ui/passwordInput";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

const Login: FC = () => {

	const router = useRouter();
	function loginWithGitHub() {
		router.push(
			`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=user:email`,
		);
	}

	const [formData, setFormData] = useState<{
		identifier: string;
		password: string;
	}>({
		identifier: "",
		password: "",
	});

	const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(formData);
	}

	return (
		<>
			<div className="max-w-md p-10 rounded-lg border-dashed border bg-transparent backdrop-blur-md">
				<h1 className="text-center mb-8 text-4xl font-serif text-transparent bg-clip-text bg-linear-to-br from-white via-red-500 to-blue-600">
					Welcome back!
				</h1>
				<div className="space-y-4 flex flex-col">
					<button className="text-xl bg-[#050e1c] hover:bg-[#020f27] cursor-pointer py-2 rounded-lg font-quintessential flex justify-center items-center gap-3"
					onClick={loginWithGitHub}>
						<Image
							src={"/images/github.png"}
							alt="github logo"
							className="h-8 w-8 dark:invert"
							width={32}
							height={32}
						/>
						Continue with GitHub
					</button>
					<p className="mt-4 font-serif text-center text-md">
						By clicking Continue, you agree to Vortex&apos;s User
						Agreement, Privacy Policy, and Cookie Policy.
					</p>
				</div>
				<div className="flex items-center my-8">
					<span className="grow border-b border-white"></span>
					<span className="px-2">or</span>
					<span className="grow border-b border-white"></span>
				</div>
				<form className="flex flex-col space-y-6  " onSubmit={handleSubmit}>
					<div className="flex flex-col w-full gap-2">
						<label
							htmlFor="identifier"
							className="font-quintessential text-xl">
							Username or Email
						</label>
						<input
							type="text"
							name="identifier"
							id="identifier"
							className="border text-xl rounded-lg hover:outline-2 focus:outline-none font-serif py-2 px-2"
							placeholder="Enter username or email"
							onChange={handleData}
						/>
					</div>
					<div className="flex flex-col w-full gap-2">
						<PasswordInput
							label="Password"
							id="password"
							placeholder="Enter password"
							name="password"
							onChange={handleData}
						/>
					</div>
					<Link href={"/login/#"}>
						<p className="font-serif text-md text-right text-blue-500 hover:underline -mt-2">
							Forget Password?
						</p>
					</Link>
					<div className="flex gap-2 items-center text-md">
						<input
							type="checkbox"
							name="logged"
							id="logged"
							className="accent-green-400 transition-all duration-300 ease-in-out w-4 h-4"
						/>
						<label htmlFor="logged" className="mb-px">
							Keep me logged in
						</label>
					</div>
					<button className="text-xl bg-neutral-600 cursor-pointer hover:bg-neutral-700 py-2 font-quintessential rounded-lg">
						Login
					</button>
				</form>
			</div>
			<div className="text-center mt-10">
				<p className="font-serif">
					New to Vortex?{" "}
					<Link href={"/register"}>
						<span className="font-quintessential text-blue-400 hover:underline">
							Register Now
						</span>
					</Link>
				</p>
			</div>
		</>
	);
};

export default Login;
