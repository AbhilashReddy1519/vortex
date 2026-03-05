"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/api/config/api";

// Development mode: set to true to skip server auth fetch
const SKIP_SERVER_AUTH = false; // Change to false when server is running

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
	error: string | null;
	isAuthenticated: boolean;
	updateUser: (updates: Partial<User>) => void;
	logout: () => void;
	refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Fetch user from server ONCE on mount
	useEffect(() => {
		if (SKIP_SERVER_AUTH) {
			console.log("⚠️ Server auth skipped - offline dev mode");
			setIsLoading(false);
			return;
		}

		const fetchUser = async () => {
			try {
				setIsLoading(true);
				const response = await api.get("/auth/me");
				if (response.data.success) {
					setUser(response.data.data);
					setError(null);
				}
			} catch (err) {
				// Server offline or connection error
				console.warn(
					"⚠️ Server unavailable for auth check - continuing in offline mode",
				);
				setUser(null);
				setError(
					err instanceof Error
						? err.message
						: "Server connection failed",
				);
			} finally {
				setIsLoading(false);
			}
		};

		fetchUser();
	}, []); // Empty dependency = runs ONCE on mount

	const updateUser = (updates: Partial<User>) => {
		setUser((prev) => (prev ? { ...prev, ...updates } : null));
	};

	const logout = () => {
		setUser(null);
	};

	const refetchUser = async () => {
		try {
			console.log("AUTH: fetching user");
			const response = await api.get("/auth/me");
			
			console.log("AUTH: response", response.data);

			if (response.data.success) {
				console.log("AUTH: setting user", response.data.data);
				setUser(response.data.data);
			}
		} catch (err) {
			setUser(null);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isLoading,
				error,
				isAuthenticated: !!user,
				updateUser,
				logout,
				refetchUser,
			}}>
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
