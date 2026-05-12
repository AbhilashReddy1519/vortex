"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/api/config/api";
import type { AxiosError } from "axios";

// Development mode
const SKIP_SERVER_AUTH = false;

export interface User {
	id: string;
	email: string;
	username?: string;
	fullName?: string;
	onBoarding: boolean;
}

interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	authInitialized: boolean;
	error: string | null;
	isAuthenticated: boolean;
	updateUser: (updates: Partial<User>) => void;
	logout: () => void;
	refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);

	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const [isLoading, setIsLoading] = useState(true);

	const [authInitialized, setAuthInitialized] = useState(false);

	const [error, setError] = useState<string | null>(null);

	// =========================
	// FETCH USER ON APP START
	// =========================
	useEffect(() => {
		if (SKIP_SERVER_AUTH) {
			console.log("⚠️ Server auth skipped - offline dev mode");

			setIsLoading(false);
			setAuthInitialized(true);

			return;
		}

		const fetchUser = async () => {
			try {
				setIsLoading(true);

				console.log("🔐 AUTH: Fetching user from /auth/me...");

				const response = await api.get("/auth/me");

				console.log("🔐 AUTH: Response", response.data);

				if (response.data.success) {
					const userData = response.data.data;

					console.log("✅ AUTH: User authenticated", userData);

					setUser(userData.data);
					setIsAuthenticated(true);
					setError(null);
				} else {
					console.warn("⚠️ AUTH: API returned success:false");

					setUser(null);
					setIsAuthenticated(false);
				}
			} catch (err) {
				const axiosError = err as AxiosError;

				const errorMsg = err instanceof Error ? err.message : String(err);

				console.error("❌ AUTH: Failed to fetch user", {
					status: axiosError?.response?.status || "unknown",
					error: errorMsg,
				});

				setUser(null);
				setIsAuthenticated(false);
				setError(errorMsg);
			} finally {
				setIsLoading(false);
				setAuthInitialized(true);
			}
		};

		fetchUser();
	}, []);

	// =========================
	// UPDATE USER
	// =========================
	const updateUser = (updates: Partial<User>) => {
		setUser((prev) => {
			if (!prev) {
				return updates as User;
			}

			return {
				...prev,
				...updates,
			};
		});
	};

	// =========================
	// LOGOUT
	// =========================
	const logout = () => {
		setUser(null);
		setIsAuthenticated(false);
	};

	// =========================
	// REFETCH USER
	// =========================
	const refetchUser = async () => {
		try {
			console.log("🔄 AUTH: Refetching user");

			const response = await api.get("/auth/me");

			console.log("🔄 AUTH: Response", response.data);

			if (response.data.success) {
				const userData = response.data.data;

				setUser(userData.data);
				setIsAuthenticated(true);
			} else {
				setUser(null);
				setIsAuthenticated(false);
			}
		} catch (err) {
			console.error("❌ AUTH: Refetch failed", err);

			setUser(null);
			setIsAuthenticated(false);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isLoading,
				authInitialized,
				error,
				isAuthenticated,
				updateUser,
				logout,
				refetchUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within AuthProvider");
	}

	return context;
}
