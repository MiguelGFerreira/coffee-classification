"use client"

import { useContext, useState, useEffect } from "react";
import { UserContext } from "@/context/UserContext";
import AcessoNegado from "@/components/AcessoNegado";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function AccessControl({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = useContext(UserContext) || null;
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (user) {
			setLoading(false);
		}
	}, [user]);

	if (loading) {
		return <LoadingSpinner />;
	}

	const acesso = user?.acesso[0].ACESSO;

	if (!["A", "B", "C"].includes(acesso!)) {
		return <AcessoNegado userlogon={user!.username} />;
	}

	return <>{children}</>;
}
