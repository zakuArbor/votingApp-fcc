'use strict';

(function () {

	var poll_name_panel = document.querySelector('#poll_name') || null;	
	var options_panel = document.querySelector('#options') || null;
	var apiUrl = appUrl + '/poll/' + id;
	console.log(apiUrl);
	function updateHtmlElement (element, html) {
		console.log(element);
		console.log(html);
		element.innerHTML = html;
	}

	ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
	var userObject = JSON.parse(data);
	if (poll_name_panel !== null) {	
		console.log(poll_name_panel);
		updateHtmlElement(poll_name_panel, userObject.poll_name);
		var html = "<option selected value>Choose an option</option>";
		console.log(userObject);
		var i;
		for (i = 0; i < userObject.options.length; i++) {
			html += "<option value='" + userObject.options[i].option +"'>" + userObject.options[i].option + "</option>";
		}
		console.log("------------------------------------");
		console.log(userObject);	
		updateHtmlElement(options_panel, html);
	}
	var generateRandomColor = function() {
        	var r = Math.floor(Math.random() * 255);
        	var g = Math.floor(Math.random() * 255);
        	var b = Math.floor(Math.random() * 255);
        	return "rgb(" + r + "," + g + "," + b + ")";
	};
	var test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
	var backgroundColor = ["rgb(255, 99, 132)","rgb(54, 162, 235)","rgb(255, 205, 86)", "rgb(77,77,77)", 
			"rgb(93,165,218)", "rgb(250,164,58)", "rgb(96,189,104)", "rgb(241,124,176)", "rgb(178,118,178)", 
			"rgb(222,207,63)", "rgb(241,88,84)"];
	for (var i = backgroundColor.length; i < userObject.options.length; i++) backgroundColor.push(generateRandomColor());
	console.log(backgroundColor);
	var ctx = document.getElementById("myChart").getContext('2d');
	var myPieChart = new Chart(ctx,{
		type: 'pie',
		data: {
			labels: userObject.options.map(function(option) { return option.option }),
			datasets: [{
					label: '# of Votes',
					"data": userObject.options.map(function(option) { return option.votes }),
					backgroundColor: backgroundColor 
				}]
		},
		options: {
			cutoutPercentage: 40,
			legend: {position: 'bottom'}
		}
	});
   }));
})();
