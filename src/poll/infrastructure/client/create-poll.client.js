'use strict';

(function () {

  var apiUrl = appUrl + '/api/polls';

  var form = $('#add-poll-form');
  var wrapper = $('#poll-form');
  var pollList = $('#poll-list');
  var optionsWrapper = $('#poll-options');
  var addButton = $('#add-poll');
  var nameInput = $('#poll-name');
  var optionInput = $('.poll-option');
  var cloneOptionInput = optionInput.closest('.form-group').clone();
  var cancelButton = $('#cancel-poll-button');
  var submitButton = $('#submit-poll-button');
  var optionsNumber = 0;

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

  var closeForm = function () {
    var formContent = wrapper.find('.form-content');

    formContent.slideUp('slow');
    addButton.slideDown('slow');
  };

  cancelButton.bind('click', function (e) {
    e.preventDefault();

    closeForm();
  });

  var checkOption = function (e) {
    e.preventDefault();

    var option = $(e.target);

    var options = [];
    optionInput.each(function (i) {
      var input = $(optionInput[i]);

      if (input.closest('.form-group').hasClass('has-success')) {
        options.push($(optionInput[i]).val())
      }
    });

    ajaxFunctions.ajaxRequest('POST', apiUrl + '/options', {
      option: option.val(),
      options: options
    }, function (data, status, xhr) {
      hideError(option);
      optionsWrapper.trigger('OptionFilled');
    }, function (err, status, xhr) {
      showError(option);
    });
  };

  var reloadView = function () {

    ajaxFunctions.ajaxRequest('GET', appUrl, {},
      function (data, status, xhr) {
        pollList.find('#poll-list-group').replaceWith($(data).find('#poll-list-group'));
      },
      function (err, status, xhr) {
        console.error(err);
      });

  };

  nameInput.bind('keyup', debounce(function () {
    ajaxFunctions.ajaxRequest('POST', apiUrl + '/names', {
      name: nameInput.val()
    }, function (data, status, xhr) {
      hideError(nameInput);
    }, function (err, status, xhr) {
      showError(nameInput);
    });
  }, 250));

  optionInput.bind('keyup', debounce(checkOption, 250));

  optionsWrapper.bind('OptionFilled', function (e) {
    var control = false;
    var options = $('.poll-option');

    optionsNumber = 1;
    options.each(function (option) {

      if ('' === $(options[option]).val() || true === control) {
        control = true;
        return;
      }

      control = false;
      optionsNumber++;
    });

    if (control) {
      return;
    }

    var formItem = cloneOptionInput.clone();
    var input = formItem.find('input');
    input.val('');
    if (1 < optionsNumber) {
      input.prop('required', false);
    }

    optionsWrapper.append(formItem);
    optionInput = optionsWrapper.find('.poll-option');
    optionInput.unbind();
    formItem.bind('keyup', debounce(checkOption, 250));
  });

  submitButton.bind('InputFilled', function (e) {
    if (1 < optionsNumber) {
      submitButton.prop('disabled', false);
      return;
    }

    submitButton.prop('disabled', true)
  });

  submitButton.bind('click', function (e) {
    e.preventDefault();

    var inputs = form.find('.poll-option');
    var formData = {
      name: nameInput.val(),
      options: {}
    };

    inputs.each(function (i) {
      var input = $(inputs[i]);
      formData.options[i] = input.val();
    });

    ajaxFunctions.ajaxRequest('POST', apiUrl, formData,
      function (data, status, xhr) {
        closeForm();
        reloadView();
      },
      function (err, status, xhr) {
        console.error(err);
      });

  });

})();
