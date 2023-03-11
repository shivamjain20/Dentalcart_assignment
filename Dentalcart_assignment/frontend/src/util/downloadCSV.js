const downloadCsvFromJson = (jsonData, filename) => {
	var data = jsonData;

	// Create a CSV string
	var csv = "";
	var headers = Object.keys(data[0]).slice(1);
	csv += headers.join(",") + "\n";
	data.forEach(function (item) {
		var row = [];
		headers.forEach(function (header) {
			if (header === headers[2]) {
				row.push('"' + item[header] + '"');
			} else {
				row.push(item[header]);
			}
		});
		csv += row.join(",") + "\n";
	});

	var downloadLink = document.createElement("a");
	downloadLink.setAttribute(
		"href",
		"data:text/csv;charset=utf-8," + encodeURIComponent(csv)
	);
	downloadLink.setAttribute("download", filename + ".csv");
	downloadLink.click();
};

export default downloadCsvFromJson;
