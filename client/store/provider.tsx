"use client";

import { Provider } from "react-redux";
import { store } from "./store";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function StoreProvider({ children }: any) {
	return <Provider store={store}>{children}</Provider>;
}
