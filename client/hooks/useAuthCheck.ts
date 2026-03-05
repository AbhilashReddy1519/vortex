import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// Routes that don't require authentication (PUBLIC)
const PUBLIC_ROUTES = ["/", "/login/", "/register/", "/auth/github/", "/feed/"];

// Routes that require authentication (PRIVATE)
const PRIVATE_ROUTES = ["/onboard/", "/contact/"];
// Add Routes to private "/feed" -> working no need after done add ok
const ONBOARDING_ROUTE = "/onboard/";

/**
 * Hook to check onboarding status and redirect accordingly
 * Call this in your root layout or main app provider
 * Uses the database onBoarding field instead of localStorage
 */
export function useAuthCheck() {
	const router = useRouter();
	const pathname = usePathname();
	const { user, isLoading, isAuthenticated } = useAuth();

	useEffect(() => {
		// 1. Check if current route is PUBLIC (login, register, etc)
		const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
		// Skip auth checks if on public route
		console.log(pathname);
		if (isPublicRoute) {
			console.log("Public");
			return;
		}

		// 2. Wait for user data to load from Context
		if (isLoading) {
			return; // Don't redirect while loading
		}

		// 3. If not authenticated on any non-public route, redirect to login
		if (!isAuthenticated || !user) {
			console.log("Authenticated");
			router.push("/login");
			return;
		}

		// 4. User IS authenticated, now check onboarding status
		const isPrivateRoute = PRIVATE_ROUTES.includes(pathname);

		if (isPrivateRoute) {
			// If not onboarded, redirect to onboard
			console.log("Private");
			if (!user.onBoarding && pathname !== ONBOARDING_ROUTE) {
				router.push(ONBOARDING_ROUTE);
				return;
			}

			// If already onboarded but still on onboard page, redirect to feed
			if (user.onBoarding || pathname === ONBOARDING_ROUTE) {
				router.push("/feed");
				return;
			}
		}
	}, [pathname, router, user, isLoading, isAuthenticated]);
}
