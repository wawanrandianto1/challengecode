const express = require('express');
const router = express.Router();

// Require controller modules.
const FirstController = require('../controller/FirstController');
const SecondController = require('../controller/SecondController');
const SortController = require('../controller/SortController');

router.get('/runlen-encode', FirstController.encodePage);
router.post('/runlen-encode', FirstController.encodeProses);

router.get('/runlen-decode', FirstController.decodePage);
router.post('/runlen-decode', FirstController.decodeProses);

router.get('/bubblesort', SortController.bubblesortPage);
router.post('/bubblesort', SortController.bubblesortProses);

module.exports = router;
