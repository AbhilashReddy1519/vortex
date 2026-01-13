import api from "./api";


let cachedCsrf: string | null = null;

function getCsrfToken(): string | null {
	if (cachedCsrf === null) {
		const token = document.cookie
			.split("; ")
			.find((row) => row.startsWith("csrfToken="))
			?.split("=")[1];

		cachedCsrf = token ?? null;
	}

	return cachedCsrf;
}

// When user logged out
export function clearCsrfToken() {
	cachedCsrf = null;
}



// Request interceptor
const unsafeMethods = ["post", "put", "patch", "delete"];

api.interceptors.request.use((config) => {
	if (unsafeMethods.includes(config.method?.toLowerCase() ?? '')) {
		const csrfToken = getCsrfToken();
		if (csrfToken) {
			config.headers["X-CSRF-TOKEN"] = csrfToken;
		}
	}
	return config;
});

