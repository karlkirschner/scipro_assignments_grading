function collectFormData() {
	const data = {};

	document.querySelectorAll(".point").forEach(point => {
		const pointValue = parseFloat(point.value);
		const maxValue = parseFloat(point.getAttribute("max"));
		if (pointValue < maxValue) {
			data[point.id] = pointValue.toString();
		}
	});

	document.querySelectorAll('input[type="checkbox"]:checked').forEach(input => {
		data[input.id] = "checked";
	});

	document.querySelectorAll("textarea").forEach(textNote => {
		if (textNote.value.length > 0) {
			data[textNote.id] = textNote.value;
		}
	});

	return data;
}

function save() {
	const data = collectFormData();
	window.localStorage.clear();
	let branch = localStorage.getItem("branch");
	let mode = localStorage.getItem("mode");

	if (branch !== null) {localStorage.setItem("branch", branch);}
	if (mode !== null){localStorage.setItem("mode", mode);}

	alert("Saved successfully");
}

function saveToJson() {
	const data = collectFormData();
	const jsonData = JSON.stringify(data);
	const name = readName() || "default";
	const downloadLink = document.createElement("a");
	downloadLink.href = "data:json/txt;charset=utf-8," + encodeURIComponent(jsonData)  ;
	downloadLink.download = `${name}.json`;
	downloadLink.click();
}

function saveToTxt(){
	let tableData = getTableData();
	const evaluationTextField = displayEvaluationText()
	let txt = "Evaluation: " + evaluationTextField
	if(mode === "grader"){
		txt += "\nGrading table: \n\n" + formatTable(tableData)
	}
	let fileName = readName() || getFileName() || "default";
	const hasJsonExtension = fileName.endsWith(".json");
	const txtFileName = hasJsonExtension ? fileName.replace(".json", ".txt") : fileName +".txt";
	const downloadLink = document.createElement("a");
	downloadLink.href = "data:text/txt;charset=utf-8," + encodeURIComponent(txt);
	downloadLink.download = txtFileName;
	downloadLink.click();
}

function load() {
	// Reset grading table before applying saved changes
	const points = document.getElementsByClassName("point");
	for(const point of points){
		point.value = parseFloat(point.getAttribute("max"))
	}

	try {
		for (var i = 0, len = localStorage.length; i < len; ++i) {
			const key = localStorage.key(i);
			if(["mode", "branch", "debug"].includes(key)){
				continue;
			}
			const element = document.getElementById(key);
			if (element.type === "checkbox") {
				element.checked = true;
			} else {
				element.value = localStorage.getItem(key);
			}
	}

		for (const point of points){
			if (localStorage.getItem(point.id) != null){
				updatePercentage(localStorage.getItem(point.id), point.id);
			}
		}

	} catch (error) {
		alert("An error occured while loading from save. The template have been probably updated during the meantime. To fix click on the Reset button");
	}
}

function loadJson() {
	const points = document.getElementsByClassName("point");
	for (const point of points) {
		point.value = parseFloat(point.getAttribute("max"));
	}
	const urlParams = new URLSearchParams(window.location.search);
	const encodedData = urlParams.get("data");
	if (!encodedData) {
		try {
			for (let i = 0, len = localStorage.length; i < len; ++i) {
				const key = localStorage.key(i);
				if(["branch", "mode", "debug"].includes(key)){
					continue;
				}
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
		const parsedData = JSON.parse(decodedData);

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

function reset() {
	let branch = localStorage.getItem("branch");
	let mode = localStorage.getItem("mode");
	localStorage.clear();
	updateStatusMessage("No file loaded");
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

	for (const textNote of allTextNotes) {textNote.value = "";}

	// Reset Browsed JSON file
	clearSelectedFile();

	if (branch !== null) {localStorage.setItem("branch", branch);}
	if (mode !== null){localStorage.setItem("mode", mode);}
}

function resetJson() {
	let branch = localStorage.getItem("branch");
	let mode = localStorage.getItem("mode");
	localStorage.clear();
	clearForm()
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

	if (branch !== null) {
		localStorage.setItem("branch", branch);
	}

	if (mode !== null){
		localStorage.setItem("mode", mode);
	}

}