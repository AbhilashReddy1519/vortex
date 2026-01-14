"use client";

import { useOnboarding } from "@/hooks/useOnboarding";
import { useEffect, useRef } from "react";
import { GetFullName, GetLocation, GetPictures } from "./steps";
import { FormProvider, useForm } from "react-hook-form";
import {
	OnboardingFormData,
	StepFormData,
} from "@/validations/onboard.validation";
import { zodResolver } from "@hookform/resolvers/zod";

function OnBoarding() {
	const modal = useRef<HTMLDivElement | null>(null);
	const {
		showModal,
		currentStep,
		formData,
		updateFormData,
		closeModal,
		goToNextStep,
		getCurrentSchema,
	} = useOnboarding();

	const methods = useForm<StepFormData>({
		resolver: zodResolver(getCurrentSchema()),
		mode: "onChange",
		defaultValues: formData as OnboardingFormData,
	});

	const { reset } = methods;
	useEffect(() => {
		reset(formData);
		console.log(formData);
	}, [currentStep, formData, reset]);

	const currentForm = [
		<GetFullName
			key="name"
			goToNextStep={goToNextStep}
			updateFormData={updateFormData}
		/>,
		<GetLocation
			key="location"
			goToNextStep={goToNextStep}
			updateFormData={updateFormData}
		/>,
		<GetPictures key={"picture"}/>
	];

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (modal.current && !modal.current.contains(e.target as Node)) {
				closeModal();
			}
		};

		document.addEventListener("mousedown", handleClick);

		return () => {
			document.removeEventListener("mousedown", handleClick);
		};
	}, [closeModal]);

	return (
		<>
			{/** Modal */}
			{showModal && (
				<>
					<div className="h-screen w-full backdrop-blur-[2px] bg-white/10 overflow-hidden absolute inset-0 z-10 flex justify-center items-center">
						<div
							className="relative w-md  space-y-6 bg-white p-10 rounded"
							ref={modal}>
							<div className="space-y-6  text-center text-black">
								<h1 className="text-2xl">
									Let&apos;s get you set up
								</h1>
								<h1 className="text-md text-gray-700">
									<span className="text-xl">“</span> This will
									only take about 2 minutes. It helps us set
									things up just right for you.
									<span className="text-xl">”</span>
								</h1>
							</div>
							<button
								className="bg-blue-500 border border-black cursor-pointer rounded-sm w-full py-1 text-xl"
								onClick={() => {
									closeModal();
								}}>
								Let&apos;s go
							</button>
						</div>
					</div>
				</>
			)}
			<FormProvider {...methods}>
				<div className="h-full flex justify-center flex-col items-center w-full">
					{currentForm[currentStep]}
				</div>
			</FormProvider>
		</>
	);
}

export default OnBoarding;
