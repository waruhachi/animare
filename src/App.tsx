import './App.css';

import { SidebarInset, SidebarTrigger } from '@ui/sidebar';

import { AppBody } from '@components/app-body';
import { AppSidebar } from '@components/app-sidebar';
import { Titlebar } from '@components/titlebar';

import { SidebarProvider } from '@provider/sidebar-provider';

function App() {
	return (
		<>
			<Titlebar />
			<SidebarProvider>
				<AppSidebar className='pt-8' />
				<SidebarInset className='mr-3! my-3! relative'>
					<header className='absolute inset-x-0 top-0 z-10 flex h-16 items-center gap-2'>
						<div className='flex items-center gap-2 px-4'>
							<SidebarTrigger className='-ml-1' />
						</div>
					</header>
					<AppBody />
				</SidebarInset>
			</SidebarProvider>
		</>
	);
}

export default App;
