type StreamingEpisodes = {
	title: string;
	thumbnail: string;
};

export type Media = {
	id: number;
	title: {
		romaji: string;
		english: string;
		native: string;
		userPreferred: string;
	};
	format: string;
	status: string;
	description: string;
	startDate: {
		year: number;
		month: number;
		day: number;
	};
	endDate: {
		year: number;
		month: number;
		day: number;
	};
	season: string;
	seasonYear: number;
	episodes: number;
	duration: number;
	coverImage: {
		large: string;
		extraLarge: string;
		color: string;
	};
	bannerImage: string;
	genres: string[];
	synonyms: string[];
	averageScore: number;
	meanScore: number;
	popularity: number;
	favourites: number;
	isAdult: boolean;
	nextAiringEpisode: {
		id: number;
		timeUntilAiring: number;
		episode: number;
	};
	mediaListEntry?: unknown;
	siteUrl: string;
	trailer: {
		id: string;
		site: string;
		thumbnail: string;
	};
	streamingEpisodes: StreamingEpisodes[];
};

export type PageInfo = {
	total: number;
	currentPage: number;
	lastPage: number;
	hasNextPage: boolean;
	perPage: number;
};

export type Response = {
	data: {
		Page: {
			pageInfo: PageInfo;
			media: Media[];
		};
	};
};

export type SingleResponse = {
	data: {
		Media: Media;
	};
};

export type AniListViewer = {
	id: number;
	name: string;
	avatar: {
		large: string;
	};
};
