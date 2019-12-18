const jwt = require('jsonwebtoken');

module.exports.validateToken = excluded_path => {
  return (req, res, next) => {
    let path = req.path;
    // Check path in excluded_paths

    let matches = excluded_path.map(e => {
      if (path === e) {
        return true;
      }
      return false;
    });
    if (matches.indexOf(true) > -1) {
      return next();
    }

    // Bypassing OPTIONS request from JWT
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    // Header Verfification
    if (req.headers.authorization === undefined) {
      return res.status(401).json({ error: true, message: 'Not Authorized' });
    }

    let [scheme, token] = req.headers.authorization.split(' ');
    if (scheme !== 'Bearer') {
      return res.status(401).json({ error: true, message: 'Not Authorized' });
    }

    // Token Verification
    let payload = '';
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      res.status(401);
      if (err.message === 'invalid token') {
        return res.json({
          error: true,
          message: 'You are not authorized to view this page'
        });
      } else if (err.message === 'jwt expired') {
        return res.json({ error: true, message: 'Token Expired' });
      }
      return res.json({ error: true, message: 'Unknown Error' });
    }
    next();
  };
};
