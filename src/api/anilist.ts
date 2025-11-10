import { fetchGraphQL } from '@api/fetch';

export async function getTrendingAnime(): Promise<AniList.Response> {
	const QUERY = `
	{
		Page(page: 1, perPage: 20) {
			pageInfo {
				total
				currentPage
				lastPage
				hasNextPage
				perPage
			}
			media(sort: TRENDING_DESC, type: ANIME) {
				id
				title {
					romaji
					english
					native
					userPreferred
				}
				format
				status
				description
				startDate {
					year
					month
					day
				}
				endDate {
					year
					month
					day
				}
				season
				seasonYear
				episodes
				duration
				coverImage {
					large
					extraLarge
					color
				}
				bannerImage
				genres
				synonyms
				averageScore
				meanScore
				popularity
				favourites
				isAdult
				nextAiringEpisode {
					id
					timeUntilAiring
					episode
				}
				mediaListEntry {
					id
					mediaId
					status
					score(format:POINT_10)
					progress
				}
				siteUrl
				trailer {
					id
					site
					thumbnail
				}
				streamingEpisodes {
					title
					thumbnail
				}
			}
		}
	}`;

	const response = await fetchGraphQL<AniList.Response>(
		'https://graphql.anilist.co/',
		QUERY,
		{}
	);

	return response;
}

export async function getPopularAnime(): Promise<AniList.Response> {
	const QUERY = `
	{
		Page(page: 1, perPage: 20) {
			pageInfo {
				total
				currentPage
				lastPage
				hasNextPage
				perPage
			}
			media(sort: POPULARITY_DESC, type: ANIME) {
				id
				title {
					romaji
					english
					native
					userPreferred
				}
				format
				status
				description
				startDate {
					year
					month
					day
				}
				endDate {
					year
					month
					day
				}
				season
				seasonYear
				episodes
				duration
				coverImage {
					large
					extraLarge
					color
				}
				bannerImage
				genres
				synonyms
				averageScore
				meanScore
				popularity
				favourites
				isAdult
				nextAiringEpisode {
					id
					timeUntilAiring
					episode
				}
				mediaListEntry {
					id
					mediaId
					status
					score(format:POINT_10)
					progress
				}
				siteUrl
				trailer {
					id
					site
					thumbnail
				}
				streamingEpisodes {
					title
					thumbnail
				}
			}
		}
	}`;

	const response = await fetchGraphQL<AniList.Response>(
		'https://graphql.anilist.co/',
		QUERY,
		{}
	);

	return response;
}

export async function getUpcomingAnime(): Promise<AniList.Response> {
	const QUERY = `
	{
		Page(page: 1, perPage: 20) {
			pageInfo {
				total
				currentPage
				lastPage
				hasNextPage
				perPage
			}
			media(status: NOT_YET_RELEASED, sort: POPULARITY_DESC, type: ANIME) {
				id
				title {
					romaji
					english
					native
					userPreferred
				}
				format
				status
				description
				startDate {
					year
					month
					day
				}
				endDate {
					year
					month
					day
				}
				season
				seasonYear
				episodes
				duration
				coverImage {
					large
					extraLarge
					color
				}
				bannerImage
				genres
				synonyms
				averageScore
				meanScore
				popularity
				favourites
				isAdult
				nextAiringEpisode {
					id
					timeUntilAiring
					episode
				}
				mediaListEntry {
					id
					mediaId
					status
					score(format:POINT_10)
					progress
				}
				siteUrl
				trailer {
					id
					site
					thumbnail
				}
				streamingEpisodes {
					title
					thumbnail
				}
			}
		}
	}`;

	const response = await fetchGraphQL<AniList.Response>(
		'https://graphql.anilist.co/',
		QUERY,
		{}
	);

	return response;
}

export async function getReleasingAnime(): Promise<AniList.Response> {
	const QUERY = `
	{
		Page(page: 1, perPage: 20) {
			pageInfo {
				total
				currentPage
				lastPage
				hasNextPage
				perPage
			}
			media(status: RELEASING, sort: POPULARITY_DESC, type: ANIME) {
				id
				title {
					romaji
					english
					native
					userPreferred
				}
				format
				status
				description
				startDate {
					year
					month
					day
				}
				endDate {
					year
					month
					day
				}
				season
				seasonYear
				episodes
				duration
				coverImage {
					large
					extraLarge
					color
				}
				bannerImage
				genres
				synonyms
				averageScore
				meanScore
				popularity
				favourites
				isAdult
				nextAiringEpisode {
					id
					timeUntilAiring
					episode
				}
				mediaListEntry {
					id
					mediaId
					status
					score(format:POINT_10)
					progress
				}
				siteUrl
				trailer {
					id
					site
					thumbnail
				}
				streamingEpisodes {
					title
					thumbnail
				}
			}
		}
	}`;

	const response = await fetchGraphQL<AniList.Response>(
		'https://graphql.anilist.co/',
		QUERY,
		{}
	);

	return response;
}

export async function searchAnime(anime: string): Promise<AniList.Response> {
	const QUERY = `
	{
		Page(page: 1, perPage: 20) {
			pageInfo {
				total
				currentPage
				lastPage
				hasNextPage
				perPage
			}
			media(search: "${decodeURIComponent(
				anime
			)}", type: ANIME, sort: SEARCH_MATCH, isAdult: false) {
				id
				title {
					romaji
					english
					native
					userPreferred
				}
				format
				status
				description
				startDate {
					year
					month
					day
				}
				endDate {
					year
					month
					day
				}
				season
				seasonYear
				episodes
				duration
				coverImage {
					large
					extraLarge
					color
				}
				bannerImage
				genres
				synonyms
				averageScore
				meanScore
				popularity
				favourites
				isAdult
				nextAiringEpisode {
					id
					timeUntilAiring
					episode
				}
				mediaListEntry {
					id
					mediaId
					status
					score(format:POINT_10)
					progress
				}
				siteUrl
				trailer {
					id
					site
					thumbnail
				}
				streamingEpisodes {
					title
					thumbnail
				}
			}
		}
	}`;

	const response = await fetchGraphQL<AniList.Response>(
		'https://graphql.anilist.co/',
		QUERY,
		{}
	);

	return response;
}

export async function searchAnimeByGenre(
	genre: string
): Promise<AniList.Response> {
	const QUERY = `
	{
		Page(page: 1, perPage: 20) {
			pageInfo {
				total
				currentPage
				lastPage
				hasNextPage
				perPage
			}
			media(genre: "${genre}", sort: TRENDING_DESC, type: ANIME) {
				id
				title {
					romaji
					english
					native
					userPreferred
				}
				format
				status
				description
				startDate {
					year
					month
					day
				}
				endDate {
					year
					month
					day
				}
				season
				seasonYear
				episodes
				duration
				coverImage {
					large
					extraLarge
					color
				}
				bannerImage
				genres
				synonyms
				averageScore
				meanScore
				popularity
				favourites
				isAdult
				nextAiringEpisode {
					id
					timeUntilAiring
					episode
				}
				mediaListEntry {
					id
					mediaId
					status
					score(format:POINT_10)
					progress
				}
				siteUrl
				trailer {
					id
					site
					thumbnail
				}
				streamingEpisodes {
					title
					thumbnail
				}
			}
		}
	}`;

	const response = await fetchGraphQL<AniList.Response>(
		'https://graphql.anilist.co/',
		QUERY,
		{}
	);

	return response;
}

export async function searchAnimeByID(
	id: string
): Promise<AniList.SingleResponse> {
	const QUERY = `
	query($id: Int) {
		Media(id: $id, type: ANIME) {
			id
			title {
				romaji
				english
				native
				userPreferred
			}
			format
			status
			description
			startDate {
				year
				month
				day
			}
			endDate {
				year
				month
				day
			}
			season
			seasonYear
			episodes
			duration
			coverImage {
				large
				extraLarge
				color
			}
			bannerImage
			genres
			synonyms
			averageScore
			meanScore
			popularity
			favourites
			isAdult
			nextAiringEpisode {
				id
				timeUntilAiring
				episode
			}
			mediaListEntry {
				id
				mediaId
				status
				score(format:POINT_10)
				progress
			}
			siteUrl
			trailer {
				id
				site
				thumbnail
			}
			streamingEpisodes {
				title
				thumbnail
			}
		}
	}`;

	const response = await fetchGraphQL<AniList.SingleResponse>(
		'https://graphql.anilist.co/',
		QUERY,
		{ id: id }
	);

	return response;
}
