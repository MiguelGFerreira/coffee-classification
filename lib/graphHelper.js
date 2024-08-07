"use server";
import "isomorphic-fetch";
import { ClientSecretCredential } from "@azure/identity";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";

let _settings = undefined;
let _clientSecretCredential = undefined;
let _appClient = undefined;

export async function initializeGraphForAppOnlyAuth(settings) {
	// Ensure settings isn't null
	if (!settings) {
		throw new Error("Settings cannot be undefined");
	}

	_settings = settings;

	// Ensure settings isn't null
	if (!_settings) {
		throw new Error("Settings cannot be undefined");
	}

	if (!_clientSecretCredential) {
		_clientSecretCredential = new ClientSecretCredential(
			_settings.tenantId,
			_settings.clientId,
			_settings.clientSecret
		);
	}

	if (!_appClient) {
		const authProvider = new TokenCredentialAuthenticationProvider(
			_clientSecretCredential,
			{
				scopes: ["https://graph.microsoft.com/.default"],
			}
		);

		_appClient = Client.initWithMiddleware({
			authProvider: authProvider,
		});
	}
}
export async function getItemsAsync(siteId, listId, size, fields) {
	// Ensure client isn't undefined
	if (!_appClient) {
		throw new Error("Graph has not been initialized for app-only auth");
	}
	if (fields) {
		if (size) {
			return _appClient
				?.api(
					`/sites/${siteId}/lists/${listId}/items?expand=fields(select=${fields})`
				)
				.top(size)
				.get();
		} else {
			return _appClient
				?.api(
					`/sites/${siteId}/lists/${listId}/items?expand=fields(select=${fields})`
				)
				.get();
		}
	} else {
		return _appClient
			?.api(`/sites/${siteId}/lists/${listId}/items?expand=fields`)
			.get();
	}
}
export async function getItemFieldsFilter(siteId, listId, filter) {
	// Ensure client isn't undefined
	if (!_appClient) {
		throw new Error("Graph has not been initialized for app-only auth");
	}

	return _appClient
		?.api(`/sites/${siteId}/lists/${listId}/items?expand=fields`)
		.filter(filter)
		.get();
}
export async function getItemFieldsAsync(siteId, listId, itemId) {
	// Ensure client isn't undefined
	if (!_appClient) {
		throw new Error("Graph has not been initialized for app-only auth");
	}

	return _appClient
		?.api(`/sites/${siteId}/lists/${listId}/items/${itemId}/Fields`)
		.get();
}

export async function getFilteredOrder(query, filter, order) {
	// Ensure client isn't undefined
	if (!_appClient) {
		throw new Error("Graph has not been initialized for app-only auth");
	}
	return _appClient?.api(query).filter(filter).orderby(order).get();
}

export async function getDriveItems(siteId, driveId) {
	// Ensure client isn't undefined
	if (!_appClient) {
		throw new Error("Graph has not been initialized for app-only auth");
	}

	return _appClient
		?.api(`/sites/${siteId}/drives/${driveId}/root/children`)
		.get();
}
export async function getDriveChildItems(siteId, driveId, itemId) {
	// Ensure client isn't undefined
	if (!_appClient) {
		throw new Error("Graph has not been initialized for app-only auth");
	}

	return _appClient
		?.api(`/sites/${siteId}/drives/${driveId}/items/${itemId}/children`)
		.get();
}

export async function getNext(query) {
	// Ensure client isn't undefined
	if (!_appClient) {
		throw new Error("Graph has not been initialized for app-only auth");
	}

	return _appClient?.api(query).get();
}

export async function batchRequest(toRequest) {
	// Ensure client isn't undefined
	if (!_appClient) {
		throw new Error("Graph has not been initialized for app-only auth");
	}
	return _appClient.api("/$batch").post(toRequest);
}

export async function postItem(siteId, listId, newItem) {
	// Ensure client isn't undefined
	if (!_appClient) {
		throw new Error("Graph has not been initialized for app-only auth");
	}
	return _appClient
		.api(`/sites/${siteId}/lists/${listId}/items`)
		.post(newItem);
}
export async function patchItem(siteId, listId, itemId, newItem) {
	// Ensure client isn't undefined
	if (!_appClient) {
		throw new Error("Graph has not been initialized for app-only auth");
	}
	return _appClient
		.api(`/sites/${siteId}/lists/${listId}/items/${itemId}/fields`)
		.update(newItem);
}
export async function deleteItem(siteId, listId, itemId) {
	// Ensure client isn't undefined
	if (!_appClient) {
		throw new Error("Graph has not been initialized for app-only auth");
	}
	return _appClient
		.api(`/sites/${siteId}/lists/${listId}/items/${itemId}`)
		.delete();
}
export async function getUser(user) {
	// Ensure client isn't undefined
	if (!_appClient) {
		throw new Error("Graph has not been initialized for app-only auth");
	}
	return _appClient
		?.api("/users")
		.filter(`startswith(mail,'${user}')`)
		.select("mail")
		.get();
}

export async function postFile(siteId, driveId, file) {
	// Ensure client isn't undefined
	if (!_appClient) {
		throw new Error("Graph has not been initialized for app-only auth");
	}

	await _appClient
		.api(`/sites/${siteId}/drives/${driveId}:/${file}:/content`)
		.put(file);
}
export async function postFiletoFolder(siteId, driveId, folder, file) {
	// Ensure client isn't undefined
	if (!_appClient) {
		throw new Error("Graph has not been initialized for app-only auth");
	}

	await _appClient
		.api(
			`/sites/${siteId}/drives/${driveId}/items/${folder}:/${file.name}:/content`
			// `/sites/${siteId}/drives/${driveId}/items/${folder}/:${file}:/content`
		)
		.put(file);
}
export async function searchDrive(siteId, driveId, text) {
	// Ensure client isn't undefined
	if (!_appClient) {
		throw new Error("Graph has not been initialized for app-only auth");
	}
	return await _appClient
		.api(
			`/sites/${siteId}/drives/${driveId}/items/root/search(q='${text}')`
		)
		.get();
}