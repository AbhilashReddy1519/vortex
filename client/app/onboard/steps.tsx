import { OnboardingFormData } from "@/validations/onboard.validation";
import { useMemo } from "react";
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


export const GetPictures = () => {
  return(
    <>
      <div className="h-full flex flex-col gap-6 items-center">
        <div>
          <h1>Set profile picture and cover picture</h1>
        </div>
      </div>
    </>
  )
}