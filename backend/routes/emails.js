const express = require('express');
const router = express.Router();
const sampleEmails = require('../data/emails');

router.get('/', (req, res) => {
  res.json(sampleEmails);
});

module.exports = router;
