"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setUser } from "@/store/userSlice/userSlice";

import { useAuth } from "@/context/AuthContext";

export default function FeedPage() {
	const dispatch = useDispatch();

	const { user, isAuthenticated, isLoading } = useAuth();

	useEffect(() => {
		if (!isLoading && isAuthenticated && user) {
			dispatch(setUser(user));
		}
	}, [user, isAuthenticated, isLoading, dispatch]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return <div>Feed Page</div>;
}
