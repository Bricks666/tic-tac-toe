export const sum = <T extends number | null>(
	array: Array<T>,
	startValue = 0
): number => {
	return array.reduce((acc, value) => acc + Number(value), startValue);
};
