import { createContext, useContext } from 'react';

export interface AniListViewer {
	id: number;
	name: string;
	avatar: {
		large: string;
	};
}

export interface AuthContextType {
	viewer: AniListViewer | null;
	isLoggedIn: boolean | null;
	isLoading: boolean;
	login: () => Promise<void>;
	logout: () => Promise<void>;
	refetch: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === null) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}
