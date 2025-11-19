import { useAuth } from '@context/auth-context';

import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@ui/sidebar';
import { Skeleton } from '@ui/skeleton';

import {
	BadgeCheck,
	Bell,
	ChevronsUpDown,
	CreditCard,
	LogOut,
	Sparkles,
} from 'lucide-react';
import { User } from 'lucide-react';

export function NavUser() {
	const { isMobile } = useSidebar();
	const { viewer, isLoggedIn, isLoading, login, logout } = useAuth();

	if (isLoading) {
		return (
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton
						size='lg'
						disabled
					>
						<Skeleton className='h-8 w-8 rounded-lg' />
						<Skeleton className='h-4 w-20' />
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		);
	}

	if (!isLoggedIn) {
		return (
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton
						size='lg'
						onClick={login}
						className='justify-start'
					>
						<User className='h-4 w-4' />
						<span>Login with AniList</span>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		);
	}

	const initials = viewer!.name
		.split(' ')
		.map((n) => n[0])
		.join('')
		.toUpperCase()
		.slice(0, 2);

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size='lg'
							className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
						>
							<Avatar className='h-8 w-8 rounded-lg'>
								<AvatarImage
									src={viewer!.avatar.large}
									alt={viewer!.name}
								/>
								<AvatarFallback className='rounded-lg bg-muted text-muted-foreground'>
									{initials}
								</AvatarFallback>
							</Avatar>
							<div className='grid flex-1 text-left text-sm leading-tight'>
								<span className='truncate font-medium'>
									{viewer!.name}
								</span>
								<span className='truncate text-xs opacity-50'>
									AniList
								</span>
							</div>
							<ChevronsUpDown className='ml-auto size-4' />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
						side={isMobile ? 'bottom' : 'right'}
						align='end'
						sideOffset={4}
					>
						<DropdownMenuLabel className='p-0 font-normal'>
							<div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
								<Avatar className='h-8 w-8 rounded-lg'>
									<AvatarImage
										src={viewer!.avatar.large}
										alt={viewer!.name}
									/>
									<AvatarFallback className='rounded-lg'>
										{initials}
									</AvatarFallback>
								</Avatar>
								<div className='grid flex-1 text-left text-sm leading-tight'>
									<span className='truncate font-medium'>
										{viewer!.name}
									</span>
									<span className='truncate text-xs opacity-50'>
										AniList
									</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem onClick={() => {}}>
								<Sparkles className='mr-2 h-4 w-4' />
								<span>Upgrade to Pro</span>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem onClick={() => {}}>
								<BadgeCheck className='mr-2 h-4 w-4' />
								<span>Account</span>
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => {}}>
								<CreditCard className='mr-2 h-4 w-4' />
								<span>Billing</span>
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => {}}>
								<Bell className='mr-2 h-4 w-4' />
								<span>Notifications</span>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={logout}>
							<LogOut className='mr-2 h-4 w-4' />
							<span>Log out</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
