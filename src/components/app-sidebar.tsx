import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@ui/sidebar';

import AniListLoginButton from '@components/anilist-login';
import { NavMain } from '@components/nav-main';
import { NavProjects } from '@components/nav-projects';
import { NavUser } from '@components/nav-user';
import { Button } from '@components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@components/ui/dialog';
import { Input } from '@components/ui/input';

import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';

import {
	BookOpen,
	Bot,
	CalendarIcon,
	Command,
	Frame,
	LifeBuoy,
	Map,
	PieChart,
	Send,
	Settings2,
	SquareTerminal,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import * as React from 'react';

const pages = [
	{ name: 'Home', url: '#', icon: Command },
	{ name: 'Browser', url: '#', icon: Bot },
	{ name: 'My List', url: '#', icon: Frame },
	{ name: 'Schedule', url: '#', icon: CalendarIcon },
];

const data = {
	user: {
		name: 'shadcn',
		email: 'm@example.com',
		avatar: '/avatars/shadcn.jpg',
	},
	navMain: [
		{
			title: 'Playground',
			url: '#',
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: 'History',
					url: '#',
				},
				{
					title: 'Starred',
					url: '#',
				},
				{
					title: 'Settings',
					url: '#',
				},
			],
		},
		{
			title: 'Models',
			url: '#',
			icon: Bot,
			items: [
				{
					title: 'Genesis',
					url: '#',
				},
				{
					title: 'Explorer',
					url: '#',
				},
				{
					title: 'Quantum',
					url: '#',
				},
			],
		},
		{
			title: 'Documentation',
			url: '#',
			icon: BookOpen,
			items: [
				{
					title: 'Introduction',
					url: '#',
				},
				{
					title: 'Get Started',
					url: '#',
				},
				{
					title: 'Tutorials',
					url: '#',
				},
				{
					title: 'Changelog',
					url: '#',
				},
			],
		},
		{
			title: 'Settings',
			url: '#',
			icon: Settings2,
			items: [
				{
					title: 'General',
					url: '#',
				},
				{
					title: 'Team',
					url: '#',
				},
				{
					title: 'Billing',
					url: '#',
				},
				{
					title: 'Limits',
					url: '#',
				},
			],
		},
	],
	navSecondary: [
		{
			title: 'Support',
			url: '#',
			icon: LifeBuoy,
		},
		{
			title: 'Feedback',
			url: '#',
			icon: Send,
		},
	],
	projects: [
		{
			name: 'Design Engineering',
			url: '#',
			icon: Frame,
		},
		{
			name: 'Sales & Marketing',
			url: '#',
			icon: PieChart,
		},
		{
			name: 'Travel',
			url: '#',
			icon: Map,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
	const [devCode, setDevCode] = useState('');
	const [isDevDialogOpen, setDevDialogOpen] = useState(false);
	const isDevMode = import.meta.env.DEV;

	const checkStatus = useCallback(async () => {
		try {
			const status: boolean = await invoke('get_anilist_login_status');
			setLoggedIn(status);
		} catch {
			setLoggedIn(false);
		}
	}, []);

	useEffect(() => {
		checkStatus();

		let cancelled = false;
		let unlisten: (() => void) | undefined = undefined;

		listen('auth-changed', () => {
			if (!cancelled) {
				checkStatus();
			}
		})
			.then((u) => {
				if (!cancelled) {
					unlisten = u;
				}
			})
			.catch((e) => {
				console.error('Failed to set up auth-changed listener:', e);
			});

		return () => {
			cancelled = true;
			if (unlisten) {
				unlisten();
			}
		};
	}, [checkStatus]);

	const handleLogout = useCallback(async () => {
		try {
			await invoke('clear_anilist_access_token');
		} catch (error) {
			console.error('Logout failed:', error);
		}
	}, []);

	const handleDevDialogCancel = useCallback(() => {
		setDevDialogOpen(false);
		setDevCode('');
	}, []);

	const handleDevTokenSave = useCallback(async () => {
		const trimmed = devCode.trim();
		if (!trimmed) {
			return;
		}

		try {
			await invoke('set_anilist_access_token', { token: trimmed });
			setDevDialogOpen(false);
			setDevCode('');
		} catch (error) {
			console.error('Failed to save AniList token manually:', error);
		}
	}, [devCode]);

	const handleLoginClick = useCallback(async () => {
		try {
			await invoke('anilist_start_login');
			if (isDevMode) {
				setDevDialogOpen(true);
			}
		} catch (error) {
			console.error('Login failed:', error);
		}
	}, [isDevMode]);

	return (
		<>
			<Sidebar
				collapsible='icon'
				variant='inset'
				{...props}
			>
				<SidebarHeader>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton
								size='lg'
								asChild
							>
								<a href='#'>
									<div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
										<Command className='size-4' />
									</div>
									<div className='grid flex-1 text-left text-sm leading-tight'>
										<span className='truncate font-medium'>
											Acme Inc
										</span>
										<span className='truncate text-xs'>
											Enterprise
										</span>
									</div>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>
				<SidebarContent>
					<NavProjects projects={pages} />
					<NavMain items={data.navMain} />
					{/* <NavSecondary
					items={data.navSecondary}
					className='mt-auto'
				/> */}
				</SidebarContent>
				<SidebarFooter>
					{loggedIn === null ?
						<div className='h-12 w-full animate-pulse rounded-xl bg-muted' />
					: loggedIn ?
						<NavUser
							user={data.user}
							onLogout={handleLogout}
						/>
					:	<AniListLoginButton onLoginClick={handleLoginClick} />}
				</SidebarFooter>
			</Sidebar>
			{isDevMode && (
				<Dialog
					open={isDevDialogOpen}
					onOpenChange={(open) => {
						setDevDialogOpen(open);
						if (!open) {
							setDevCode('');
						}
					}}
				>
					<DialogContent className='space-y-4 w-80'>
						<DialogHeader>
							<DialogTitle>
								Enter AniList access token
							</DialogTitle>
							<DialogDescription>
								Paste the token provided by AniList so the app
								can store it during development.
							</DialogDescription>
						</DialogHeader>
						<Input
							type='password'
							value={devCode}
							onChange={(event) => setDevCode(event.target.value)}
							placeholder='Paste access token here'
						/>
						<DialogFooter className='flex justify-end gap-2'>
							<Button
								variant='outline'
								onClick={handleDevDialogCancel}
							>
								Cancel
							</Button>
							<Button onClick={handleDevTokenSave}>
								Save token
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}
		</>
	);
}
