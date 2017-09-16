'use strict';

(function () {

	var poll_panel = document.querySelector('#poll_panel');	
	var apiUrl = appUrl + '/polls';

	function updateHtmlElement (element, html) {
		element.innerHTML = html;
	}

	ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
	var userObject = JSON.parse(data);
	if (poll_panel !== null) {	
		var html = "";
		var i, j;

		console.log("Pika");
		console.log(userObject);
		for (i = 0; i < userObject.length; i++) {
			if (userObject[i]) {
				html = html + "<div class = 'poll'>" +
				"<a class = 'poll' href = '" + userObject[i]._id + "'>" + userObject[i].poll_name + "</a>" +
				"</div>";
	  		}
		}
		console.log(html);
          updateHtmlElement(poll_panel, html);
      }
      
   }));
})();
