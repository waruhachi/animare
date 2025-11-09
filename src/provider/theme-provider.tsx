import { animateThemeTransition } from '@lib/animate-theme-transition';

import {
	ResolvedTheme,
	Theme,
	ThemeProviderContext,
	ThemeProviderState,
} from '@context/theme-context';

import { setTheme as setTauriTheme } from '@tauri-apps/api/app';

import { useEffect, useMemo, useState } from 'react';

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

	const resolvedTheme = useMemo<ResolvedTheme>(
		() =>
			theme === 'system' ?
				systemDark ? 'dark'
				:	'light'
			:	theme,
		[theme, systemDark]
	);

	useEffect(() => {
		const root = window.document.documentElement;
		if (theme === 'system') {
			animateThemeTransition(
				() => {
					root.classList.remove('light', 'dark');
					root.classList.add(resolvedTheme);
				},
				{
					button: document.querySelector(
						'[data-theme-toggler]'
					) as HTMLButtonElement,
					duration: 400,
				}
			);
		} else {
			root.classList.remove('light', 'dark');
			root.classList.add(resolvedTheme);
		}
		setTauriTheme(theme === 'system' ? undefined : theme);
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
