"use server";
import { indexOf } from "lodash";
import { getUser, initializeGraphForAppOnlyAuth } from "./graphHelper";
import { headers } from "next/headers";

export async function getUserLogon() {
	"use server";
	const headersList = headers();
	//var userlogon = headersList.get("x-iisnode-auth_user");
	var userlogon = 'realcafe\\miguel';
	const displayName =
		userlogon === "realcafe\\artur"
			? "amjacobina@"
			: userlogon?.substring(indexOf(userlogon, "\\") + 1) + "@";
	const settings = require("@/lib/appSettings");
	initializeGraphForAppOnlyAuth(settings);
	const user = await getUser(displayName);
	let usuario = "";

	user.value.map((i: { mail: string }) => {
		if (i.mail.includes("@realcafe") || i.mail.includes("@tristao")) {
			usuario = i.mail;
		}
	});

	return { userlogon, displayName, usuario };
}