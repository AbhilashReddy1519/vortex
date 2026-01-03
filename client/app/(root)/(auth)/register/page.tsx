"use client";

import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Register: React.FC = () => {
	const [isEmail, setIsEmail] = useState(true);
	return (
		<>
			<h1 className="text-4xl mb-8 font-serif">
				Become a professional developer
			</h1>
			<div className="max-w-md p-10 rounded-lg border-dashed border bg-transparent backdrop-blur-md">
				<form className="flex flex-col space-y-6  ">
					<div className="flex flex-col w-full gap-2">
						{isEmail ? (
							<>
								<label
									htmlFor="email"
									className="font-quintessential text-xl">
									Email
								</label>
								<input
									type="email"
									name="email"
									id="email"
									className="border text-xl rounded-lg hover:outline-2 focus:outline-none font-serif py-2 px-2"
								/>
							</>
						) : (
							<>
								<label
									htmlFor="email"
									className="font-quintessential text-xl">
									Phone Number
								</label>
								<div className="relative">
									<input
										type="tel"
										name="phone"
										id="phone"
										className="border text-xl rounded-lg hover:outline-2 focus:outline-none font-serif py-2 px-2 w-full pl-10"
									/>
									<p
										title="India"
										className="absolute top-2.25 text-xl left-2.5 font-serif">
										IN
									</p>
								</div>
							</>
						)}
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
					<div className="flex gap-2 items-center text-xl">
						<input
							type="checkbox"
							name="remember"
							id="remember"
							className="accent-green-400 transition-all duration-300 ease-in-out w-4 h-4"
						/>
						<label
							htmlFor="remember"
							className="mb-px font-quintessential">
							Remember me
						</label>
					</div>
					<p className="font-serif text-sm text-center">
						By clicking Agree & Join or Continue, you agree to the
						Vortex User Agreement, Privacy Policy, and Cookie
						Policy.
					</p>
					<button className="text-xl bg-neutral-600 cursor-pointer hover:bg-neutral-700 py-2 font-quintessential rounded-lg">
						Agree & Join
					</button>
				</form>
				<div className="flex items-center my-8">
					<span className="grow border-b border-white"></span>
					<span className="px-2">or</span>
					<span className="grow border-b border-white"></span>
				</div>

				<div className="space-y-4 flex flex-col">
					<button className="text-xl bg-[#050e1c] hover:bg-[#020f27] cursor-pointer py-2 rounded-lg font-quintessential flex justify-center items-center gap-3">
						<Image
							src={"/images/github.png"}
							alt="github logo"
							className="h-8 w-8 dark:invert"
							width={32}
							height={32}
						/>
						Register via GitHub
					</button>
					<button
						className="text-xl mt-2 bg-gray-500 hover:bg-gray-600 cursor-pointer py-2 rounded-lg font-quintessential flex justify-center items-center"
						onClick={() => {
							setIsEmail((prev) => !prev);
						}}>
						{!isEmail ? (
							<>
								<span className="flex gap-2">
									<Mail />
									Register via Email
								</span>
							</>
						) : (
							<>
								<span className="flex gap-2">
									<Phone />
									Register via Phone Number
								</span>
							</>
						)}
					</button>
				</div>
				<div className="mt-10 text-center">
					<p className="font-serif">
						Already on Vortex?{" "}
						<span className="text-blue-500 font-quintessential hover:underline">
							<Link href={"/login"}>Login</Link>
						</span>
					</p>
				</div>
			</div>
		</>
	);
};

export default Register;
