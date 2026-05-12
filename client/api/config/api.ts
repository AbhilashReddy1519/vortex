import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
})

// CSRF token management
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
function clearCsrfToken() {
	cachedCsrf = null;
}

// Request interceptor for CSRF
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

type RefreshSubscriber = () => void;

let isRefreshing = false;
let refreshSubscribers: RefreshSubscriber[] = [];

// Helper: subscribe requests to wait for new token
function subscribeTokenRefresh(cb: RefreshSubscriber) {
	refreshSubscribers.push(cb);
}

// Helper: notify all subscribers once new token is ready
function onRefreshed() {
	refreshSubscribers.forEach((cb) => cb());
	refreshSubscribers = [];
}

function onRefreshFailed() {
	refreshSubscribers = [];
}

// Response interceptor
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		console.log(
			"❌ Interceptor caught error:",
			error.response?.status,
			error.response?.data,
		);

		if (error.response?.status === 401 && !originalRequest._retry) {
			console.log("🔄 Attempting to refresh token...");
			originalRequest._retry = true;

			if (!isRefreshing) {
				isRefreshing = true;
				try {
					console.log("📡 Calling /auth/refresh...");
					await api.post("/auth/refresh");
					console.log("✅ Token refreshed successfully");

					// Clear cached CSRF token to fetch the new one
					clearCsrfToken();

					await new Promise((resolve) => setTimeout(resolve, 50));

					onRefreshed();

					isRefreshing = false;
				} catch (err: any) {
					console.error(
						"❌ Token refresh failed:",
						err.response?.status,
						err.response?.data,
					);
					isRefreshing = false;
					onRefreshFailed();
					if (
						err.response?.status === 401 ||
						err.response?.status === 403
					) {
						clearCsrfToken();
						await api.post("/auth/logout");
						window.location.href = "/login";
					}
					return Promise.reject(err);
				}
			}

			// Return a promise that resolves once refresh is done
			return new Promise((resolve) => {
				subscribeTokenRefresh(() => {
					resolve(
						api({
							...originalRequest,
							withCredentials: true,
						}),
					);
				});
			});
		}

		return Promise.reject(error);
	},
);

export async function getHealth() {
  return await api.get('/health');
}

export default api;