import { fetchRest } from '@api/fetch';

export async function getEpisodeDetails(
	episodeId: string
): Promise<AniZip.Response> {
	const response = await fetchRest<AniZip.Response>(
		`https://api.ani.zip/mappings?anilist_id=${episodeId}`
	);

	return response;
}
