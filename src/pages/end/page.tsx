import { Link } from 'atomic-router-react';
import * as React from 'react';
import { routes } from '@/shared/configs';

export const EndPage: React.FC = () => {
	return <Link to={routes.start}>On start page</Link>;
};
