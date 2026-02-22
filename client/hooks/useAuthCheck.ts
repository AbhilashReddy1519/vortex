import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "./useAuth";

// Routes that don't require onboarding check
const PUBLIC_ROUTES = ["/login", "/register", "/auth/github"];
const ONBOARDING_ROUTE = "/onboard";

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
		// Skip auth check on public/auth routes
		if (PUBLIC_ROUTES.includes(pathname) || pathname === ONBOARDING_ROUTE) {
			return;
		}

		// Wait for auth to load
		if (isLoading) {
			return;
		}

		// User is not authenticated
		if (!isAuthenticated || !user) {
			return;
		}

		// Check onboarding status from database field
		if (!user.onBoarding) {
			router.push(ONBOARDING_ROUTE);
		}
	}, [pathname, router, user, isLoading, isAuthenticated]);
}
