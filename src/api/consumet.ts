import { fetchRest } from '@api/fetch';

const CONSUMET_API_BASE = 'https://hoso-api.vercel.app/anime/zoro';

export async function searchAnime(
	anime: string,
	dubbed: boolean = false
): Promise<Consumet.Response> {
	const response = await fetchRest<Consumet.Response>(
		`${CONSUMET_API_BASE}/${encodeURIComponent(anime)}${dubbed ? '?dub=true' : ''}`
	);

	return response;
}

export async function fetchAnimeInfo(
	id: string,
	dubbed: boolean = true
): Promise<Consumet.AnimeDetails> {
	const response = await fetchRest<Consumet.AnimeDetails>(
		`${CONSUMET_API_BASE}/info?id=${encodeURIComponent(id)}${dubbed ? '&dub=true' : ''}`
	);

	return response;
}

export async function fetchEpisodeSources(
	episodeId: string,
	dubbed: boolean = false
): Promise<Consumet.EpisodeSources> {
	const response = await fetchRest<Consumet.EpisodeSources>(
		`${CONSUMET_API_BASE}/watch/${encodeURIComponent(episodeId)}${dubbed ? '?dub=true' : ''}`
	);

	return response;
}
