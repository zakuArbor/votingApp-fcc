'use strict';

(function () {

	var addButton = document.getElementById("more_option");
	var deleteButton = document.getElementById("btn-delete");
	var apiUrl = appUrl + '/poll/:id/delete';

/*
   function updateClickCount (data) {
      var clicksObject = JSON.parse(data);
      clickNbr.innerHTML = clicksObject.clicks;
   }
*/


   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount));

   deleteButton.addEventListener("click", function () {
	function(){ alert("Hello World!"); }
/*	console.log("delete");
      ajaxFunctions.ajaxRequest('DELETE', apiUrl, function () {
	console.log("pika 2 delete");
         //ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);
      });*/

   });

})();
