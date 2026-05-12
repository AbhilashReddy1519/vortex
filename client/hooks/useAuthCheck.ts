"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

const PUBLIC_ROUTES = ["/", "/login", "/register"];

const PUBLIC_ROUTE_PREFIXES = ["/auth/github"];

const ONBOARDING_ROUTE = "/onboard";

export function useAuthCheck() {
	const router = useRouter();

	const pathname = usePathname();

	const { user, isLoading, isAuthenticated, authInitialized } = useAuth();

	useEffect(() => {
		if (!pathname) return;

		// Prevent hydration/auth race conditions
		if (!authInitialized) {
			console.log("⏳ Auth not initialized yet");
			return;
		}

		const normalizedPath =
			pathname !== "/" && pathname.endsWith("/")
				? pathname.slice(0, -1)
				: pathname;

		const isPublicRoute =
			PUBLIC_ROUTES.includes(normalizedPath) ||
			PUBLIC_ROUTE_PREFIXES.some((prefix) => normalizedPath.startsWith(prefix));

		if (isPublicRoute) {
			console.log("🔓 Public route:", normalizedPath);
			return;
		}

		console.log("🔒 Protected route:", normalizedPath, "Loading:", isLoading);

		if (isLoading) {
			console.log("⏳ Still loading auth...");
			return;
		}

		// NOT AUTHENTICATED
		if (!isAuthenticated || !user) {
			console.log("❌ Not authenticated → /login");

			router.replace("/login");

			return;
		}

		// NOT ONBOARDED
		if (!user.onBoarding && normalizedPath !== ONBOARDING_ROUTE) {
			console.log("🎯 Redirecting to onboarding");
			console.log(user, "OnBoarding: ", user.onBoarding);
			router.replace(ONBOARDING_ROUTE);

			return;
		}

		// ALREADY ONBOARDED
		if (user.onBoarding && normalizedPath === ONBOARDING_ROUTE) {
			console.log("✅ Redirecting to feed");

			router.replace("/feed");

			return;
		}
	}, [pathname, router, user, isLoading, isAuthenticated, authInitialized]);
}
