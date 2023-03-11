import csvToJSArray from "../util/csvToJSArray";

const readCSVFile = (file) => {
	return new Promise((resolve) => {
		var reader = new FileReader();
		reader.onload = () => {
			var jsArray = csvToJSArray(reader.result);
			if (jsArray) {
				resolve(jsArray);
			}
		};
		reader.readAsText(file);
	});
};

export default readCSVFile;
