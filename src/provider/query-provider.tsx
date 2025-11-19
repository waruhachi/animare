import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type ReactQueryProviderProps = {
	children: React.ReactNode;
};

const queryClient = new QueryClient();

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			{children}
		</QueryClientProvider>
	);
}
