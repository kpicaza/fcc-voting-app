
module.exports = function (string, regex) {
  var matches = regex.exec(string);

  if (!matches || 0 >= matches.length) {
    return '';
  }

  return matches[0];

};
