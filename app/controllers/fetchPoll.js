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

		// O(m+n) = O(n^2) - Can we improve this?
		for (i = 0; i < userObject.length; i++) {
			if (userObject[i].polls) {
			for (j = 0; j < userObject[i].polls.length; j++) {
				html = html + "<div class = 'poll'>" +
				"<a class = 'poll' href = '/polls/" + userObject[i].polls[j]._id + "'>" + userObject[i].polls[j].poll_name + "</a>" +
				"</div>";
	      		}
	  	}
		}
          updateHtmlElement(poll_panel, html);
      }
      
   }));
})();
