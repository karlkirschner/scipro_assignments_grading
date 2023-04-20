let fileName;

function processJSONFile() {
	const fileInput = document.getElementById("fileselect");
	const submitButton = document.getElementById("submitbutton");
	const filedrag = document.getElementById("filedrag");

	submitButton.addEventListener("click", function(event) {
		event.preventDefault();
		fileName = fileInput.files[0].name;
		processFile(fileInput.files[0]);
	});

	filedrag.addEventListener("dragover", function(event) {
		event.preventDefault();
	});

	filedrag.addEventListener("drop", function(event) {

		event.preventDefault();
		fileName = event.dataTransfer.files[0].name;
		processFile(event.dataTransfer.files[0]);
	});

	function processFile(file) {
		if (!file) {
			alert("No File selected.");
			return;
		}

		updateStatusMessage("Current File: " + file.name);
		const reader = new FileReader();
		reader.onload = function() {
			try {
				const parsedData = JSON.parse(reader.result);
				const points = document.getElementsByClassName("point");
				for(const point of points){
					point.value = parseFloat(point.getAttribute("max"));
				}
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
				alert("Error processing the file.");
			}
		};
		clearSelectedFile();
		resetJson()
		reader.readAsText(file);
	}
}

function clearSelectedFile() {
	const fileInput = document.getElementById("fileselect");
	fileInput.value = "";
	document.getElementById("filedrag").style.backgroundColor = "";
}

function updateStatusMessage(text) {
	document.querySelector("#messages p").innerText = text;
}

function readName() {
	event.preventDefault();
	var name = document.getElementById("name").value;
	document.getElementById("output").innerHTML = "\nEvaluation for: " + name;
	return name;
}

function clearForm() {
	event.preventDefault();
	document.getElementById("name").value = "";
	document.getElementById("output").innerHTML = "";
}

function getFileName() {
	return fileName;
}