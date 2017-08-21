'use strict';

/** global: appUrl */
/** global: ajaxFunctions */

(function () {

  var apiUrl = appUrl + '/api/polls';

  var deleteButton = $('#delete-poll-button');
  var deleteModal = $('#delete-poll-modal');
  var confirmDeleteButton = $('#confirm-delete');
  var pollId = deleteButton.data('poll-id');

  var deletePoll = function () {
    ajaxFunctions.ajaxRequest('DELETE', apiUrl + '/' + pollId, {},
      function (data) {
        document.location = appUrl;
      }, function (e) {
        console.error(e);
      });
  };

  deleteButton.bind('click', function (e) {
    e.preventDefault();

    deleteModal.modal('show');
  });

  confirmDeleteButton.bind('click', function (e) {
    e.preventDefault();

    deletePoll();
  });

})();
