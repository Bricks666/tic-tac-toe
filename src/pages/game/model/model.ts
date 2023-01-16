import { createEvent, sample } from 'effector';
import { fieldModel, Position } from '@/entities/field';
import { gameModel } from '@/entities/game';

export const cellClicked = createEvent<Position>();

sample({
	clock: cellClicked,
	source: gameModel.$currentPlayer,
	fn: (currentPlayer, position) => ({ badge: currentPlayer, position, }),
	target: fieldModel.cellClicked,
});

sample({
	clock: fieldModel.badgeSet,
	target: gameModel.nextPlayer,
});

fieldModel.generateRowsFx({ size: 10, });
