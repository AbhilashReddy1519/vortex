import {
	fullNameSchema,
	locationSchema,
	pictureSchema,
	usernameSchema,
} from "@/validations/onboard.validation";
import { useState } from "react";
import type { StepFormData } from "@/validations/onboard.validation";
import api from "@/api/config/api";
import { AxiosError } from "axios";

const steps = ["name", "location", "pictures", "username"];

const stepsSchema = [
	fullNameSchema,
	locationSchema,
	pictureSchema,
	usernameSchema,
];

export const useOnboarding = () => {
	const [showModal, setShowModal] = useState(true);
	const [currentStep, setCurrentStep] = useState(0);
	const [formData, setFormData] = useState<Partial<StepFormData>>({});

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

	const getFormData = (formData: Partial<StepFormData>): FormData => {
		const fd = new FormData();
		// text fields
		fd.append("firstName", formData.firstName!);
		fd.append("lastName", formData.lastName!);
		fd.append("country", formData.country!);
		fd.append("city", formData.city!);
		fd.append("username", formData.username!);

		// files
		if (formData.profile_picture) {
			fd.append("profile_picture", formData.profile_picture);
		}

		if (formData.cover_picture) {
			fd.append("cover_picture", formData.cover_picture);
		}

		return fd;
	};

	const completeOnboarding = async () => {
		try {
			console.log(formData);
			const userData = getFormData(formData);
			const res = await api.put(
				"/user/complete-onboarding",
				userData,
				// {
				// 	payload: userData,
				// },
				// {
				// 	headers: {
				// 		"Content-Type": "multipart/form-data",
				// 	},
				// },
			);

			const { data } = res;
			return data.success;
		} catch (error) {
			console.error(error);
			if (error instanceof AxiosError) {
				return error?.response?.data.success;
			}
			return false;
		}
	};

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
		getCurrentSchema,
		completeOnboarding,
	};
};
