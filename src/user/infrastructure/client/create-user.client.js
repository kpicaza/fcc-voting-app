'use strict';

(function () {

  var apiUrl = appUrl + '/api/users/';

  var form = $('#register-form');
  var usernameInput = $('#username');
  var emailInput = $('#email');
  var passwordInput = $('#password');
  var passwordRepeatInput = $('#repeatPassword');
  var submitButton = $('#register-button');

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

  var checkPassword = function (input) {
    if ('' === passwordRepeatInput.val() || '' === passwordInput.val()) {
      return;
    }

    ajaxFunctions.ajaxRequest('POST', apiUrl + 'passwords', {
      password: passwordInput.val(),
      verify: passwordRepeatInput.val()
    }, function (data, status, xhr) {
      hideError(input);
    }, function (err, status, xhr) {
      showError(input);
    });
  };

  usernameInput.bind('keyup', debounce(function () {
    ajaxFunctions.ajaxRequest('POST', apiUrl + 'usernames', {
      username: usernameInput.val()
    }, function (data, status, xhr) {
      hideError(usernameInput);
    }, function (err, status, xhr) {
      showError(usernameInput);
    });

  }, 250));

  emailInput.bind('keyup', debounce(function () {
    ajaxFunctions.ajaxRequest('POST', apiUrl + 'emails', {
      email: emailInput.val()
    }, function (data, status, xhr) {
      hideError(emailInput);
    }, function (err, status, xhr) {
      showError(emailInput);
    });
  }, 250));

  passwordInput.bind('keyup', debounce(function () {
    checkPassword(passwordInput);
  }, 250));

  passwordRepeatInput.bind('keyup', debounce(function () {
    checkPassword(passwordRepeatInput);
  }, 250));

  submitButton.bind('InputFilled', function (e) {

    var hasErrors = true;

    var formGroups = form.find('.form-group');

    formGroups.each(function (i) {

      hasErrors = $(formGroups[i]).hasClass('has-danger')
      || '' === $(formGroups[i]).find('input').val();
    });

    if (true === hasErrors) {
      submitButton.prop('disabled', true);
      return;
    }

    submitButton.prop('disabled', false);
  });

})();
