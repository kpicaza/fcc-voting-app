'use strict';

(function () {

  var apiUrl = appUrl + '/api/polls';

  var optionButton = $('.vote-option');
  var running = false;

  optionButton.bind('click', function (e) {
    e.preventDefault();

    if (running) {
      return;
    }

    running = true;

    var button = $(e.target);

    if (!button[0].hasAttribute('data-value')) {
      button = button.closest('button');
    }

    var pollId = button.data('poll-id');
    var value = button.data('value');

    ajaxFunctions.ajaxRequest('POST', apiUrl + '/' + pollId + '/options', {
      option: value
    }, function (data, status, xhr) {
      running = false;
    }, function (err, status, xhr) {
      console.error(err);
    });

  });

})();
