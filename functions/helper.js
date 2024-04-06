function getBranch(){
	if (localStorage.getItem("branch") !== null){
		return localStorage.getItem("branch");  
	}else{
		return "master";
	}
}

function getMode(){
	return localStorage.getItem("mode");
}

function formatTable(data) {
	const colWidths = Array(data[0].length).fill(0);
	for (const row of data) {
		for (let i = 0; i < row.length; i++) {
			colWidths[i] = Math.max(colWidths[i], row[i].toString().length);
		}
	}
	const headerDivider = '-'.repeat(colWidths.reduce((a, b) => a + b, 0) + (3 * colWidths.length) - 1 + 6);
	const result = [];
	for (const row of data) {
		const formattedRow = [];
		for (let i = 0; i < row.length; i++) {
			formattedRow.push(row[i].toString().padStart(colWidths[i] + 2).padEnd(colWidths[i] + 2));
		}
		result.push(formattedRow.join(' | '));
	}
	result.splice(1, 0, headerDivider);
	result.splice(7, 0, headerDivider);
	return result.join('\n');
}

function updatePct(points, weighting){
	return (points * weighting)
}

function finalGrade(sum){
	let gradeValue = "";
	switch(true) {
		case (sum <= 100 && sum >= 95):
			return gradeValue = "1.0 (A+)";
		case (sum < 95 && sum >= 90):
			return gradeValue = "1.3 (A)";
		case (sum < 90 && sum >= 85):
			return gradeValue = "1.7 (A-)";
		case (sum < 85 && sum >= 80):
			return gradeValue = "2.0 (B+)";
		case (sum < 80 && sum >= 75):
			return gradeValue = "2.3 (B)";
		case (sum < 75 && sum >= 70):
			return gradeValue = "2.7 (B-)";
		case (sum < 70 && sum >= 65):
			return gradeValue = "3.0 (C+)";
		case (sum < 65 && sum >= 60):
			return gradeValue = "3.3 (C)";
		case (sum < 60 && sum >= 55):
			return gradeValue = "3.7 (C-)";
		case (sum < 55 && sum >= 50):
			return gradeValue = "4.0 (D)";
		case (sum < 50 && sum >= 0):
			return gradeValue = "5.0 (F)";
		default:
			return gradeValue = "N/A";
	}
}



async function getBranches(){
	var response = await fetch("https://api.github.com/repos/karlkirschner/scipro_assignments_grading/branches")
	var json = await response.json();
	const branches = [];
	for (branch of json){
		branches.push(branch["name"]);
	}
	return branches;
}
function getSubfolderNamesFromGithub() {
	return new Promise((resolve, reject) => {
		// Change the address before merge to master
		fetch('https://api.github.com/repos/karlkirschner/scipro_assignments_grading/contents/data?ref=database_refactor')
			.then(response => {
				if (!response.ok) {
					throw new Error('Netzwerkantwort war nicht ok');
				}
				return response.json();
			})
			.then(data => {
				const directories = data.filter(item => item.type === 'dir').map(dir => dir.name);
				resolve(directories);
			})
			.catch(error => reject('Fehler beim Abrufen der Daten: ' + error));
	});
}

function generateSelector() {
	var container = document.createElement("div");
	getSubfolderNamesFromGithub().then((data) => {
		var select = document.createElement("select");
		select.id = "branch-selector";
		select.onchange = function() {
			localStorage.setItem("master_template", select.value);
		};

		for (const item of data) {
			var option = document.createElement("option");
			option.value = item;
			option.innerText = item;
			select.appendChild(option);
		}
		container.appendChild(select);
	});

	return container;
}


// function generateSelector(items){
// 	var container = document.createElement("div");
// 	items.then((data) => {
// 		var select = document.createElement("select");
// 		select.id="branch-selector";
// 		select.onchange = setBranch;
// 		for (const item of data){
// 			var option = document.createElement("option");
// 			option.value = item;
// 			option.innerText = item;
// 			if (getBranch() === item){
// 				option.selected = true;
// 			}
// 			select.appendChild(option);
//
// 		}
// 		container.appendChild(select);
// 	})
// 	return container;
// }
