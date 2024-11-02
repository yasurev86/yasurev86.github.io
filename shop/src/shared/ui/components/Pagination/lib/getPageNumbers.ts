export const getPageNumbers = (totalPages: number, center: number) => {
	const pageNumbers = [];
	const maxPages = 5;
	let startPage = 1;
	let endPage = totalPages;

	if (totalPages > maxPages) {
		const offset = Math.floor(maxPages / 2);
		startPage = Math.max(center - offset, 1);
		endPage = startPage + maxPages - 1;
		if (endPage > totalPages) {
			endPage = totalPages;
			startPage = endPage - maxPages + 1;
		}
	}

	for (let i = startPage; i <= endPage; i++) {
		pageNumbers.push(i);
	}

	return pageNumbers;
};
