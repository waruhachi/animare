import { cn } from '@lib/utils';

import * as React from 'react';

export function Titlebar({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-tauri-drag-region
			className={cn('h-8 absolute inset-x-0 z-50', className)}
			{...props}
		></div>
	);
}
