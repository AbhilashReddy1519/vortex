"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { useAuthCheck } from "@/hooks/useAuthCheck";

function AuthCheckWrapper({ children }: { children: React.ReactNode }) {
	useAuthCheck();
	return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<AuthCheckWrapper>{children}</AuthCheckWrapper>
			</AuthProvider>
		</QueryClientProvider>
	);
}
