// import {
// 	Collapsible,
// 	CollapsibleContent,
// 	CollapsibleTrigger,
// } from '@ui/collapsible';
// import {
// 	SidebarGroup,
// 	SidebarGroupLabel,
// 	SidebarMenu,
// 	SidebarMenuAction,
// 	SidebarMenuButton,
// 	SidebarMenuItem,
// 	SidebarMenuSub,
// 	SidebarMenuSubButton,
// 	SidebarMenuSubItem,
// } from '@ui/sidebar';

// import { ChevronRight, type LucideIcon } from 'lucide-react';

// export function NavMain({
// 	items,
// }: {
// 	items: {
// 		title: string;
// 		url: string;
// 		icon: LucideIcon;
// 		isActive?: boolean;
// 		items?: {
// 			title: string;
// 			url: string;
// 		}[];
// 	}[];
// }) {
// 	return (
// 		<SidebarGroup>
// 			<SidebarGroupLabel>Platform</SidebarGroupLabel>
// 			<SidebarMenu>
// 				{items.map((item) => (
// 					<Collapsible
// 						key={item.title}
// 						asChild
// 						defaultOpen={item.isActive}
// 					>
// 						<SidebarMenuItem>
// 							<SidebarMenuButton
// 								asChild
// 								tooltip={item.title}
// 							>
// 								<a href={item.url}>
// 									<item.icon />
// 									<span>{item.title}</span>
// 								</a>
// 							</SidebarMenuButton>
// 							{item.items?.length ?
// 								<>
// 									<CollapsibleTrigger asChild>
// 										<SidebarMenuAction className='data-[state=open]:rotate-90'>
// 											<ChevronRight />
// 											<span className='sr-only'>
// 												Toggle
// 											</span>
// 										</SidebarMenuAction>
// 									</CollapsibleTrigger>
// 									<CollapsibleContent>
// 										<SidebarMenuSub>
// 											{item.items?.map((subItem) => (
// 												<SidebarMenuSubItem
// 													key={subItem.title}
// 												>
// 													<SidebarMenuSubButton
// 														asChild
// 													>
// 														<a href={subItem.url}>
// 															<span>
// 																{subItem.title}
// 															</span>
// 														</a>
// 													</SidebarMenuSubButton>
// 												</SidebarMenuSubItem>
// 											))}
// 										</SidebarMenuSub>
// 									</CollapsibleContent>
// 								</>
// 							:	null}
// 						</SidebarMenuItem>
// 					</Collapsible>
// 				))}
// 			</SidebarMenu>
// 		</SidebarGroup>
// 	);
// }

'use client';

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@ui/collapsible';
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from '@ui/sidebar';

import { ChevronRight, type LucideIcon } from 'lucide-react';

// import {
// 	Collapsible,
// 	CollapsibleContent,
// 	CollapsibleTrigger,
// } from '@ui/collapsible';
// import {
// 	SidebarGroup,
// 	SidebarGroupLabel,
// 	SidebarMenu,
// 	SidebarMenuAction,
// 	SidebarMenuButton,
// 	SidebarMenuItem,
// 	SidebarMenuSub,
// 	SidebarMenuSubButton,
// 	SidebarMenuSubItem,
// } from '@ui/sidebar';

// import { ChevronRight, type LucideIcon } from 'lucide-react';

// export function NavMain({
// 	items,
// }: {
// 	items: {
// 		title: string;
// 		url: string;
// 		icon: LucideIcon;
// 		isActive?: boolean;
// 		items?: {
// 			title: string;
// 			url: string;
// 		}[];
// 	}[];
// }) {
// 	return (
// 		<SidebarGroup>
// 			<SidebarGroupLabel>Platform</SidebarGroupLabel>
// 			<SidebarMenu>
// 				{items.map((item) => (
// 					<Collapsible
// 						key={item.title}
// 						asChild
// 						defaultOpen={item.isActive}
// 					>
// 						<SidebarMenuItem>
// 							<SidebarMenuButton
// 								asChild
// 								tooltip={item.title}
// 							>
// 								<a href={item.url}>
// 									<item.icon />
// 									<span>{item.title}</span>
// 								</a>
// 							</SidebarMenuButton>
// 							{item.items?.length ?
// 								<>
// 									<CollapsibleTrigger asChild>
// 										<SidebarMenuAction className='data-[state=open]:rotate-90'>
// 											<ChevronRight />
// 											<span className='sr-only'>
// 												Toggle
// 											</span>
// 										</SidebarMenuAction>
// 									</CollapsibleTrigger>
// 									<CollapsibleContent>
// 										<SidebarMenuSub>
// 											{item.items?.map((subItem) => (
// 												<SidebarMenuSubItem
// 													key={subItem.title}
// 												>
// 													<SidebarMenuSubButton
// 														asChild
// 													>
// 														<a href={subItem.url}>
// 															<span>
// 																{subItem.title}
// 															</span>
// 														</a>
// 													</SidebarMenuSubButton>
// 												</SidebarMenuSubItem>
// 											))}
// 										</SidebarMenuSub>
// 									</CollapsibleContent>
// 								</>
// 							:	null}
// 						</SidebarMenuItem>
// 					</Collapsible>
// 				))}
// 			</SidebarMenu>
// 		</SidebarGroup>
// 	);
// }

// import {
// 	Collapsible,
// 	CollapsibleContent,
// 	CollapsibleTrigger,
// } from '@ui/collapsible';
// import {
// 	SidebarGroup,
// 	SidebarGroupLabel,
// 	SidebarMenu,
// 	SidebarMenuAction,
// 	SidebarMenuButton,
// 	SidebarMenuItem,
// 	SidebarMenuSub,
// 	SidebarMenuSubButton,
// 	SidebarMenuSubItem,
// } from '@ui/sidebar';

// import { ChevronRight, type LucideIcon } from 'lucide-react';

// export function NavMain({
// 	items,
// }: {
// 	items: {
// 		title: string;
// 		url: string;
// 		icon: LucideIcon;
// 		isActive?: boolean;
// 		items?: {
// 			title: string;
// 			url: string;
// 		}[];
// 	}[];
// }) {
// 	return (
// 		<SidebarGroup>
// 			<SidebarGroupLabel>Platform</SidebarGroupLabel>
// 			<SidebarMenu>
// 				{items.map((item) => (
// 					<Collapsible
// 						key={item.title}
// 						asChild
// 						defaultOpen={item.isActive}
// 					>
// 						<SidebarMenuItem>
// 							<SidebarMenuButton
// 								asChild
// 								tooltip={item.title}
// 							>
// 								<a href={item.url}>
// 									<item.icon />
// 									<span>{item.title}</span>
// 								</a>
// 							</SidebarMenuButton>
// 							{item.items?.length ?
// 								<>
// 									<CollapsibleTrigger asChild>
// 										<SidebarMenuAction className='data-[state=open]:rotate-90'>
// 											<ChevronRight />
// 											<span className='sr-only'>
// 												Toggle
// 											</span>
// 										</SidebarMenuAction>
// 									</CollapsibleTrigger>
// 									<CollapsibleContent>
// 										<SidebarMenuSub>
// 											{item.items?.map((subItem) => (
// 												<SidebarMenuSubItem
// 													key={subItem.title}
// 												>
// 													<SidebarMenuSubButton
// 														asChild
// 													>
// 														<a href={subItem.url}>
// 															<span>
// 																{subItem.title}
// 															</span>
// 														</a>
// 													</SidebarMenuSubButton>
// 												</SidebarMenuSubItem>
// 											))}
// 										</SidebarMenuSub>
// 									</CollapsibleContent>
// 								</>
// 							:	null}
// 						</SidebarMenuItem>
// 					</Collapsible>
// 				))}
// 			</SidebarMenu>
// 		</SidebarGroup>
// 	);
// }

export function NavMain({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon?: LucideIcon;
		isActive?: boolean;
		items?: {
			title: string;
			url: string;
		}[];
	}[];
}) {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Platform</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
					<Collapsible
						key={item.title}
						asChild
						defaultOpen={item.isActive}
						className='group/collapsible'
					>
						<SidebarMenuItem>
							<CollapsibleTrigger asChild>
								<SidebarMenuButton tooltip={item.title}>
									{item.icon && <item.icon />}
									<span>{item.title}</span>
									<ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
								</SidebarMenuButton>
							</CollapsibleTrigger>
							<CollapsibleContent>
								<SidebarMenuSub>
									{item.items?.map((subItem) => (
										<SidebarMenuSubItem key={subItem.title}>
											<SidebarMenuSubButton asChild>
												<a href={subItem.url}>
													<span>{subItem.title}</span>
												</a>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
									))}
								</SidebarMenuSub>
							</CollapsibleContent>
						</SidebarMenuItem>
					</Collapsible>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
