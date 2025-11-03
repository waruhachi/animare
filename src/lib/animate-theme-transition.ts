import { flushSync } from 'react-dom';

export interface AnimationOptions {
	button?: HTMLElement | null;
	duration?: number;
}

export async function animateThemeTransition(
	callback: () => void,
	options: AnimationOptions = {}
): Promise<void> {
	const { button, duration = 400 } = options;

	if (!(document as any).startViewTransition) {
		callback();
		return;
	}

	await (document as any).startViewTransition?.(() => {
		flushSync(() => {
			callback();
		});
	})?.ready;

	let x: number, y: number, maxRadius: number;

	if (button) {
		const { top, left, width, height } = button.getBoundingClientRect();
		x = left + width / 2;
		y = top + height / 2;
		maxRadius = Math.hypot(
			Math.max(left, window.innerWidth - left),
			Math.max(top, window.innerHeight - top)
		);
	} else {
		x = window.innerWidth / 2;
		y = window.innerHeight / 2;
		maxRadius =
			Math.hypot(window.innerWidth / 2, window.innerHeight / 2) * 2;
	}

	document.documentElement.animate(
		{
			clipPath: [
				`circle(0px at ${x}px ${y}px)`,
				`circle(${maxRadius}px at ${x}px ${y}px)`,
			],
		},
		{
			duration,
			easing: 'ease-in-out',
			pseudoElement: '::view-transition-new(root)',
		}
	);
}
