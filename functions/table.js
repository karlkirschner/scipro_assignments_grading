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