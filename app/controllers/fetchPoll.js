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
		
		updateHtmlElement(options_panel, html);
	}
      
   }));
})();
