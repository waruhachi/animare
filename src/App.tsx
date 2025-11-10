import './App.css';

import { SidebarInset, SidebarTrigger } from '@ui/sidebar';

import { AppSidebar } from '@components/app-sidebar';
import { Titlebar } from '@components/titlebar';

import { SidebarProvider } from '@provider/sidebar-provider';
import { Separator } from '@radix-ui/react-dropdown-menu';

function App() {
	return (
		<>
			<Titlebar />
			<SidebarProvider>
				<AppSidebar className='pt-8' />
				<SidebarInset className='mr-3! my-3!'>
					<header className='flex h-16 shrink-0 items-center gap-2'>
						<div className='flex items-center gap-2 px-4'>
							<SidebarTrigger className='-ml-1' />
							<Separator className='mr-2 data-[orientation=vertical]:h-4' />
						</div>
					</header>
				</SidebarInset>
			</SidebarProvider>
		</>
	);
}

export default App;
