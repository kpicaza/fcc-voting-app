
function RegisterValidator() {

  const schema = {
    'username': {
      in: 'body',
      notEmpty: true,
      isAlphanumeric: true,
      isLength: {
        options: [{ min: 2, max: 16 }],
        errorMessage: 'Must be between 2 and 16 chars long.'
      }
    },

    'email': {
      in: 'body',
      notEmpty: true,
      isEmail: {
        errorMessage: 'Invalid email given.'
      }
    },

    'password': {
      in: 'body',
      notEmpty: true,
      isLength: {
        options: [{ min: 2, max: 16 }],
        errorMessage: 'Must be between 2 and 10 chars long.'
      }
    },

    'passwordRepeat': {
      in: 'body',
      notEmpty: true
    }
  };

  this.check = function (req, res, next) {

    req.check(schema);

    next();
  }
  
}

module.exports = RegisterValidator;
