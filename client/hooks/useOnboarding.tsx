import { fullNameSchema, locationSchema, pictureSchema, usernameSchema } from "@/validations/onboard.validation";
import { useState } from "react";
import type { StepFormData } from "@/validations/onboard.validation";


const steps = ["name", "location", "pictures", "username"];

const stepsSchema = [
	fullNameSchema, locationSchema, pictureSchema, usernameSchema
];

export const useOnboarding = () => {
	const [showModal, setShowModal] = useState(true);
	const [currentStep, setCurrentStep] = useState(0);
	const [formData, setFormData] =
		useState<Partial<StepFormData>>({});

	const isFirstStep = currentStep === 0;
	const isLastStep = currentStep === steps.length - 1;

	function goToNextStep() {
		if (!isLastStep) setCurrentStep((prev) => prev + 1);
	}

	function goToPreviousStep() {
		if (!isFirstStep) setCurrentStep((prev) => prev - 1);
	}

	function closeModal() {
		setShowModal(false);
	}

	const updateFormData = (newData: Partial<StepFormData>) => {
		setFormData((prev) => ({ ...prev, ...newData }));
	};

	const getCurrentSchema = () => stepsSchema[currentStep];

	return {
		formData,
		showModal,
		currentStep,
		isFirstStep,
		isLastStep,
		goToNextStep,
		goToPreviousStep,
		closeModal,
		updateFormData,
		getCurrentSchema
	};
};
