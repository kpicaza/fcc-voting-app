'use strict';

/** global: appUrl */
/** global: ajaxFunctions */
/** global: Chart */

(function () {

  var apiUrl = appUrl + '/api/polls';

  var optionButton = $('.vote-option');
  var chartDiv = $('#poll-chart');
  var optionsDiv = $('#poll-options');
  var pollId = chartDiv.data('poll-id');
  var running = false;

  var drawChart = function (data) {
    var ctx = document.getElementById('poll-chart').getContext('2d');

    var labels = [];
    var values = [];

    for (var i in data.options) {
      labels.push(data.options[i].name);
      values.push(data.options[i].votes);
    }

    chartDiv.empty();
    optionsDiv.fadeOut('fast', function () {
      return new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            backgroundColor: data.colors,
            data: values
          }]
        },
        options: {}
      });
    });

    running = false;

  };

  var bindOptions = function() {
    optionButton.bind('click', function (e) {
      if (running) { return; }

      running = true;

      e.preventDefault();

      var input = $(e.target);

      if (!input[0].hasAttribute('data-poll-id')) {
        input = input.closest('.input-group').find('input');
      }

      var value = input.val();

      ajaxFunctions.ajaxRequest('POST', apiUrl + '/' + pollId + '/options', {
        option: value
      }, function (data) {
        drawChart(data);
      }, function (err) {
        console.error(err);
      });

    });
  };

  ajaxFunctions.ready(function () {
    bindOptions();
  });

  chartDiv.bind('OptionWadAdded', function () {
    optionButton = $('.vote-option');
    chartDiv = $('#poll-chart');
    optionsDiv = $('#poll-options');
    pollId = chartDiv.data('poll-id');
    bindOptions();
  });

})();
