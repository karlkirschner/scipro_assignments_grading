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

function base64Encode(str) {
	let result = '';
	let char1, char2, char3;
	let enc1, enc2, enc3, enc4;
	let i = 0;
	str = encodeURIComponent(str);
	while (i < str.length) {
		char1 = str.charCodeAt(i++);
		char2 = str.charCodeAt(i++);
		char3 = str.charCodeAt(i++);
		enc1 = char1 >> 2;
		enc2 = ((char1 & 3) << 4) | (char2 >> 4);
		enc3 = ((char2 & 15) << 2) | (char3 >> 6);
		enc4 = char3 & 63;
		if (isNaN(char2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(char3)) {
			enc4 = 64;
		}
		result +=
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charAt(enc1) +
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charAt(enc2) +
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charAt(enc3) +
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charAt(enc4);
	}
	return result;
}

