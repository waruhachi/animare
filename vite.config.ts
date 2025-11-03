import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@lib': path.resolve(__dirname, './src/lib'),
			'@hooks': path.resolve(__dirname, './src/hooks'),
			'@context': path.resolve(__dirname, './src/context'),
			'@ui': path.resolve(__dirname, './src/components/ui'),
			'@components': path.resolve(__dirname, './src/components'),
			'@icons': path.resolve(__dirname, './src/components/ui/icons'),
		},
	},

	// Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
	//
	// 1. prevent vite from obscuring rust errors
	clearScreen: false,
	// 2. tauri expects a fixed port, fail if that port is not available
	server: {
		port: 1420,
		strictPort: true,
		host: host || false,
		hmr:
			host ?
				{
					protocol: 'ws',
					host,
					port: 1421,
				}
			:	undefined,
		watch: {
			// 3. tell vite to ignore watching `src-tauri`
			ignored: ['**/src-tauri/**'],
		},
	},
}));
