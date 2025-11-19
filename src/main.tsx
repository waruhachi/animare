import App from './App';

import { AuthProvider } from '@provider/auth-provider';
import { ReactQueryProvider } from '@provider/query-provider';
import { ThemeProvider } from '@provider/theme-provider';

import React from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')! as HTMLElement).render(
	<React.StrictMode>
		<ReactQueryProvider>
			<AuthProvider>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</AuthProvider>
		</ReactQueryProvider>
	</React.StrictMode>
);
