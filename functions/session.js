function save() {
	window.localStorage.clear();

	// Save grading table
	const points = document.getElementsByClassName("point");
	for(const point of points){
		if (point.value < parseFloat(point.getAttribute("max"))){
			localStorage.setItem(point.id, point.value);
		}
	}

	// Save checkboxes
	const allInputs = document.querySelectorAll('input[type="checkbox"]:checked');
	for (const input of allInputs) {
		localStorage.setItem(input.id, "checked");
	}

	// Save textfields
	const allTextNotes = document.getElementsByTagName("textarea");
	for (const textNote of allTextNotes) {
		if (textNote.value.length > 0)
			localStorage.setItem(textNote.id, textNote.value);
	}
	alert("Saved successfully");
}

function load() {
	// Reset grading table before applying saved changes
	const points = document.getElementsByClassName("point");

	for(const point of points){
		console.log(point.value)
		point.value = parseFloat(point.getAttribute("max"))
	}
	try {
		for (var i = 0, len = localStorage.length; i < len; ++i) {
			const key = localStorage.key(i);
			const element = document.getElementById(key);
			if (element.type === "checkbox") {
				element.checked = true;
			} else {
				element.value = localStorage.getItem(key);
			}
		}
	} catch (error) {
		alert("An error occured while loading from save. The template have been probably updated during the meantime. To fix click on the Reset button");
	}
}

function reset() {
	localStorage.clear();
	// Delete json file
	updateStatusMessage("No file loaded");
	// Delete Name
	clearForm()
	// Reset grading table
	const points = document.getElementsByClassName("point");
	for(const point of points){
		const max = parseFloat(point.getAttribute("max"));
		updatePercentage(max, point.id);
	}

	// Reset checkbox
	const allInputs = document.querySelectorAll('input[type="checkbox"]:checked');

	for (const input of allInputs) {
		input.checked = false;
	}

	// Reset textboxes
	const allTextNotes = document.getElementsByTagName("textarea");

	for (const textNote of allTextNotes) {
		textNote.value = "";
	}

	// Reset Browsed JSON file
	clearSelectedFile();

}

function resetJson() {
	localStorage.clear();
	// Delete Name
	clearForm()
	// Reset grading table
	const points = document.getElementsByClassName("point");
	for(const point of points){
		const max = parseFloat(point.getAttribute("max"));
		updatePercentage(max, point.id);
	}

	// Reset checkbox
	const allInputs = document.querySelectorAll('input[type="checkbox"]:checked');

	for (const input of allInputs) {
		input.checked = false;
	}

	// Reset textboxes
	const allTextNotes = document.getElementsByTagName("textarea");

	for (const textNote of allTextNotes) {
		textNote.value = "";
	}

}

function saveToJson() {
	const data = {};

	// Save grading table
	const points = document.getElementsByClassName("point");
	for (const point of points) {
		if (point.value < parseFloat(point.getAttribute("max"))) {
			data[point.id] = point.value;
		}
	}

	// Save checkboxes
	const allInputs = document.querySelectorAll('input[type="checkbox"]:checked');
	for (const input of allInputs) {
		data[input.id] = "checked";
	}

	// // Save textfields
	const allTextNotes = document.getElementsByTagName("textarea");
	for (const textNote of allTextNotes) {
		if (textNote.value.length > 0) {
			data[textNote.id] = textNote.value;
		}
	}

	// Encode data as a URL
	const jsonData = JSON.stringify(data);

	// Get name from readName function
	const name = readName() || "default";

	// To JSON File
	const downloadLink = document.createElement("a");
	downloadLink.href = "data:json/txt;charset=utf-8," + encodeURIComponent(jsonData)  ;
	downloadLink.download = `${name}.json`;
	downloadLink.click();

	// URL
	// const encodedData = btoa(jsonData); //encodeURIComponent
	// // const compressedData = pako.deflate(jsonData, { to: 'string' });
	// //const encodedData = base64Encode(jsonData);
	// const link = `${location.origin}${location.pathname}?data=${encodedData}`;
	// // Show link to user
	// alert(`Saved successfully. URL: \n\n${link}`);
}

function loadJson() {
	const points = document.getElementsByClassName("point");
	for (const point of points) {
		point.value = parseFloat(point.getAttribute("max"));
	}
	const urlParams = new URLSearchParams(window.location.search);
	const encodedData = urlParams.get("data");
	console.log("encoded load", encodedData);
	if (!encodedData) {
		// No encoded data in URL, trying to load from local storage
		try {
			for (let i = 0, len = localStorage.length; i < len; ++i) {
				const key = localStorage.key(i);
				const element = document.getElementById(key);
				if (element.type === "checkbox") {
					element.checked = true;
				} else {
					element.value = localStorage.getItem(key);
				}
			}
		} catch (error) {
			alert("An error occured while loading from save. The template have been probably updated during the meantime. To fix click on the Reset button");
		}
		return;
	}

	try {
		const decodedData = atob(encodedData); //decodeURIComponent
		console.log("decoded load", decodedData)

		//const decompressedData = pako.inflate(decodedData, {to: 'string'});
		const parsedData = JSON.parse(decodedData);

		//console.log("parsed load", parsedData)
		for (const key in parsedData) {
			const element = document.getElementById(key);
			const value = parsedData[key];
			if (element.type === "checkbox") {
				element.checked = value === "checked";
			} else {
				element.value = value;
			}
		}
	} catch (error) {
		alert("An error occured while loading from URL. The template have been probably updated during the meantime. To fix click on the Reset button");
	}
}

function toTxt(){
	let tableData = getTableData();
	// Save Textfield
	const evaluationTextField = displayEvaluationText()
	let txt = "";

	txt += "Evaluation: " + evaluationTextField
	txt += "\nGrading table: \n\n" + formatTable(tableData)
	let nameTextfiel = readName()
	let fileN = getFileName()
	let fileName = "data";

	if (fileN) {fileName = fileN}
	if (nameTextfiel) {fileName = nameTextfiel}
	//  const fileInput = document.getElementById("fileselect");
	//  const fileName = fileN ? fileN:  "data.txt";  //fileInput.files[0] ? fileInput.files[0].name :

	// Check if the file has a .json extension
	const hasJsonExtension = fileName.endsWith(".json");
	// Change the file name to the name of the JSON file if it has a .json extension
	const txtFileName = hasJsonExtension ? fileName.replace(".json", ".txt") : fileName +".txt";

	// Create a download link and trigger a download
	const downloadLink = document.createElement("a");
	downloadLink.href = "data:text/txt;charset=utf-8," + encodeURIComponent(txt);
	downloadLink.download = txtFileName;
	downloadLink.click();
}