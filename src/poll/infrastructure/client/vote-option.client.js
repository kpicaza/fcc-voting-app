'use strict';

(function () {

  var apiUrl = appUrl + '/api/polls';

  var optionButton = $('.vote-option');

  optionButton.bind('click', function (e) {
    e.preventDefault();

    var button = $(e.target);

    if (!button[0].hasAttribute('data-value')) {
      button = button.closest('button');
    }

    var pollId = button.data('poll-id');
    var value = button.data('value');

    console.log(button, pollId, value);

    ajaxFunctions.ajaxRequest('POST', apiUrl + '/' + pollId + '/options', {
      option: value
    }, function (data, status, xhr) {
      console.log(data);
    }, function (err, status, xhr) {
      console.error(err);
    });

  });

})();
