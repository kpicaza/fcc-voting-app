'use strict';

/** global: appUrl */
/** global: ajaxFunctions */

(function () {

  var apiUrl = appUrl + '/polls/new';

  var wrapper = $('#poll-form');
  var addButton = $('#add-poll');

  var showForm = function (data) {
    var formContent = wrapper.find('.form-content');

    addButton.hide();
    formContent.replaceWith(data);
    wrapper.find('.form-content').slideDown('slow');
  };

  addButton.bind('click', function (e) {
    e.preventDefault();

    ajaxFunctions.ajaxRequest('GET', apiUrl, {},
      function (data) {
        showForm(data);
      }, function (err) {
        console.error(err);
      });

  });

})();
