'use strict';

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
            label: "My First dataset" ,
            backgroundColor: data.colors,
            data: values
          }]
        },

        options: {}
      });
    });

  };

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

    var value = button.data('value');

    ajaxFunctions.ajaxRequest('POST', apiUrl + '/' + pollId + '/options', {
      option: value
    }, function (data, status, xhr) {
      drawChart(data);
      running = false;
    }, function (err, status, xhr) {
      console.error(err);
    });

  });

})();
