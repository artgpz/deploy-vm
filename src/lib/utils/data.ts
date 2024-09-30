export const sluggy = (v: string) =>
	v.toLowerCase().replaceAll(' ', '-').replaceAll('?', '').replaceAll('(', '').replaceAll(')', '')
