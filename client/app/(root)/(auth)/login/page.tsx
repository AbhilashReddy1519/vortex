"use client";

import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const Login: FC = () => {
	return (
		<>
			<div className="max-w-md p-10 rounded-lg border-dashed border bg-transparent backdrop-blur-md">
				<h1 className="text-center mb-8 text-3xl font-serif">Login</h1>
				<div className="space-y-4 flex flex-col">
					<button className="text-xl bg-[#050e1c] hover:bg-[#020f27] cursor-pointer py-2 rounded-lg font-quintessential flex justify-center items-center gap-3">
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
				<form className="flex flex-col space-y-6  ">
					<div className="flex flex-col w-full gap-2">
						<label
							htmlFor="identifier"
							className="font-quintessential text-xl">
							Email or Phone
						</label>
						<input
							type="text"
							name="identifier"
							id="identifier"
							className="border text-xl rounded-lg hover:outline-2 focus:outline-none font-serif py-2 px-2"
						/>
					</div>
					<div className="flex flex-col w-full gap-2">
						<label
							htmlFor="password"
							className="font-quintessential text-xl">
							Password
						</label>
						<input
							type="password"
							name="password"
							id="password"
							className="border text-xl rounded-lg hover:outline-2 focus:outline-none font-serif py-2 px-2"
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
