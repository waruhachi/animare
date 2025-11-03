import {
	ResolvedTheme,
	Theme,
	ThemeProviderContext,
	ThemeProviderState,
} from '@context/theme-context';

import { setTheme as setTauriTheme } from '@tauri-apps/api/app';

import { useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';

type ThemeProviderProps = {
	children: React.ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
};

export function ThemeProvider({
	children,
	defaultTheme = 'system',
	storageKey = 'theme',
}: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(() => {
		const storedTheme = localStorage.getItem(storageKey) as Theme | null;
		return storedTheme ?? defaultTheme;
	});

	const [systemDark, setSystemDark] = useState<boolean>(
		() => window.matchMedia('(prefers-color-scheme: dark)').matches
	);

	const resolvedTheme = useMemo<ResolvedTheme>(() => {
		if (theme === 'system') {
			return systemDark ? 'dark' : 'light';
		}
		return theme;
	}, [theme, systemDark]);

	useEffect(() => {
		const root = window.document.documentElement;
		if (theme === 'system') {
			document
				.startViewTransition(() => {
					flushSync(() => {
						root.classList.remove('light', 'dark');
						root.classList.add(resolvedTheme);
					});
				})
				.ready.then(() => {
					const button = document.querySelector(
						'[data-theme-toggler]'
					) as HTMLButtonElement;
					let x: number, y: number, maxRadius: number;
					if (button) {
						const { top, left, width, height } =
							button.getBoundingClientRect();
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
							Math.hypot(
								window.innerWidth / 2,
								window.innerHeight / 2
							) * 2;
					}
					root.animate(
						{
							clipPath: [
								`circle(0px at ${x}px ${y}px)`,
								`circle(${maxRadius}px at ${x}px ${y}px)`,
							],
						},
						{
							duration: 400,
							easing: 'ease-in-out',
							pseudoElement: '::view-transition-new(root)',
						}
					);
				});
		} else {
			root.classList.remove('light', 'dark');
			root.classList.add(resolvedTheme);
		}
		setTauriTheme(theme === 'system' ? (null as any) : theme);
	}, [theme, resolvedTheme]);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
		mediaQuery.addEventListener?.('change', handler);
		return () => mediaQuery.removeEventListener?.('change', handler);
	}, []);

	const value: ThemeProviderState = {
		theme,
		resolvedTheme,
		setTheme: (theme: Theme) => {
			localStorage.setItem(storageKey, theme);
			setTheme(theme);
		},
	};

	return (
		<ThemeProviderContext.Provider value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}
