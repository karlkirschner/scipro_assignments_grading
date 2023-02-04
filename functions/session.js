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