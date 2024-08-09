const tableCellWrapper = function (bodyCellLabel) {
	const ctx = this;
	return function (param) {
		const { item, onCellClick, ...rest } = param;
		const createdContext = {
			id: ctx?.id,
			accessKey: ctx?.accessKey,
			item,
			onCellClick: () => onCellClick?.(createdContext),
			rest,
		};

		return bodyCellLabel?.call(ctx, createdContext);
	};
};

export { tableCellWrapper };
