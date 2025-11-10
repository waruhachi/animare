export interface AnimeInfo {
	dub: number;
	duration: string;
	episodes: number;
	id: string;
	image: string;
	japaneseTitle: string;
	nsfw: boolean;
	sub: number;
	title: string;
	type: 'TV' | 'Movie' | 'OVA' | 'ONA' | 'Special';
	url: string;
	watchList: string;
}

export interface Recommendation {
	id: string;
	title: string;
	url: string;
	image: string;
	duration: string;
	watchList: string;
	japaneseTitle: string;
	type: 'TV' | 'Movie' | 'OVA' | 'ONA' | 'Special';
	nsfw: boolean;
	sub: number;
	dub: number;
	episodes: number;
}

export interface RelatedAnime {
	id: string;
	title: string;
	url: string;
	image: string;
	japaneseTitle: string;
	type: 'TV' | 'Movie' | 'OVA' | 'ONA' | 'Special';
	sub: number;
	dub: number;
	episodes: number;
}

export interface Episode {
	id: string;
	number: number;
	title: string;
	isFiller: boolean;
	isSubbed: boolean;
	isDubbed: boolean;
	url: string;
}

export interface AnimeDetails {
	id: string;
	title: string;
	malID: number;
	alID: number;
	japaneseTitle: string;
	image: string;
	description: string;
	type: 'TV' | 'Movie' | 'OVA' | 'ONA' | 'Special';
	url: string;
	recommendations: Recommendation[];
	relatedAnime: RelatedAnime[];
	subOrDub: 'sub' | 'dub' | 'both';
	hasSub: boolean;
	genres: string[];
	status: string;
	season: string;
	totalEpisodes: number;
	episodes: Episode[];
}

export interface VideoSource {
	url: string;
	isM3U8: boolean;
	type: 'hls' | 'mp4' | 'dash';
}

export interface Subtitle {
	url: string;
	lang: string;
}

export interface IntroOutro {
	start: number;
	end: number;
}

export interface EpisodeSources {
	headers: {
		Referer: string;
	};
	intro: IntroOutro;
	outro: IntroOutro;
	sources: VideoSource[];
	subtitles: Subtitle[];
}

export interface Response {
	currentPage: number | null;
	hasNextPage: boolean;
	results: AnimeInfo[];
	totalPages: number | null;
}
