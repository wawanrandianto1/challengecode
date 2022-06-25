const express = require('express');
const router = express.Router();

// Require controller modules.
const FirstController = require('../controller/FirstController');

router.get('/runlen-encode', FirstController.encodePage);
router.post('/runlen-encode', FirstController.encodeProses);

router.get('/runlen-decode', FirstController.decodePage);
router.post('/runlen-decode', FirstController.decodeProses);

module.exports = router;
