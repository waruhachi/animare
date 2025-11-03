import './App.css';

import { Reactjs } from '@icons/reactjs';
import { ShadcnUi } from '@icons/shadcnUi';
import { Tailwindcss } from '@icons/tailwindcss';
import { Tauri } from '@icons/tauri';
import { Vitejs } from '@icons/vitejs';

import { AnimatedThemeToggler } from '@ui/animated-theme-toggler';
import { Button } from '@ui/button';
import { Input } from '@ui/input';

import { invoke } from '@tauri-apps/api/core';

import { useState } from 'react';

function App() {
	const [name, setName] = useState('');
	const [greetMsg, setGreetMsg] = useState('');

	async function greet() {
		if (!name.trim()) return;
		setGreetMsg(await invoke('greet', { name }));
		setName('');
	}

	return (
		<>
			<div
				data-tauri-drag-region
				className='fixed top-0 left-0 right-0 h-10 z-40 flex items-center justify-center select-none text-foreground text-sm font-medium'
			>
				Animare
			</div>
			<main className='bg-background flex min-h-screen flex-col items-center justify-center px-6 pt-10 text-center'>
				<h1 className='text-foreground mb-6 text-3xl font-semibold'>
					Welcome to Tauri + React + TailwindCSS + shadcn/ui
				</h1>

				<div className='mb-4 flex justify-center gap-6'>
					<a
						href='https://vitejs.dev'
						target='_blank'
						rel='noreferrer'
					>
						<Vitejs className='h-24 p-6 transition-[filter] duration-700 will-change-[filter] hover:drop-shadow-[0_0_2em_#747bff]' />
					</a>
					<a
						href='https://tauri.app'
						target='_blank'
						rel='noreferrer'
					>
						<Tauri className='h-24 p-6 transition-[filter] duration-700 will-change-[filter] hover:drop-shadow-[0_0_2em_#24c8db]' />
					</a>
					<a
						href='https://reactjs.org'
						target='_blank'
						rel='noreferrer'
					>
						<Reactjs className='h-24 p-6 transition-[filter] duration-700 will-change-[filter] hover:drop-shadow-[0_0_2em_#61dafb]' />
					</a>
					<a
						href='https://tailwindcss.com/'
						target='_blank'
						rel='noreferrer'
					>
						<Tailwindcss className='h-24 p-6 transition-[filter] duration-700 will-change-[filter] hover:drop-shadow-[0_0_2em_#06b6d4]' />
					</a>
					<a
						href='https://ui.shadcn.com/'
						target='_blank'
						rel='noreferrer'
					>
						<ShadcnUi className='h-24 p-6 text-foreground transition-[filter] duration-700 will-change-[filter] hover:drop-shadow-[0_0_2em_#61dafb]' />
					</a>
				</div>
				<form
					className='mb-4 flex items-center justify-center gap-2'
					onSubmit={(e) => {
						e.preventDefault();
						greet();
					}}
				>
					<Input
						id='greet-input'
						value={name}
						onChange={(e) => setName(e.currentTarget.value)}
						placeholder='Enter a name...'
					/>
					<Button type='submit'>Greet</Button>
				</form>
				<p className='text-muted-foreground text-sm min-h-5 pt-2'>
					{greetMsg}
				</p>
				<div className='fixed top-10 right-4 z-30'>
					<AnimatedThemeToggler />
				</div>
			</main>
		</>
	);
}

export default App;
