// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(
	fn: T,
	delay: number
) {
	let timer: ReturnType<typeof setTimeout>;
	return (...args: Parameters<T>) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn(...args);
		}, delay);
	};
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounceAsync<T extends (...args: any[]) => Promise<any>>(
	fn: T,
	delay: number,
) {
	let timer: ReturnType<typeof setTimeout>;	
	return (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
		return new Promise((resolve) => {
			clearTimeout(timer);

			timer = setTimeout(async () => {
				const result = await fn(...args);
				resolve(result);
			}, delay);
		});
	};
}
