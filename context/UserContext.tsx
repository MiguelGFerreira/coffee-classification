"use client"

import { getUserLogon } from "@/lib/getUserLogon";
import { User } from "@/types";
import React, { useEffect, useState } from "react";

export const UserContext = React.createContext<User | null>(null)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);

	const fetchUser = async () => {
		const user = await getUserLogon()
		setUser(user);
	}

	useEffect(() => {
		fetchUser();
	}, []);

	return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}