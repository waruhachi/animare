import { fetch } from '@tauri-apps/plugin-http';

export async function fetchGraphQL<T = any>(
	url: string,
	query: string,
	variables?: Record<string, any>
): Promise<T> {
	try {
		const fetchResponse = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				query,
				variables: variables || {},
			}),
		});

		if (!fetchResponse.ok) {
			throw new Error(`HTTP error! status: ${fetchResponse.status}`);
		}

		const data: T = await fetchResponse.json();
		return data;
	} catch (error) {
		console.error('Error fetching GraphQL with fetch:', error);
		throw error;
	}
}

export async function fetchRest<T = any>(url: string): Promise<T> {
	try {
		const fetchResponse = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		});

		if (!fetchResponse.ok) {
			throw new Error(`HTTP error! status: ${fetchResponse.status}`);
		}

		const data: T = await fetchResponse.json();
		return data;
	} catch (error) {
		console.error('Error fetching REST API with fetch:', error);
		throw error;
	}
}
