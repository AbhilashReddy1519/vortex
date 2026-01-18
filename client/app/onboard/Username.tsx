import api from "@/api/config/api";
import { debounceAsync } from "@/utils/debounce";
import { OnboardingFormData } from "@/validations/onboard.validation";
import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";

type props = {
	goToNextStep: () => void;
	updateFormData: (data: Partial<OnboardingFormData>) => void;
};

const Username = ({ goToNextStep, updateFormData }: props) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		trigger,
		watch,
		setError,
		clearErrors,
	} = useFormContext<OnboardingFormData>();

	const onNext = async (data: Partial<OnboardingFormData>) => {
		const valid = await trigger();
		if (!valid) return;
		console.log(data);
		updateFormData(data);
		goToNextStep();
	};
	const username = watch("username");

	const debouncedCheck = useMemo(() => {
		return debounceAsync(async (value: string) => {
			try {
				const res = await api.get("/auth/username/check", {
					params: { username: value },
				});
				const { data:result } = res;

				return result.data.available;
			} catch {
				return null; // network error
			}
		}, 500);
	}, []);

	useEffect(() => {
		if (!username || username.length < 4) {
			clearErrors("username");
			return;
		}

		let cancelled = false;

		debouncedCheck(username).then((available) => {
			if (cancelled) return;

			if (available === false) {
				setError("username", {
					type: "manual",
					message: "Username is already taken",
				});
			} else if (available === true) {
				clearErrors("username");
			} else {
				setError("username", {
					type: "manual",
					message: "Unable to verify username",
				});
			}
		});

		return () => {
			cancelled = true;
		};
	}, [username, debouncedCheck, setError, clearErrors]);

	return (
		<>
			<div className="h-full flex flex-col items-center">
				<h1 className="text-3xl pb-8">Choose your developer handle</h1>
				<form
					onSubmit={handleSubmit(onNext)}
					className="flex flex-col text-lg bg-white/10 w-md gap-3 p-6 rounded">
					<div className="flex flex-col gap-2">
						<label htmlFor="firstName">Username </label>
						<input
							type="text"
							{...register("username")}
							id="firstName"
							className="border rounded px-2 py-1 outline-none text-xl border-amber-500 focus:border-blue-500"
						/>
						{errors && errors.username && (
							<p className="text-red-500 text-sm">
								* {errors.username.message}
							</p>
						)}
					</div>
					<button className="bg-button-bg text-xl rounded-full py-2 mt-4 cursor-pointer hover:bg-button-hover">
						Let&lsquo;s Explore
					</button>
				</form>
			</div>
		</>
	);
};

export default Username;
