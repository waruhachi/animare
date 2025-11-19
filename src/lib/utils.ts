import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import {
	SorensenDiceSimilarity,
	DefaultTextParser,
	ConsoleLogger,
	AbsoluteSummarizerConfig,
	Summarizer,
} from 'ts-textrank';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function cleanText(text: string) {
	let cleaned = text.replace(/<(?!br\s*\/?)[^>]+>/gi, '');
	cleaned = cleaned.replace(/<br\s*\/?>/gi, '\n');

	const lines = cleaned.split(/\r?\n/);
	const filteredLines = lines.filter((line) => {
		return !/\bepisodes?\b/i.test(line);
	});

	const joined = filteredLines.join('\n').trim();
	const sentences = joined.split(/(?<=[.!?])\s+/);
	const filteredSentences = sentences.filter(
		(s) => !/\bepisodes?\b/i.test(s)
	);

	return filteredSentences
		.join(' ')
		.replace(/\s+\n\s+/g, '\n')
		.trim();
}

export function summarizeText(
	text: string,
	maxSentences: number = 2,
	ratio: number = 0.85,
	language: string = 'en'
): string {
	const sim = new SorensenDiceSimilarity();
	const parser = new DefaultTextParser();
	const logger = new ConsoleLogger();
	const config = new AbsoluteSummarizerConfig(
		maxSentences,
		sim,
		parser,
		ratio,
		Summarizer.SORT_OCCURENCE
	);
	const summarizer = new Summarizer(config, logger);
	const summary = summarizer.summarize(cleanText(text), language);

	return `${summary.join(' ')}.`.trim();
}
