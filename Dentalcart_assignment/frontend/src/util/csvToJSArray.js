const csvToJSArray = (csv) => {
	const rows = csv.trim().split("\n");

	// Extract headers and remove duplicates
	const headers = [...new Set(rows.shift().trim().toLowerCase().split(","))];

	// Convert each row to an object with lowercase keys and remove duplicates
	const data = rows.reduce((acc, row) => {
		const values = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
		const obj = headers.reduce((o, key, i) => {
			const value =
				i === 1
					? Number(values[i])
					: i === 5
					? values[i].slice(0, -1)
					: values[i].replace(/"/g, "");
			return { ...o, [key]: value };
		}, {});
		if (!acc.some((item) => item.name === obj.name)) {
			acc.push(obj);
		}
		return acc;
	}, []);

	return data;
};

export default csvToJSArray;
