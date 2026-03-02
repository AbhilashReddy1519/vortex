import axios from "axios";
import api from "./api";
import { clearCsrfToken } from "./requestInterceptors";

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
					await axios.post(
						"http://localhost:8000/auth/refresh",
						{},
						{ withCredentials: true },
					);
					console.log("✅ Token refreshed successfully");
					isRefreshing = false;
					onRefreshed();
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
