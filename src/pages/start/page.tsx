import { Link } from 'atomic-router-react';
import * as React from 'react';
import { routes } from '@/shared/configs';

export const StartPage: React.FC = () => {
	return <Link to={routes.game}>Start game</Link>;
};
