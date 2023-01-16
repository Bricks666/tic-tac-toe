export const cellIsFilled = (
	cell: number | null | undefined
): cell is number => {
	return cell !== undefined && cell !== null;
};
