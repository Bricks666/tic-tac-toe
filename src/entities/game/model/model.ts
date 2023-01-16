import { createEvent, createStore, sample } from 'effector';

export const $currentPlayer = createStore<number>(1);
const $playersCount = createStore<number>(2);
export const $winner = createStore<number | null>(null);

export const nextPlayer = createEvent();

sample({
	clock: nextPlayer,
	source: { current: $currentPlayer, count: $playersCount, },
	fn: ({ count, current, }) => (current % count) + 1,
	target: $currentPlayer,
});
