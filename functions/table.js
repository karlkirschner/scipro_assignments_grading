function updatePercentage(value, id){
	const percentageId = id + "-percentage";
	const input = document.getElementById(id)
	const max = parseFloat(input.getAttribute("max"));
	const min = parseFloat(input.getAttribute("min"));
	const factor = parseFloat(input.getAttribute("factor"))
	if(parseFloat(value) > max){
		value = max
	}

	if(parseFloat(value) < min){
		value = min;
	}

	input.value = value;

	const element = document.getElementById(percentageId);
	element.innerText = value * factor + "%";

	const gradePercentage = document.getElementById("grade-percentage");
	const grade = document.getElementById("grade");
	const points = document.getElementsByClassName("point");

	let sum = 0;

	for(const point of points){
		sum += parseFloat(point.getAttribute("factor"))*parseFloat(point.value);
	}

	gradePercentage.innerText = sum + "%";
	let gradeValue = "";

	switch(true){
		case (sum <= 100 && sum >= 95):
			gradeValue = "1.0 (A+)";
			break;
		case (sum < 95 && sum >= 90):
			gradeValue = "1.3 (A)";
			break;
		case (sum < 90 && sum >= 85):
			gradeValue = "1.7 (A-)";
			break;
		case (sum < 85 && sum >= 80):
			gradeValue = "2.0 (B+)";
			break;
		case (sum < 80 && sum >= 75):
			gradeValue = "2.3 (B)";
			break;
		case (sum < 75 && sum >= 70):
			gradeValue = "2.7 (B-)";
			break;
		case (sum < 70 && sum >= 65):
			gradeValue = "3.0 (C+)";
			break;
		case (sum < 65 && sum >= 60):
			gradeValue = "3.3 (C)";
			break;
		case (sum < 60 && sum >= 55):
			gradeValue = "3.7 (C-)";
			break;
		case (sum < 55 && sum >= 50):
			gradeValue = "4.0 (D)";
			break;
		case (sum < 50 && sum >= 0):
			gradeValue = "5.0 (F)";
			break;
		default:
			gradeValue = "N/A";
	}
	grade.innerText = gradeValue;
}


function getTableData(){
	const data = {};
	// Save grading table
	const p = document.getElementsByClassName("point");
	for (const point of p) {data[point.id] = point.value;}

	let codeQuality = parseFloat(data["codequality-grading"]);
	let codeExecution = parseFloat(data["codeexecution-grading"]);
	let assignmentRequirements = parseFloat(data["assignmentrequirements-grading"]);
	let scientific = parseFloat(data["scientific-grading"]);
	let creativity = parseFloat(data["creativity-grading"]);

	let sumPoints =  codeQuality + codeExecution + assignmentRequirements + scientific + creativity;
	let weightedSum = (codeQuality * 4.0) + (codeExecution * 4.0) + (assignmentRequirements * 4.0) + (scientific * 4.0) +
		(creativity);

	let codeQualityPct = updatePct(codeQuality, 4.0);
	let codeExecutionPct = updatePct(codeExecution, 4.0);
	let assignmentRequirementsPct = updatePct(assignmentRequirements, 4.0);
	let scientificPct = updatePct(scientific, 4.0);
	let creativityPct = updatePct(creativity, 1.0);
	let sumPointsPct = codeQualityPct + codeExecutionPct + assignmentRequirementsPct + scientificPct + creativityPct;

	let tableData;
	tableData = [ ['Criteria', 'Points Awarded', 'Weighting Factor', 'Percentage Awarded' ],
		['1. Code quality & design', codeQuality.toFixed(1), 4, codeQualityPct.toFixed(1) + " %"],
		['2. Code execution & results', codeExecution.toFixed(1), 4, codeExecutionPct.toFixed(1) + " %"],
		['3. Assignment requirements', assignmentRequirements.toFixed(1), 4, assignmentRequirementsPct.toFixed(1) + " %"],
		['4. Scientific programming', scientific.toFixed(1), 4, scientificPct.toFixed(1) + " %" ],
		['5. Creativity', creativity.toFixed(1), 1, creativityPct.toFixed(1) + " %" ],
		['Total Percentage Awarded', '-', '-', sumPointsPct + " %"],
		['Final Note (Mark)', '-', '-', finalGrade(weightedSum)],
	];
	return tableData;
}
