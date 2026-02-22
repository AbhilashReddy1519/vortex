"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { useAuthCheck } from "@/hooks/useAuthCheck";

function AuthCheckWrapper({ children }: { children: React.ReactNode }) {
	useAuthCheck();
	return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<AuthCheckWrapper>{children}</AuthCheckWrapper>
		</QueryClientProvider>
	);
}
