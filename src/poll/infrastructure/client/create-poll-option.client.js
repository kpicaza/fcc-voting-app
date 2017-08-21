'use strict';

/** global: appUrl */
/** global: ajaxFunctions */

(function () {

  var apiUrl = appUrl + '/api/polls';

  var chartDiv = $('#poll-chart');
  var optionDiv = $('#poll-options-list');
  var dataDiv = $('.poll-data');
  var pollId = chartDiv.data('poll-id');
  var optionForm = $('#add-option-form-wrapper');
  var optionInput = $('#add-option');
  var submitButton = $('#add-option-button');
  var showFormButton = $('#show-add-option-form');
  var closeButton = $('#close-option-button');

  var showError = function (input) {

    var div = input.closest('.form-group');
    var errorDiv = div.find('.error');

    submitButton.prop('disabled', true);
    div.removeClass('has-success');
    div.addClass('has-danger');
    errorDiv.show();
  };

  var hideError = function (input) {

    var div = input.closest('.form-group');
    var errorDiv = div.find('.error');

    div.removeClass('has-danger');
    div.addClass('has-success');
    errorDiv.hide();

    submitButton.trigger('InputFilled');

  };

  var reloadPoll = function () {
    ajaxFunctions.ajaxRequest('GET', appUrl + '/polls/' + pollId, {},
      function (data) {
        optionDiv.replaceWith($(data).find('#poll-options-list'));
        dataDiv.replaceWith($(data).find('.poll-data'));

        optionForm.hide();
        optionInput.val('');
        showFormButton.slideDown('fast');
        chartDiv.trigger('OptionWadAdded');
        optionDiv = $('#poll-options-list');
      }, function (err) {
        console.err(err);
      });
  };

  showFormButton.bind('click', function (e) {
    e.preventDefault();

    showFormButton.fadeOut('fast', function () {
      optionForm.slideDown('slow');
    });
  });

  closeButton.bind('click', function (e) {
    e.preventDefault();

    optionForm.fadeOut('fast', function () {
      showFormButton.show();
    });
  });

  optionInput.bind('keyup', debounce(function () {
    var options = [];
    var inputs = optionDiv.find('input');

    inputs.each(function (i) {
      options.push($(inputs[i]).data('value'));
    });

    ajaxFunctions.ajaxRequest('POST', apiUrl + '/options', {
      option: optionInput.val(),
      options: options
    }, function () {
      hideError(optionInput);
    }, function () {
      showError(optionInput);
    });
  }, 250));

  submitButton.bind('InputFilled', function () {
    submitButton.prop('disabled', false)
  });

  submitButton.bind('click', function (e) {
    e.preventDefault();

    ajaxFunctions.ajaxRequest('PUT', apiUrl + '/' + pollId + '/options', {
      option: optionInput.val()
    }, function () {
      reloadPoll();
    }, function (err) {
      console.err(err);
    });

  });

})();
