var myApp = {
	browserCheck: function() {
		var elem = document.getElementById('browsercheck');

		if (window.File && window.FileReader && window.FileList && window.Blob) {
			// we are good
			elem.innerHTML = '<h2>Browser OK</h2><p>Your browser supports HTML5 file APIs!</p>';
			elem.className = elem.className + ' good';
			
			// show the file input div
			var fileInputArea = document.getElementById('fileinputarea');
			fileInputArea.className = 'fileinputarea';
			
			// add some listeners
			fileInputArea.ondragover = function() { return false; };
			fileInputArea.ondragend = function() { return false; };
			fileInputArea.ondrop = function(e) {
				e.preventDefault();
				myApp.processFile(e);
			};
		} else {
			// go get a better browser
			elem.innerHTML = '<h2>Browser Upgrade Needed</h2><p>Your browser does not support HTML5 file APIs!</p>';
			elem.className = elem.className + ' bad';
		}
	},
	
	processFile: function(evt) {
		var file = evt.dataTransfer.files[0];
		var reader = new FileReader();
		
		reader.onload = function(e) {
			// Show the file in the input file area
			var inputFile = document.getElementById('inputfile');
			var inputText = e.target.result;
			inputFile.className = 'inputfile';
			inputFile.innerHTML = '<h2>Input File:</h2><span class="code">' + inputText + '</span>';
			
			// Process the file line by line
			var textLines = inputText.split('\n');
			var outputHtml = '<h2>Results of Processing:</h2>';
			
			outputHtml += '<table>';
			outputHtml += '<tr><td colspan="3"><span class="tabletitle">Association Members by Postcode</span></tr>';

			var memberCount = 1;
			for (var n = 0; n < textLines.length; n++) {
				outputHtml += '<tr>';

				if (textLines[n].length < 5) {
					outputHtml += '<td colspan="3" class="postcode">' + textLines[n] + '</td>';
				} else {
					outputHtml += '<td>' + memberCount + '</td>';
					outputHtml += '<td>' + textLines[n] + '</td>';
					outputHtml += '<td>' + textLines[n+1] + '</td>';
					memberCount++;
					n = n + 1;
				}	
				
				outputHtml += '</tr>';	
			}
			
			outputHtml += '</table>';
			
			// Show the results in the output file area
			var outputArea = document.getElementById('outputarea');
			outputArea.className = 'outputarea';		
			
			// Display results
			outputArea.innerHTML = outputHtml;
		};
		
		reader.readAsText(file);		
	}
}

window.onload = function() {
	// Check if browser is good enough
	myApp.browserCheck();
};