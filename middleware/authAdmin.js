require('dotenv').config();

const authAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const password = authHeader.split(' ')[1];

    if (password == process.env.AUTH_PASS) {
      next();
    } else {
      res.status(300).json('Access Denied');
    }
  } else {
    res.status(300).json('Access Denied');
  }
};

module.exports = authAdmin;
