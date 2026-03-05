"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice/userSlice";
import api from "@/api/config/api";
import { useRouter } from "next/navigation";

export default function FeedPage() {
	const dispatch = useDispatch();
	const router = useRouter();

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const { data } = await api.post("/user/me", {});

				if (!data?.user) {
					router.push("/login");
					return;
				}
        console.log(data);
				dispatch(setUser(data.user));
			} catch (error: any) {
				router.push("/login");
			}
		};

		fetchUser();
	}, [dispatch, router]);

	return <div>Feed Page</div>;
}
