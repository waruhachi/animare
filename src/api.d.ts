export {};

declare global {
	namespace AniList {
		type Media = import('./types/anilist').Media;
		type PageInfo = import('./types/anilist').PageInfo;
		type Response = import('./types/anilist').Response;
		type SingleResponse = import('./types/anilist').SingleResponse;
	}

	namespace AniZip {
		type Response = import('./types/anizip').Response;
		type EpisodeDetails = import('./types/anizip').EpisodeDetails;
	}

	namespace Consumet {
		type Response = import('./types/consumet').Response;
		type AnimeInfo = import('./types/consumet').AnimeInfo;
		type AnimeDetails = import('./types/consumet').AnimeDetails;
		type EpisodeSources = import('./types/consumet').EpisodeSources;
	}
}
