const jwt = require('jsonwebtoken');

const generateToken = (_id, email) => new Promise((resolve, reject) => {
  const payload = { _id, email };
  jwt.sign(
    payload,
    process.env.JWT_KEY,
    {
      expiresIn: '15d',
    },
    (err, token) => {
      if (err) {
        console.log(err);
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('The token could not be generated ');
      }

      resolve(token);
    },
  );
});

module.exports = {
  generateToken,
};
