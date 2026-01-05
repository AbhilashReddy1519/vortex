import { api } from "./api";

export async function authorization(code: string) {
	return await api.get(`/github/getAccessToken?code=${code}`);
}
