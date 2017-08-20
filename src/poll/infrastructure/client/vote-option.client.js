'use strict';

/** global: appUrl */
/** global: ajaxFunctions */

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

  optionButton.bind('click', function (e) {
    if (running) { return; }

    running = true;

    e.preventDefault();

    var button = $(e.target);

    if (!button[0].hasAttribute('data-value')) {
      button = button.closest('button');
    }

    var value = button.data('value');

    ajaxFunctions.ajaxRequest('POST', apiUrl + '/' + pollId + '/options', {
      option: value
    }, function (data) {
      drawChart(data);
    }, function (err) {
      console.error(err);
    });

  });

})();
