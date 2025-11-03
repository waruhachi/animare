import { MoonIcon } from './moon';
import { SunIcon } from './sun';

import { animateThemeTransition } from '@lib/animate-theme-transition';
import { cn } from '@lib/utils';

import { useTheme } from '@hooks/useTheme';

import { useCallback, useRef } from 'react';

interface AnimatedThemeTogglerProps
	extends React.ComponentPropsWithoutRef<'button'> {
	duration?: number;
}

export const AnimatedThemeToggler = ({
	className,
	duration = 400,
	...props
}: AnimatedThemeTogglerProps) => {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const { resolvedTheme, setTheme } = useTheme();

	const toggleTheme = useCallback(async () => {
		if (!buttonRef.current) return;

		const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';

		await animateThemeTransition(() => setTheme(nextTheme), {
			button: buttonRef.current,
			duration,
		});
	}, [resolvedTheme, duration, setTheme]);

	return (
		<button
			ref={buttonRef}
			onClick={toggleTheme}
			className={cn(className)}
			data-theme-toggler
			{...props}
		>
			{resolvedTheme === 'dark' ?
				<MoonIcon />
			:	<SunIcon />}
			<span className='sr-only'>Toggle theme</span>
		</button>
	);
};
