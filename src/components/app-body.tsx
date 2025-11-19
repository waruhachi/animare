import { FeaturedCarousel } from './ui/featured-carousal';

export function AppBody() {
	return (
		<div className='w-full h-full rounded-xl overflow-hidden'>
			<section className='relative h-[60vh] min-h-[400px] w-full lg:h-[70vh]'>
				<FeaturedCarousel />
			</section>
		</div>
	);
}
