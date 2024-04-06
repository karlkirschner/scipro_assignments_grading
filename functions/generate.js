function generateBody() {
	if (mode === "grader"){
		document.getElementById("side-table").style.display = "block";
		document.body.appendChild(generateSelector(getBranches()));
	}
	document.body.appendChild(generateButton("Reset", () => reset(), ["button", "reset-button"]));
	document.body.appendChild(generateTemplate(generalCriteria));
	document.body.appendChild(generateTabs());

	const buttonBox = generateContainer("button-box", ["button-container"]);
	buttonBox.appendChild(generateButton("Generate", () => displayEvaluationText(), ["button", "generate-button"]));
	buttonBox.appendChild(generateButton("Save Session", () => save(), ["button", "save-button"]));
	buttonBox.appendChild(generateButton("Download JSON File", () => saveToJson(), ["button", "url-button"]));
	buttonBox.appendChild(generateButton("Download TEXT File", () => saveToTxt(), ["button", "txt-button"]));
	document.body.appendChild(buttonBox);

	const evaluationTextBox = generateTextArea("evaluation-textbox", ["evaluation-textbox"]);
	document.body.appendChild(evaluationTextBox);

    loadJson();
	load();
}

function generateTabs() {
	const assignmentSpecificContainer = document.createElement("div");
	const assignmentSpecificCriteriasContainer = document.createElement("div");
	const tabsButtonContainer = generateContainer("", ["tab-container"]);
	const tabsContent = generateContainer("");

	function toogleTab(id) {
		selectedTabContent = document.getElementById(id + "-content");
		selectedButton = document.getElementById(id);

		buttons = document.querySelectorAll(".tab");
		tabContents = document.querySelectorAll(".tab-content");

		for (const tabContent of tabContents) {
			tabContent.style.display = "none";
			tabContent.classList.remove("active");
		}

		for (const button of buttons) {
			button.classList.remove("active");
		}

		if (!selectedButton.classList.contains("active")) {
			selectedTabContent.style.display = "block";
			selectedButton.classList.add("active");
		}
	}

	for (const assignmentSpecificObject of assignmentSpecificCriterias) {
		// Generate tab buttons to switch context
		const id = "assignmentSpecificCriteria" + assignmentSpecificObject["id"];
		const assignmentTabButton = generateButton(assignmentSpecificObject["title"], () => toogleTab(id), ["tab"], id);
		tabsButtonContainer.appendChild(assignmentTabButton);
		assignmentSpecificContainer.appendChild(tabsButtonContainer);

		// Generate grading template for each assignment specific task
		const assignmentSpecificContent = generateTemplate(assignmentSpecificObject["content"]);
		assignmentSpecificContent.id = id + "-content";
		assignmentSpecificContent.classList.add("tab-content");
		assignmentSpecificContent.style.display = "none";
		assignmentSpecificCriteriasContainer.appendChild(assignmentSpecificContent);
	}
	assignmentSpecificContainer.appendChild(assignmentSpecificCriteriasContainer);
	return assignmentSpecificContainer;
}

function generateTemplate(data) {
	const gradingTemplate = document.createElement("div");

	for (const category in data) {
		const categoryContainer = generateContainer(category + "-category-container", ["category-container"])
		categoryContainer.appendChild(generateTitle(data[category]["title"], ["category-title"]));

		for (const criteria of ["positive", "neutral", "negative"]) {
			if (Object.keys(data[category]).includes(criteria)) {
				const criteriaContainer = generateContainer(category + "-" + criteria + "-container")
				const criteriaTitle = criteria[0].toUpperCase() + criteria.slice(1) + ":"
				criteriaContainer.appendChild(generateTitle(criteriaTitle, [criteria + "-title"]));

				for (const bulletPointObject of data[category][criteria]) {
					const bulletPointContainer = generateContainer(category + "-" + criteria + "-" + bulletPointObject["mainPoint"])
					bulletPointContainer.appendChild(generateTitle(bulletPointObject["mainPoint"], ["mainPoint-title"]));

					const subPointList = document.createElement("ul");
					bulletPointContainer.appendChild(subPointList);

					for (const subPoint of bulletPointObject["subPoints"]) {
						const subPointElement = generateSubPointElement(category + "-" + criteria + "-" + bulletPointObject["mainPoint"] + "-" + subPoint, subPoint, category, criteria, bulletPointObject["mainPoint"])

						subPointList.appendChild(subPointElement);
					}

					criteriaContainer.appendChild(bulletPointContainer);
				}

				categoryContainer.appendChild(criteriaContainer);
			}
		}

		if (data[category]["additionalNotes"]) {
			categoryContainer.appendChild(generateTitle("Additional Notes:", ["additional-text-title"]))
			categoryContainer.appendChild(generateTextArea(category + "-textarea", ["textarea-notes"]))
		}
		gradingTemplate.appendChild(categoryContainer);
	}
	return gradingTemplate;
}

function generateButton(label, clickFunction, classList = [], id = "") {
	/**
	 * Generates button given a label, a function and classes.
	 * @param {string} label - The text to be displayed on the button
	 * @param {function} clickFunction - The function to be executed after clicked.
	 * @param {string[]} classList - A list of strings containing the class names
	 * @return {button} button - A button.
	 */
	const button = document.createElement("button");
	button.id = id;
	button.innerText = label;
	button.onclick = clickFunction;
	button.classList.add(...classList);

	return button;
}

function generateTitle(title, classList = []) {
	const titleElement = document.createElement("p");
	titleElement.innerText = title;
	titleElement.classList.add(...classList)
	return titleElement;
}

function generateContainer(id, classList = []) {
	const container = document.createElement("div");
	container.id = id
	container.classList.add(...classList);
	return container;
}

function generateSubPointElement(id, label, category, criteria, mainPoint) {
	const subPointElement = document.createElement("li");

	const checkBoxLabel = document.createElement("label");
	checkBoxLabel.htmlFor = id;
	checkBoxLabel.innerText = label;

	const checkBox = document.createElement("input");
	checkBox.type = "checkbox";
	checkBox.setAttribute("category", category);
	checkBox.setAttribute("criteria", criteria);
	checkBox.setAttribute("mainPoint", mainPoint);
	checkBox.value = label;
	checkBox.id = id;

	subPointElement.appendChild(checkBox);
	subPointElement.appendChild(checkBoxLabel);

	if (label.endsWith(":") || label.endsWith(": ")) {
		subPointElement.appendChild(generateTextArea(id + "-textarea", ["subpoint-textbox"]))
	}
	return subPointElement;
}

function generateTextArea(id, classList = []) {
	const textArea = document.createElement("textarea");
	textArea.id = id;
	textArea.type = "text";
	textArea.classList.add(...classList);
	return textArea;
}

function maskAttribute(attributes, searchValues) {
	let mask = 'input[type="checkbox"]:checked';
	for (const index in attributes) {
		mask += '[' + attributes[index] + '="' + searchValues[index] + '"]';
	}
	return mask;
}

function multiLineIndent(text, indentation) {
	let newText = "";
	for (const line of text.split("\n")) {
		newText += indentation + line + "\n";
	}
	return newText;
}

function generateEvaluationText(data, previousText = "") {
	let text = previousText;

	for (const category in data) {
		const filterByCategory = document.querySelectorAll(maskAttribute(["category"], [category]));
		if (filterByCategory.length > 0) {
			text += "\n\n" + data[category]["title"] + ":\n";

			for (criteria of ["positive", "neutral", "negative"]) {
				if (Object.keys(data[category]).includes(criteria)) {
					const filterByCriteria = document.querySelectorAll(maskAttribute(["category", "criteria"], [category, criteria]));
					if (filterByCriteria.length > 0) {
						text += "\n" + criteria[0].toUpperCase() + criteria.slice(1) + ":\n";

						for (const bulletPointObject of data[category][criteria]) {
							const filterByMainPoint = document.querySelectorAll(maskAttribute(["category", "criteria", "mainpoint"], [category, criteria, bulletPointObject["mainPoint"]]))
							if (filterByMainPoint.length > 0) {
								if (bulletPointObject["mainPoint"].length > 0) {
									text += "•  " + bulletPointObject["mainPoint"] + ":\n";
								}
								for (const subPoint of filterByMainPoint) {
									text += "      - " + subPoint.value + "\n";
									if (subPoint.value.endsWith(":") || subPoint.value.endsWith(": ")) {
										const subPointComment = document.getElementById(category + "-" + criteria + "-" + bulletPointObject["mainPoint"] + "-" + subPoint.value + "-textarea");
										if (subPointComment.value.length > 0) {
											text += multiLineIndent(subPointComment.value, "          ");
										}
									}
								}
							}
						}
					}
				}
			}
		}
		const categoryNoteArea = document.getElementById(category + "-textarea");
		if (categoryNoteArea.value.length > 0) {
			text += "\nAdditional Notes: \n";
			text += multiLineIndent(categoryNoteArea.value, "  ");
		}
	}
	return text;
}

function displayEvaluationText() {
	const evaluationTextField = document.getElementById("evaluation-textbox");
	let generalCriteriaEvaluation = generateEvaluationText(generalCriteria);
	if (generalCriteriaEvaluation.length > 0) {
		generalCriteriaEvaluation = " General Feedback \n" + generalCriteriaEvaluation;
	}

	let assignmentSpecificEvaluation = "";

	for (const assignment of assignmentSpecificCriterias) {
		assignmentSpecificEvaluation += generateEvaluationText(assignment["content"]);
	}

	if (generalCriteriaEvaluation.length > 0 && assignmentSpecificEvaluation.length > 0) {
		assignmentSpecificEvaluation = "\n\n Assignment Specific Feedback \n" + assignmentSpecificEvaluation;
	} else if (assignmentSpecificEvaluation.length > 0) {
		assignmentSpecificEvaluation = " Assignment Specific Feedback \n" + assignmentSpecificEvaluation;
	}

	evaluationTextField.value = generalCriteriaEvaluation + assignmentSpecificEvaluation;

	return evaluationTextField.value;
}
