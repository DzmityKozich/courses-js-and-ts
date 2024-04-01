export function jsonConverter(incomeValue: string): string {
	return incomeValue.replace(/'/g, '"');
}

export function transformJson(item: any): string {
	return JSON.stringify(item).replace(/"/g, "'");
}
