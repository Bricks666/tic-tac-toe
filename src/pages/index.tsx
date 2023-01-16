import { createRoutesView } from 'atomic-router-react';
import * as React from 'react';
import { routes } from '@/shared/configs';
import { EndPage } from './end';
import { GamePage } from './game';
import { StartPage } from './start';

const Views = createRoutesView({
	routes: [
		{
			route: routes.end,
			view: EndPage,
		},
		{
			route: routes.start,
			view: StartPage,
		},
		{
			route: routes.game,
			view: GamePage,
		}
	],
});

export const Pages: React.FC = () => {
	return <Views />;
};
