"use client";

import api from "@/api/config/api";
import PasswordInput from "@/components/ui/passwordInput";
import { ISignUpSchema, signUpSchema } from "@/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

const Register: React.FC = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	function registerWithGitHub() {
		router.push(
			`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=user:email`,
		);
	}

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<ISignUpSchema>({
		resolver: zodResolver(signUpSchema),
		mode: "onChange",
		defaultValues: {},
	});
	const password = useWatch({ control, name: "password" });

	const passwordConstraints = useMemo(() => {
		if (!password) return;
		return {
			capital: /[A-Z]/.test(password),
			small: /[a-z]/.test(password),
			number: /[0-9]/.test(password),
			special: /[^A-Za-z0-9]/.test(password),
		};
	}, [password]);

	const onSubmit = async (data: ISignUpSchema) => {
		try {
			setIsLoading(true);
			setError(null);

			const res = await api.post("/auth/register", data);
			console.log(res);
			if (res.data.success) {
				router.push("/onboard");
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				console.error(error);
				const { response } = error;
				setError(response?.data?.error?.message ?? "Request failed");
			}
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<>
			<h1 className="text-4xl mb-8 font-serif">
				Become a professional developer
			</h1>
			<div className="max-w-md p-10 rounded-lg border-dashed border bg-transparent backdrop-blur-md">
				<h1 className="text-4xl text-center pb-6 font-quintessential text-transparent bg-clip-text bg-linear-to-br font-bold from-white via-red-600 to-orange-700">
					Join Vortex
				</h1>
				<div className="space-y-4 flex flex-col">
					<button
						className="text-xl bg-[#050e1c] hover:bg-[#020f27] cursor-pointer py-2 rounded-lg font-quintessential flex justify-center items-center gap-3"
						onClick={registerWithGitHub}>
						<Image
							src={"/images/github.png"}
							alt="github logo"
							className="h-8 w-8 dark:invert"
							width={32}
							height={32}
						/>
						Register via GitHub
					</button>
				</div>
				<div className="flex items-center my-8">
					<span className="grow border-b border-white"></span>
					<span className="px-2">or</span>
					<span className="grow border-b border-white"></span>
				</div>
				<form
					className="flex flex-col space-y-6 "
					onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col w-full gap-2">
						<label
							htmlFor="email"
							className="font-quintessential text-xl">
							Email
						</label>
						<input
							type="text"
							id="email"
							className={`border text-xl rounded-lg hover:outline-2 focus:outline-none font-serif py-2 px-2 ${
								errors.email ? "border-red-500" : ""
							}`}
							{...register("email")}
							placeholder=""
						/>
						{errors.email && (
							<p className="text-red-500">
								{errors.email.message}
							</p>
						)}
					</div>
					<div className="flex flex-col w-full gap-2">
						<PasswordInput
							errors={errors}
							label="Password"
							id="password"
							{...register("password")}
						/>
					</div>
					<div className="p-2 text-sm border rounded-sm bg-gray-900">
						<h2 className="text-center">
							Password must contain atleast
						</h2>
						<ul className="pl-3 list-disc">
							<li
								className={
									passwordConstraints?.capital
										? "text-lime-400"
										: ""
								}>
								one uppercase (A...Z)
							</li>
							<li
								className={
									passwordConstraints?.small
										? "text-lime-400"
										: ""
								}>
								one lowercase (a...z)
							</li>
							<li
								className={
									passwordConstraints?.special
										? "text-lime-400"
										: ""
								}>
								a special character
							</li>
							<li
								className={
									passwordConstraints?.number
										? "text-lime-400"
										: ""
								}>
								a number (0–9)
							</li>
						</ul>
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
					<button
						className={`text-xl bg-neutral-600 hover:bg-neutral-700 py-2 font-quintessential rounded-lg ${
							isLoading ? "cursor-not-allowed" : "cursor-pointer"
						}`}
						type="submit"
						disabled={isLoading}>
						{isLoading ? "Registering..." : "Agree & Join"}
					</button>
					{error && (
						<p className="text-red-500 text-sm pb-6 text-center font-extrabold">
							{error}
						</p>
					)}
				</form>

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
