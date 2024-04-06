const debug = false;
var assignmentSpecificCriterias = [];
var master_template;
var mode;

var generalCriteria = {
	//Local testing:
	//    change `const debug = true` above
	//    copy-paste desired code to check locally below and reload HTML document
	"topic1": {
		"title": "Topic 1",
		"additionalNotes": true,
		"positive": [
			{
				"mainPoint": "1st positive feedback for topic 1",
				"subPoints": [
					"Subpoint 1",
					"Subpoint 2",
					"Subpoint 3"
				]
			},
			{
				"mainPoint": "2nd positive feedback for topic 1",
				"subPoints": [
					"Point 1"
				]
			}
		],
		"negative": [
			{
				"mainPoint": "1st negative feedback for topic 1",
				"subPoints": [
					"Subpoint 1",
					"Subpoint 2 with comment box:"
				]
			}
		]
	},
	"topic2": {
		"title": "Topic 2",
		"additionalNotes": true,
		"positive": [
			{
				"mainPoint": "1st positive feedback for topic 2",
				"subPoints": [
					"Subpoint 1",
					"Subpoint 2",
					"Subpoint 3"
				]
			},
			{
				"mainPoint": "2nd positive feedback for topic 2",
				"subPoints": [
					"Point 1"
				]
			}
		],
		"neutral": [
			{
				"mainPoint": "1st netural feedback for topic 2",
				"subPoints": [
					"Subpoint 1"
				]
			},
		],
		"negative": [
			{
				"mainPoint": "1st negative feedback for topic 2",
				"subPoints": [
					"Subpoint 1",
					"Subpoint 2 with comment box:"
				]
			}
		]
	}
}

function setMode(mode){
	if (["student", "grader"].includes(mode)){
		localStorage.setItem("mode", mode);
		location.reload();
	}else{
		console.log("Invalid mode");
	}
}

function setBranch(branch){
	if (typeof branch !== "string"){
		var selectElement = document.getElementById("branch-selector");
		branch = selectElement.value;
	}
	if (confirm("You are about to switch branches, any saves you did will be reset are you sure?")) {
		reset();
		txt = "Form has been cleared";
	  } else {
		txt = "You pressed Cancel!";
	  }
	localStorage.setItem("branch", branch);
	location.reload();
}

function getMasterTemplate(){
	return localStorage.getItem("master_template");
}

function setMasterTemplate(template){
	localStorage.setItem("master_template", template);
	location.reload();
}


function handleError(){
	alert("An error occured. Check the console logs.")
	console.log("Error retrieving or parsing general criterias. Try checking for invalid parsing/formats/trailing commas using: https://jsonformatter.curiousconcept.com/#")
	if (confirm("Reset to master branch?")) {
		txt = "Branche set to master";
		setBranch("master");
	  } else {
		txt = "You pressed Cancel!";
	  }
}
function loadDataBasedOnTemplate() {
	if (!debug) {
		master_template = localStorage.getItem("master_template");
		mode = localStorage.getItem("mode") || "student";
		template = mode === "grader" ? "GraderTemplate" : "StudentTemplate";

		if (!localStorage.getItem("mode")) {localStorage.setItem("mode", "student");}

		$.ajax({
			dataType: "json",
			url: "data/StudentTemplate/references.json".replace("StudentTemplate", getMasterTemplate() || template),
			error: function (error) {
				handleError();
			},
			success: function (data) {
				$.ajax({
					dataType: "json",
					url: data.generalCriteria.replace("StudentTemplate", getMasterTemplate() || template),
					error: function (data) {
						handleError();
					},
					success: function (data) {
						generalCriteria = data;
					},
					complete: function () {
						var promises = [];
						for (const assignment of data.assignmentSpecificCriteria) {
							if (assignment.enabled) {
								const request = $.ajax({
									dataType: "json",
									url: assignment.url.replace("StudentTemplate", getMasterTemplate() || template),
									success: function (data) {
										assignment.content = data;
										assignmentSpecificCriterias.push(assignment);
									},
								});
								promises.push(request);
							}
						}
						Promise.all(promises).then(function () {
							assignmentSpecificCriterias.sort((a, b) => {
								return a.id - b.id
							});
							generateBody();
						}).catch(err => console.log(err));
					}
				});
			},
		});
	}
}
loadDataBasedOnTemplate();