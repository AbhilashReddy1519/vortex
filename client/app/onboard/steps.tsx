import { OnboardingFormData } from "@/validations/onboard.validation";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

type props = {
	goToNextStep: () => void;
	updateFormData: (data: Partial<OnboardingFormData>) => void;
};

export const GetFullName = ({ goToNextStep, updateFormData }: props) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		trigger,
	} = useFormContext<OnboardingFormData>();

	const onNext = async (data: Partial<OnboardingFormData>) => {
		const valid = await trigger();
		if (!valid) return;
		console.log(data);
		updateFormData(data);
		goToNextStep();
	};
	return (
		<div className="h-full flex flex-col items-center">
			<h1 className="text-3xl pb-8">
				Code with purpose. Grow with confidence.
			</h1>
			<form
				onSubmit={handleSubmit(onNext)}
				className="flex flex-col text-lg bg-white/10 w-md gap-3 p-6 rounded">
				<div className="flex flex-col gap-2">
					<label htmlFor="firstName">First name </label>
					<input
						type="text"
						{...register("firstName")}
						id="firstName"
						className="border rounded px-2 py-1 outline-none text-xl border-amber-500 focus:border-blue-500"
					/>
					{errors && errors.firstName && (
						<p className="text-red-500 text-sm">
							* {errors.firstName.message}
						</p>
					)}
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="lastName">Last name</label>
					<input
						type="text"
						{...register("lastName")}
						id="lastName"
						className="border rounded px-2 py-1 outline-none text-xl border-amber-500 focus:border-blue-500"
					/>
					{errors && errors["lastName"] && (
						<p className="text-red-500 text-sm">
							* {errors["lastName"].message}
						</p>
					)}
				</div>

				<button
					className={`border w-full mt-8 py-2 rounded-full bg-linear-to-r from-[#c77044] to-[#a04b21] hover:from-[#531e03] hover:to-[#b84308] cursor-pointer`}
					type="submit">
					Continue
				</button>
			</form>
		</div>
	);
};

export const GetLocation = ({ goToNextStep, updateFormData }: props) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		trigger,
		watch,
	} = useFormContext<OnboardingFormData>();

	const firstName = useMemo(() => watch("firstName"), [watch]);

	const onNext = async (data: Partial<OnboardingFormData>) => {
		const valid = await trigger();
		if (!valid) return;
		console.log(data);
		updateFormData(data);
		goToNextStep();
	};

	return (
		<>
			<div className="h-full flex flex-col gap-6 items-center">
				<div className="text-center space-y-4">
					<h1 className="text-3xl">
						Welcome {firstName}! Where do you build from?
					</h1>
					<p className="text-white/50">
						Connect with developers, projects, and tech communities
						near you
					</p>
				</div>
				<form
					onSubmit={handleSubmit(onNext)}
					className="flex flex-col text-lg bg-white/10 w-md gap-3 p-6 rounded">
					<div className="flex flex-col gap-2">
						<label htmlFor="country">Country/Region *</label>
						<input
							type="text"
							{...register("country")}
							id="country"
							title="Please fill out this field"
							className="border rounded px-2 py-1 outline-none text-xl border-amber-500 focus:border-blue-500"
						/>
						{errors && errors.country && (
							<p className="text-red-500 text-sm">
								* {errors.country.message}
							</p>
						)}
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="city">District/City *</label>
						<input
							type="text"
							{...register("city")}
							id="city"
							title="Please fill out this field"
							className="border rounded px-2 py-1 outline-none text-xl border-amber-500 focus:border-blue-500"
						/>
						{errors && errors["city"] && (
							<p className="text-red-500 text-sm">
								* {errors["city"].message}
							</p>
						)}
					</div>

					<button
						className={`border w-full mt-8 py-2 rounded-full bg-linear-to-r from-[#c77044] to-[#a04b21] hover:from-[#531e03] hover:to-[#b84308] cursor-pointer`}
						type="submit">
						Next
					</button>
				</form>
			</div>
		</>
	);
};

type ImageState = {
	preview: string;
	file?: File;
};

export const GetPictures = ({ goToNextStep, updateFormData }: props) => {
	const defaultProfileUrl =
		"https://media.licdn.com/dms/image/v2/D4E12AQEud3Ll5MI7cQ/article-inline_image-shrink_1000_1488/article-inline_image-shrink_1000_1488/0/1660833954461?e=2147483647&v=beta&t=1e_UbOwhBjrbh6dYElFz-hUdQy2gltC1XWh2NxkigvI";
	const defaultCoverUrl =
		"https://i0.wp.com/linkedinheaders.com/wp-content/uploads/2018/02/mountain-clouds-header.jpg?w=1584&ssl=1";

	const [showProfile, setShowProfile] = useState(false);
	const [showCover, setShowCover] = useState(false);
	const [profilePicture, setProfilePicture] = useState<ImageState>({
		preview: defaultProfileUrl,
		file: undefined,
	});
	const [coverPicture, setCoverPicture] = useState<ImageState>({
		preview: defaultCoverUrl,
		file: undefined,
	});

	// useEffect(() => {
	// 	const handleClick = (e: MouseEvent) => {
	// 		if (
	// 			profileModal.current &&
	// 			!profileModal.current.contains(e.target as Node)
	// 		) {
	// 			setShowProfile(false);
	// 		}
	// 	};

	// 	document.addEventListener("mousedown", handleClick);

	// 	return () => {
	// 		document.removeEventListener("mousedown", handleClick);
	// 	};
	// }, [setShowCover, setShowProfile]);

	const {
		setValue,
		register,
		trigger,
		formState: { errors },
	} = useFormContext<OnboardingFormData>();
	const coverRegister = register("cover_picture");

	const onNext = async () => {
		setValue("profile_picture", profilePicture.file, {
			shouldValidate: true,
		});
		setValue("cover_picture", coverPicture.file, {
			shouldValidate: true,
		});

		const isValid = await trigger();
		console.log(errors)
		if(!isValid) return;

		updateFormData({
			profile_picture: profilePicture.file,
			cover_picture: coverPicture.file,
		});
		goToNextStep();
	};
	return (
		<>
			{showProfile && (
				<>
					<div
						className="h-screen w-full backdrop-blur-[2px] bg-white/10 overflow-hidden fixed inset-0 z-10 flex justify-center items-center"
						onClick={() => setShowProfile(false)}>
						<div
							className="relative w-md space-y-6 bg-black p-10 rounded"
							onClick={(e) => e.stopPropagation()}>
							<div
								style={{
									backgroundImage:
										"radial-gradient(#666 1px, transparent 1px)",
									backgroundSize: "16px 16px",
								}}
								className="w-full bg-white/10 p-2 flex justify-center">
								<Image
									src={profilePicture.preview}
									height={200}
									width={100}
									alt="profile picture"
									className="h-40 w-40 rounded"
								/>
							</div>
							<div>
								<label htmlFor="picture" className="text-xl ">
									Upload Profile Picture
								</label>
								<input
									className="border w-full mt-4 rounded px-2"
									type="file"
									accept="image/*"
									onChange={(e) => {
										const file = e.target.files?.[0];
										if (!file) return;
										const preview =
											URL.createObjectURL(file);
										setProfilePicture({
											preview,
											file,
										});
									}}
									id="picture"
								/>
								{errors && errors["profile_picture"] && (
									<p>{errors["profile_picture"].message}</p>
								)}
							</div>
							<button
								className="w-full cursor-pointer bg-button-bg hover:bg-button-hover py-1 rounded-full text-xl"
								onClick={() => {
									setShowProfile(false);
								}}>
								Done
							</button>
						</div>
					</div>
				</>
			)}
			{showCover && (
				<>
					<div
						className="h-screen w-full backdrop-blur-[2px] bg-white/10 overflow-hidden fixed inset-0 z-10 flex justify-center items-center"
						onClick={() => setShowCover(false)}>
						<div
							className="relative w-md space-y-6 bg-black p-10 rounded"
							onClick={(e) => e.stopPropagation()}>
							<div
								style={{
									backgroundImage:
										"radial-gradient(#666 1px, transparent 1px)",
									backgroundSize: "16px 16px",
								}}
								className="w-full bg-white/10 p-2 flex justify-center">
								<Image
									src={coverPicture.preview}
									height={200}
									width={100}
									alt="profile picture"
									className="w-full h-40 object-contain rounded"
								/>
							</div>
							<div>
								<label htmlFor="picture" className="text-xl ">
									Upload Cover Picture
								</label>
								<input
									className="border w-full mt-4 rounded px-2"
									type="file"
									accept="image/*"
									onChange={async (e) => {
										coverRegister.onChange(e);
										const file = e.target.files?.[0];
										if (!file) return;
										const preview =
											URL.createObjectURL(file);
										setCoverPicture({
											preview,
											file,
										});
										await trigger("cover_picture");
									}}
									id="picture"
								/>
								{errors && errors["cover_picture"] && (
									<p className="text-red-500 text-sm">
										{errors["cover_picture"].message}
									</p>
								)}
							</div>
							<button
								className="w-full cursor-pointer bg-button-bg hover:bg-button-hover py-1 rounded-full text-xl"
								onClick={() => {
									setShowCover(false);
								}}>
								Done
							</button>
						</div>
					</div>
				</>
			)}
			<div className="h-full flex flex-col gap-6 items-center mb-10">
				<div className="text-center">
					<h1>Set profile picture and cover picture</h1>
					<p>Good to connect with developers</p>
				</div>
				<div className="relative bg-white/15 h-100 flex flex-col p-10 rounded justify-between">
					<div className="relative">
						<Image
							src={coverPicture.preview}
							onClick={() => setShowCover(true)}
							width={1000}
							height={400}
							alt={"cover picture"}
							className="rounded w-200 h-50 cursor-pointer"
						/>
						<Image
							className="rounded-full absolute h-8 w-8 sm:w-20 sm:h-20 md:w-32 md:h-32 lg:w-38 lg:h-38 top-1/2 left-10 cursor-pointer"
							onClick={() => setShowProfile(true)}
							src={profilePicture.preview}
							width={200}
							height={200}
							alt={"Profile picture"}
						/>
					</div>
					<button
						className="mt-10 py-2 text-2xl cursor-pointer rounded-full  bg-amber-700"
						onClick={onNext}>
						Next
					</button>
				</div>
			</div>
		</>
	);
};
