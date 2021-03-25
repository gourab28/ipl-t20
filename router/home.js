const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({"system":"online","github":"https://github.com/gourab28"})
  });
  

module.exports = router;