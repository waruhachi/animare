export type EpisodeDetails = {
	tvdbShowId: number;
	tvdbId: number;
	seasonNumber: number;
	episodeNumber: number;
	absoluteEpisodeNumber: number;
	title: {
		ja: string;
		en: string;
		'x-jat': string;
	};
	airDate: string;
	airDateUtc: string;
	runtime: number;
	overview: string;
	image: string;
	episode: string;
	anidbEid: number;
	length: number;
	airdate: string;
	rating: string;
	summary: string;
};

export type Response = {
	titles: {
		'x-jat': string;
		ja: string;
		'zh-Hant': string;
		en: string;
		ru: string;
	};
	episodes: {
		[episodeNumber: string]: EpisodeDetails;
	};
	episodeCount: number;
	specialCount: number;
	images: {
		coverType: string;
		url: string;
	};
	mappings: {
		animeplanet_id: string;
		kitsu_id: number;
		mal_id: number;
		type: string;
		anilist_id: number;
		anisearch_id: number;
		anidb_id: number;
		notifymoe_id: string;
		livechart_id: number;
		thetvdb_id: number;
		imdb_id: number;
		themoviedb_id: number;
	};
};
