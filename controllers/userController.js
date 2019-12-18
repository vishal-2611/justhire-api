const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  addUser: (req, res) => {
    const user = new User(req.body);
    user
      .save()
      .then(() => {
        return res.json({ error: false, message: 'User Created Successfully' });
      })
      .catch(error => {
        console.log(error);
        return res
          .status(500)
          .json({ error: true, message: 'User not Created' });
      });
  },

  loginUser: (req, res) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        bcrypt
          .compare(req.body.password, user.password)
          .then(match => {
            if (match) {
              const payload = {
                name: user.name,
                email: user.email,
                userType: user.userType,
                id: user._id
              };
              const options = { expiresIn: '2d' };
              const secret = process.env.JWT_SECRET;
              const token = jwt.sign(payload, secret, options);
              return res.json({
                error: false,
                token: token,
                message: 'SignIn Success'
              });
            } else {
              return res
                .status(401)
                .json({ error: true, message: 'Not Authorised' });
            }
          })
          .catch(err => {
            console.log(err);
            return res
              .json(401)
              .json({ error: true, message: 'Authentication Failed' });
          });
      })
      .catch(error => {
        console.log(error);
        return res.status(500).json({ error: true, message: 'Internal Error' });
      });
  }
};
