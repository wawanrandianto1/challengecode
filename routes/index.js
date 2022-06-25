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
router.get('/ins-sort', SortController.insertionsortPage);
router.post('/ins-sort', SortController.insertionsortProses);
router.get('/slc-sort', SortController.selectionsortPage);
router.post('/slc-sort', SortController.selectionsortProses);
router.get('/shellsort', SortController.shellsortPage);
router.post('/shellsort', SortController.shellsortProses);
router.get('/mergesort', SortController.mergesortPage);
router.post('/mergesort', SortController.mergesortProses);
router.get('/quicksort', SortController.quicksortPage);
router.post('/quicksort', SortController.quicksortProses);
router.get('/heapsort', SortController.heapsortPage);
router.post('/heapsort', SortController.heapsortProses);

module.exports = router;
