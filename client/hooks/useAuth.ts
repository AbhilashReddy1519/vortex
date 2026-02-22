"use client";

import { useCallback, useEffect, useState } from "react";
import api from "@/api/config/api";

export interface User {
	id: string;
	email: string;
	username?: string;
	fullName?: string;
	onBoarding: boolean;
}

export function useAuth() {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Fetch current user from server
	const fetchUser = useCallback(async () => {
		try {
			setIsLoading(true);
			const response = await api.get("/auth/me");
			if (response.data.success) {
				setUser(response.data.data);
				setError(null);
			}
		} catch (err) {
			setUser(null);
			setError(
				err instanceof Error ? err.message : "Failed to fetch user",
			);
		} finally {
			setIsLoading(false);
		}
	}, []);

	// Check auth status on mount
	useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	const updateUser = (updates: Partial<User>) => {
		setUser((prev) => (prev ? { ...prev, ...updates } : null));
	};

	const logout = () => {
		setUser(null);
	};

	return {
		user,
		isLoading,
		error,
		fetchUser,
		updateUser,
		logout,
		isAuthenticated: !!user,
	};
}
