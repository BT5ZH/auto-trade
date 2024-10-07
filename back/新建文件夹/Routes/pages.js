const express = require('express');
const router = express.Router();
const path = require('path');

const renderPage = (req, res) => {
  console.log('req.route.path: ' + req.route.path);
  switch (req.route.path) {
    case '/home':
      console.log('all: ' + path.join(__dirname, '../Pages/index.html'));
      res.sendFile(path.join(__dirname, '../Pages/index.html'));
      break;
  }
};

router.use('/public', express.static(path.join(__dirname, '../Pages')));
router.get('/home', renderPage);

module.exports = router;
