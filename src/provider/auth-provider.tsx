import {
	AniListViewer,
	AuthContext,
	AuthContextType,
} from '@context/auth-context';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';

import { useCallback, useEffect } from 'react';
import { ReactNode } from 'react';

export function AuthProvider({ children }: { children: ReactNode }) {
	const queryClient = useQueryClient();

	const loginStatusQuery = useQuery({
		queryKey: ['auth', 'status'],
		queryFn: () => invoke<boolean>('get_anilist_login_status'),
	});

	const viewerQuery = useQuery({
		queryKey: ['auth', 'viewer'],
		queryFn: () => invoke<AniListViewer>('get_anilist_viewer'),
		enabled: loginStatusQuery.data === true,
	});

	const login = useCallback(async () => {
		await invoke<void>('anilist_start_login');
	}, []);

	const logout = useCallback(async () => {
		await invoke<void>('clear_anilist_access_token');
	}, []);

	useEffect(() => {
		let mounted = true;
		listen('auth-changed', () => {
			if (mounted) {
				queryClient.invalidateQueries({ queryKey: ['auth'] });
			}
		}).catch(console.error);

		return () => {
			mounted = false;
		};
	}, [queryClient]);

	const value: AuthContextType = {
		viewer: viewerQuery.data ?? null,
		isLoggedIn: loginStatusQuery.data ?? null,
		isLoading: loginStatusQuery.isPending || viewerQuery.isPending,
		login,
		logout,
		refetch: () => queryClient.invalidateQueries({ queryKey: ['auth'] }),
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
}
