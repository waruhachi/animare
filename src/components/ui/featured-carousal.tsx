import { summarizeText } from '@lib/utils';

import { Badge } from '@ui/badge';
import { Button } from '@ui/button';
import { Skeleton } from '@ui/skeleton';

import { featuredAnimeQuery } from '@api/anilist';
import { fetch } from '@graphql/fetch';
import type { FeaturedAnimeQuery } from '@graphql/graphql';
import {
	QueryErrorResetBoundary,
	useSuspenseQuery,
} from '@tanstack/react-query';

import { Info, Play, Plus } from 'lucide-react';
import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

type CarouselItem = {
	id: number;
	title: string;
	image: string;
	genres: string[];
	score?: number;
	year?: number;
	type?: string;
	description?: string;
};

function stripHtml(input?: string | null): string {
	if (!input) return '';
	return input.replace(/<[^>]*>/g, '');
}

function FeaturedCarouselSkeleton() {
	return (
		<section className='relative h-[60vh] min-h-[400px] w-full overflow-hidden lg:h-[70vh]'>
			<div className='absolute inset-0'>
				<Skeleton className='h-full w-full' />
				<div className='absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent' />
				<div className='absolute inset-0 bg-linear-to-r from-background via-transparent to-transparent' />
			</div>
			<div className='container relative flex h-full items-end px-6 pb-12 lg:pb-16'>
				<div className='max-w-3xl space-y-4'>
					<Skeleton className='h-12 w-2/3 md:h-14' />
					<div className='flex items-center gap-2'>
						<Skeleton className='h-6 w-16' />
						<Skeleton className='h-5 w-10' />
						<Skeleton className='h-5 w-20' />
					</div>
					<div className='flex flex-wrap gap-2'>
						<Skeleton className='h-6 w-16' />
						<Skeleton className='h-6 w-20' />
						<Skeleton className='h-6 w-14' />
					</div>
					<Skeleton className='h-20 w-full md:w-3/4' />
					<div className='flex gap-3'>
						<Skeleton className='h-10 w-36' />
						<Skeleton className='h-10 w-36' />
						<Skeleton className='h-10 w-36' />
					</div>
				</div>
			</div>
		</section>
	);
}

function FeaturedCarouselContent({
	autoPlayInterval = 5000,
}: {
	autoPlayInterval?: number;
}) {
	const { data } = useSuspenseQuery<FeaturedAnimeQuery>({
		queryKey: ['FeaturedAnime', { page: 1, perPage: 5 }],
		queryFn: () => fetch(featuredAnimeQuery, { page: 1, perPage: 5 }),
	});

	const items = useMemo<CarouselItem[]>(() => {
		const media = data?.Page?.media ?? [];

		return media
			.filter(Boolean)
			.map((m) => {
				const title =
					m?.title?.userPreferred ||
					m?.title?.english ||
					m?.title?.romaji ||
					'Untitled';
				const image =
					m?.bannerImage ||
					m?.coverImage?.extraLarge ||
					m?.coverImage?.large ||
					'';
				return {
					id: m?.id,
					title,
					image,
					genres: (m?.genres ?? []).filter(Boolean),
					score: m?.averageScore ?? m?.meanScore ?? undefined,
					year: m?.seasonYear ?? undefined,
					type: m?.format ?? undefined,
					description: stripHtml(m?.description) ?? undefined,
				} as CarouselItem;
			})
			.filter((i: CarouselItem) => !!i.image)
			.slice(0, 5);
	}, [data]);

	const [currentIndex, setCurrentIndex] = useState(0);
	const [isPaused, setIsPaused] = useState(false);

	const goToSlide = useCallback((index: number) => {
		setCurrentIndex(index);
	}, []);

	const goToNext = useCallback(() => {
		setCurrentIndex(
			(prevIndex) => (prevIndex + 1) % Math.max(items.length, 1)
		);
	}, [items.length]);

	useEffect(() => {
		if (isPaused || items.length <= 1) return;
		const interval = setInterval(() => {
			goToNext();
		}, autoPlayInterval);
		return () => clearInterval(interval);
	}, [isPaused, autoPlayInterval, goToNext, items.length]);

	if (!items.length) {
		return (
			<div className='flex h-[40vh] min-h-[300px] w-full items-center justify-center'>
				<p className='text-muted-foreground'>No items to display</p>
			</div>
		);
	}

	const currentAnime = items[currentIndex];

	return (
		<section
			className='relative h-[60vh] min-h-[400px] w-full overflow-hidden lg:h-[70vh]'
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
			aria-label='Featured anime carousel'
		>
			{items.map((anime, index) => (
				<div
					key={anime.id}
					className='absolute inset-0 transition-opacity duration-1000'
					style={{
						opacity: index === currentIndex ? 1 : 0,
						pointerEvents: index === currentIndex ? 'auto' : 'none',
					}}
				>
					<div
						className='h-full w-full bg-cover bg-center bg-no-repeat'
						style={{
							backgroundImage: `url('${anime.image}')`,
						}}
						role='img'
						aria-label={`${anime.title} background`}
					/>
					<div className='absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent' />
					<div className='absolute inset-0 bg-linear-to-r from-background via-transparent to-transparent' />
				</div>
			))}

			<div className='container relative flex h-full items-end px-6 pb-12 lg:pb-16'>
				<div className='max-w-3xl space-y-4'>
					<h1 className='text-balance text-4xl font-bold leading-tight md:text-5xl lg:text-6xl'>
						{currentAnime.title}
					</h1>

					<div className='flex flex-wrap items-center gap-3'>
						<div className='flex items-center gap-2'>
							{currentAnime.score != null && (
								<Badge
									variant='secondary'
									className='text-sm'
								>
									{currentAnime.score} ★
								</Badge>
							)}
							{currentAnime.year && (
								<span className='text-sm text-muted-foreground'>
									{currentAnime.year}
								</span>
							)}
							{currentAnime.type && (
								<span className='text-sm text-muted-foreground'>
									{currentAnime.type}
								</span>
							)}
						</div>
					</div>

					{!!currentAnime.genres?.length && (
						<div className='flex flex-wrap gap-2'>
							{currentAnime.genres.map((genre) => (
								<Badge
									key={genre}
									variant='outline'
								>
									{genre}
								</Badge>
							))}
						</div>
					)}

					{currentAnime.description && (
						<p className='text-pretty text-base leading-relaxed text-muted-foreground md:text-lg'>
							{summarizeText(currentAnime.description)}
						</p>
					)}

					<div className='flex flex-wrap gap-3 pt-2'>
						<Button
							size='lg'
							className='gap-2'
							asChild
						>
							<a href={`/watch/${currentAnime.id}/1`}>
								<Play
									className='h-5 w-5 fill-current'
									aria-hidden='true'
								/>
								Watch Now
							</a>
						</Button>
						<Button
							size='lg'
							variant='secondary'
							className='gap-2'
						>
							<Plus
								className='h-5 w-5'
								aria-hidden='true'
							/>
							Add to List
						</Button>
						<Button
							size='lg'
							variant='outline'
							className='gap-2 bg-transparent'
							asChild
						>
							<a href={`/anime/${currentAnime.id}`}>
								<Info
									className='h-5 w-5'
									aria-hidden='true'
								/>
								More Info
							</a>
						</Button>
					</div>
				</div>
			</div>

			{items.length > 1 && (
				<div
					className='absolute bottom-6 right-6 z-10 flex gap-2'
					role='tablist'
					aria-label='Carousel navigation'
				>
					{items.map((anime, index) => (
						<button
							key={anime.id}
							onClick={() => goToSlide(index)}
							className={`h-1.5 rounded-full transition-all duration-300 ${
								index === currentIndex ? 'w-8 bg-primary' : (
									'w-1.5 bg-white/40 hover:bg-white/60'
								)
							}`}
							aria-label={`Go to slide ${index + 1}: ${anime.title}`}
							aria-selected={index === currentIndex}
							role='tab'
						/>
					))}
				</div>
			)}
		</section>
	);
}

export function FeaturedCarousel({
	autoPlayInterval = 5000,
}: {
	autoPlayInterval?: number;
}) {
	return (
		<QueryErrorResetBoundary>
			{({ reset }) => (
				<ErrorBoundary
					onReset={reset}
					fallbackRender={({ error, resetErrorBoundary }) => (
						<div className='flex h-[40vh] min-h-[300px] w-full flex-col items-center justify-center gap-4'>
							<p className='text-muted-foreground'>
								{error?.message ?? 'Something went wrong.'}
							</p>
							<Button onClick={resetErrorBoundary}>
								Try again
							</Button>
						</div>
					)}
				>
					<Suspense fallback={<FeaturedCarouselSkeleton />}>
						<FeaturedCarouselContent
							autoPlayInterval={autoPlayInterval}
						/>
					</Suspense>
				</ErrorBoundary>
			)}
		</QueryErrorResetBoundary>
	);
}
