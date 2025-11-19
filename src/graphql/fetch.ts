import type { TypedDocumentString } from './graphql';

import { fetch as tauriFetch } from '@tauri-apps/plugin-http';

export async function fetch<TResult, TVariables>(
	query: TypedDocumentString<TResult, TVariables>,
	...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
	const response = await tauriFetch('https://graphql.anilist.co/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify({
			query,
			variables,
		}),
	});

	if (!response.ok) {
		throw new Error(`HTTP ${response.status}: ${response.statusText}`);
	}

	const result = (await response.json()) as {
		data: TResult;
		errors?: Array<{ message: string }>;
	};

	if (result.errors) {
		throw new Error(result.errors.map((e) => e.message).join(', '));
	}

	return result.data;
}
