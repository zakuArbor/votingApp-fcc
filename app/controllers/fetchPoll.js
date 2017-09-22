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
	var ctx = document.getElementById("myChart").getContext('2d');
	var myPieChart = new Chart(ctx,{
		type: 'pie',
		data: {
			labels: userObject.options.map(function(option) { return option.option }),
			datasets: [{
					label: '# of Votes',
					"data": userObject.options.map(function(option) { return option.votes }),
					backgroundColor: ["rgb(255, 99, 132)","rgb(54, 162, 235)","rgb(255, 205, 86)"],
				}]
		},
		options: {
			cutoutPercentage: 40
		}
	});
   }));
})();
