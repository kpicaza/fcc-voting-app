'use strict';

(function () {

  var apiUrl = appUrl + '/polls/new';

  var wrapper = $('#poll-form');
  var addButton = $('#add-poll');

  var showForm = function (data) {
    var formContent = wrapper.find('.form-content');

    addButton.slideUp('slow');
    formContent.replaceWith(data);
    wrapper.find('.form-content').slideDown('slow');
  };

  addButton.bind('click', function (e) {
    e.preventDefault();

    ajaxFunctions.ajaxRequest('GET', apiUrl, {},
      function (data, status, xhr) {
        showForm(data);
      }, function (err, status, xhr) {
        console.error(err);
      });

  });

})();
