import { createHistoryRouter } from 'atomic-router';
import { RouterProvider } from 'atomic-router-react';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import { routes } from '@/shared/configs';

const router = createHistoryRouter({
	routes: [
		{
			path: '/',
			route: routes.start,
		},
		{
			path: '/game',
			route: routes.game,
		},
		{
			path: '/end',
			route: routes.end,
		}
	],
});

const history = createBrowserHistory();

router.setHistory(history);

export const withRouter = (
	Component: React.ComponentType
): React.ComponentType => {
	return (props) => {
		return (
			<RouterProvider router={router}>
				<Component {...props} />
			</RouterProvider>
		);
	};
};
