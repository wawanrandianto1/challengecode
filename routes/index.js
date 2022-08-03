const express = require('express');
const router = express.Router();

// Require controller modules.
const FirstController = require('../controller/FirstController');
const SecondController = require('../controller/SecondController');
const ThirdController = require('../controller/ThirdController');
const SortController = require('../controller/SortController');

router.get('/', FirstController.homePage);
router.get('/runlen-encode', FirstController.encodePage);
router.post('/runlen-encode', FirstController.encodeProses);
router.get('/runlen-decode', FirstController.decodePage);
router.post('/runlen-decode', FirstController.decodeProses);

router.get('/eventproblem', SecondController.eventproblemPage);
router.post('/eventproblem', SecondController.eventproblemProses);
router.get('/smallestnumber', SecondController.smallestNumberPage);
router.post('/smallestnumber', SecondController.smallestNumberProses);
router.get('/binary-gap', SecondController.binaryGapPage);
router.post('/binary-gap', SecondController.binaryGapProses);

router.get('/str-split', ThirdController.stringsplitPage);
router.post('/str-split', ThirdController.stringsplitProses);
router.get('/bioskop-case', ThirdController.bioskopcasePage);
router.post('/bioskop-case', ThirdController.bioskopcaseProses);
router.get('/polusi-case', ThirdController.polusiPage);
router.post('/polusi-case', ThirdController.polusiProses);

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
