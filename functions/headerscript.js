const debug = false;
var assignmentSpecificCriterias = [];
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

if (!debug) {
	$.ajax({
		dataType: "json",
		url: "https://raw.githubusercontent.com/karlkirschner/scipro_assignments_grading/master/references.json",
		success: function (data) {
			$.ajax({
				dataType: "json",
				url: data.generalCriteria,
				error: function (data) {
					alert("An error occured. Check the console logs.")
					console.log("Error retrieving or parsing general criterias. Try checking for invalid parsing/formats/trailing commas using: https://jsonformatter.curiousconcept.com/#")
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
								url: assignment.url,
								success: function (data) {
									assignment.content = data;
									assignmentSpecificCriterias.push(assignment);
								}
							});
							promises.push(request);
						}
					}
					Promise.all(promises).then(function () {
						assignmentSpecificCriterias.sort((a, b) => { return a.id - b.id });
						generateBody();
					}).catch(err => console.log(err));
				}
			});
		},
	});
}

