import { graphql } from '@graphql/index';

export const currentUserQuery = graphql(`
	query CurrentUser {
		Viewer {
			id
			name
			avatar {
				large
				medium
			}
			bannerImage
			options {
				displayAdultContent
			}
			siteUrl
		}
	}
`);

export const featuredAnimeQuery = graphql(`
	query FeaturedAnime($page: Int, $perPage: Int) {
		Page(page: $page, perPage: $perPage) {
			pageInfo {
				total
				currentPage
				lastPage
				hasNextPage
				perPage
			}
			media(sort: FAVOURITES_DESC, type: ANIME) {
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
					score(format: POINT_10)
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
	}
`);

export const trendingAnimeQuery = graphql(`
	query TrendingAnime($page: Int, $perPage: Int) {
		Page(page: $page, perPage: $perPage) {
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
					score(format: POINT_10)
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
	}
`);

export const popularAnimeQuery = graphql(`
	query PopularAnime($page: Int, $perPage: Int) {
		Page(page: $page, perPage: $perPage) {
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
					score(format: POINT_10)
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
	}
`);

export const upcomingAnimeQuery = graphql(`
	query UpcomingAnime($page: Int, $perPage: Int) {
		Page(page: $page, perPage: $perPage) {
			pageInfo {
				total
				currentPage
				lastPage
				hasNextPage
				perPage
			}
			media(
				status: NOT_YET_RELEASED
				sort: POPULARITY_DESC
				type: ANIME
			) {
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
					score(format: POINT_10)
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
	}
`);

export const releasingAnimeQuery = graphql(`
	query ReleasingAnime($page: Int, $perPage: Int) {
		Page(page: $page, perPage: $perPage) {
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
					score(format: POINT_10)
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
	}
`);

export const searchAnimeByNameQuery = graphql(`
	query SearchAnime($anime: String, $page: Int, $perPage: Int) {
		Page(page: $page, perPage: $perPage) {
			pageInfo {
				total
				currentPage
				lastPage
				hasNextPage
				perPage
			}
			media(
				search: $anime
				type: ANIME
				sort: SEARCH_MATCH
				isAdult: false
			) {
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
					score(format: POINT_10)
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
	}
`);

export const searchAnimeByGenre = graphql(`
	query SearchAnimeByGenre($genre: String, $page: Int, $perPage: Int) {
		Page(page: $page, perPage: $perPage) {
			pageInfo {
				total
				currentPage
				lastPage
				hasNextPage
				perPage
			}
			media(genre: $genre, sort: TRENDING_DESC, type: ANIME) {
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
					score(format: POINT_10)
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
	}
`);

export const searchAnimeByID = graphql(`
	query SearchAnimeByID($id: Int) {
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
				score(format: POINT_10)
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
`);
