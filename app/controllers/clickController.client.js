'use strict';

(function () {

	//var addButton = document.querySelector('.btn-add');
	var addButton = document.getElementById("more_option");
	var deleteButton = document.querySelector('.btn-delete');
	var option_panel = document.getElementById("options");
	var clickNbr = document.querySelector('#click-nbr');
	var apiUrl = appUrl + '/api/:id/clicks';

	$(document).ready(function() {
		addButton.click(function() {
			console.log("test");
			$(option_panel).after("<input type = 'text' class = 'poll-input'>");	
		});
	});
/*
   function updateClickCount (data) {
      var clicksObject = JSON.parse(data);
      clickNbr.innerHTML = clicksObject.clicks;
   }
*/


   /*ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount));

   addButton.addEventListener('click', function () {

      ajaxFunctions.ajaxRequest('POST', apiUrl, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);
      });

   }, false);

   deleteButton.addEventListener('click', function () {

      ajaxFunctions.ajaxRequest('DELETE', apiUrl, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);
      });

   }, false);*/

})();
