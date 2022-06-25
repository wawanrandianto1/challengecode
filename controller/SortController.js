const Joi = require('joi');

const bubblesortPage = (req, res) => {
  return res.render('sort/bubblesort', { result: '' });
};
const insertionsortPage = (req, res) => {
  return res.render('sort/insertionsort', { result: '' });
};
const selectionsortPage = (req, res) => {
  return res.render('sort/selectionsort', { result: '' });
};
const shellsortPage = (req, res) => {
  return res.render('sort/shellsort', { result: '' });
};
const mergesortPage = (req, res) => {
  return res.render('sort/mergesort', { result: '' });
};
const quicksortPage = (req, res) => {
  return res.render('sort/quicksort', { result: '' });
};
const heapsortPage = (req, res) => {
  return res.render('sort/heapsort', { result: '' });
};

const bubblesortProses = (req, res) => {
  let result = '';
  const checkObj = { str: Joi.string().required() };
  const checkInput = Joi.object(checkObj).validate(req.body);
  if (checkInput.error) {
    req.flash('error', 'Input kosong');
    return res.render('sort/bubblesort', { result });
  }

  const { str } = req.body;
  let arrMentah = JSON.parse(str);

  // loop array start dari index 0
  for (let i = 0; i < arrMentah.length; i++) {
    // loop array start dari index belakang
    for (let j = arrMentah.length - 1; j > i; j--) {
      // kondisi find lebih kecil
      if (arrMentah[j] < arrMentah[j - 1]) {
        // swap atau tukar posisi
        let tmpData = arrMentah[j];
        arrMentah[j] = arrMentah[j - 1];
        arrMentah[j - 1] = tmpData;
      }
    }
  }

  result = '[' + arrMentah.join(',') + ']';
  return res.render('sort/bubblesort', { result });
};

const insertionsortProses = (req, res) => {
  let result = '';
  const checkObj = { str: Joi.string().required() };
  const checkInput = Joi.object(checkObj).validate(req.body);
  if (checkInput.error) {
    req.flash('error', 'Input kosong');
    return res.render('sort/insertionsort', { result });
  }

  const { str } = req.body;
  let arrMentah = JSON.parse(str);

  // loop array start dari index 0
  for (let i = 0; i < arrMentah.length; i++) {
    // loop array start dari index belakang
    for (let j = i; j > 0; j--) {
      // kondisi find lebih kecil
      if (arrMentah[j] < arrMentah[j - 1]) {
        // swap atau tukar posisi
        let tmpData = arrMentah[j];
        arrMentah[j] = arrMentah[j - 1];
        arrMentah[j - 1] = tmpData;
      }
    }
  }

  result = '[' + arrMentah.join(',') + ']';
  return res.render('sort/insertionsort', { result });
};

const selectionsortProses = (req, res) => {
  let result = '';
  const checkObj = { str: Joi.string().required() };
  const checkInput = Joi.object(checkObj).validate(req.body);
  if (checkInput.error) {
    req.flash('error', 'Input kosong');
    return res.render('sort/selectionsort', { result });
  }

  const { str } = req.body;
  let arrMentah = JSON.parse(str);

  // loop array start dari index 0
  for (let i = 0; i < arrMentah.length; i++) {
    let secondIndex = i;
    // loop array start dari index + 1
    for (let j = i + 1; j < arrMentah.length; j++) {
      if (arrMentah[j] < arrMentah[secondIndex]) {
        secondIndex = j;
      }
    }

    // swap atau tukar posisi
    let tmpData = arrMentah[i];
    arrMentah[i] = arrMentah[secondIndex];
    arrMentah[secondIndex] = tmpData;
  }

  result = '[' + arrMentah.join(',') + ']';
  return res.render('sort/selectionsort', { result });
};

const shellsortProses = (req, res) => {
  let result = '';
  const checkObj = { str: Joi.string().required() };
  const checkInput = Joi.object(checkObj).validate(req.body);
  if (checkInput.error) {
    req.flash('error', 'Input kosong');
    return res.render('sort/shellsort', { result });
  }

  const { str } = req.body;
  let arrMentah = JSON.parse(str);
  let gap = parseInt(arrMentah.length / 2, 10);
  while (gap > 0) {
    for (let i = gap; i < arrMentah.length; i++) {
      let tmp = arrMentah[i];
      let j = i;
      while (j >= gap && arrMentah[j - gap] > tmp) {
        arrMentah[j] = arrMentah[j - gap];
        j = j - gap;
      }
      arrMentah[j] = tmp;
    }
    gap = parseInt(gap / 2, 10);
  }

  result = '[' + arrMentah.join(',') + ']';
  return res.render('sort/shellsort', { result });
};

const mergesortFunc = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }

  let countSplice = Math.floor(arr.length / 2);
  let spliceArr = arr.splice(countSplice);
  let left = mergesortFunc(spliceArr);
  let right = mergesortFunc(arr);
  let result = [];

  while (left.length > 0 && right.length > 0) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  while (left.length > 0) {
    result.push(left.shift());
  }

  while (right.length > 0) {
    result.push(right.shift());
  }
  return result;
};
const mergesortProses = (req, res) => {
  let result = '';
  const checkObj = { str: Joi.string().required() };
  const checkInput = Joi.object(checkObj).validate(req.body);
  if (checkInput.error) {
    req.flash('error', 'Input kosong');
    return res.render('sort/shellsort', { result });
  }

  const { str } = req.body;
  let arrMentahInput = JSON.parse(str);
  let arrMentah = mergesortFunc(arrMentahInput);
  result = '[' + arrMentah.join(',') + ']';
  return res.render('sort/mergesort', { result });
};

const quicksortFunc = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }

  let pivot = arr[0];
  let low = [],
    high = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= pivot) {
      low.push(arr[i]);
    } else {
      high.push(arr[i]);
    }
  }
  return quicksortFunc(low).concat([pivot], quicksortFunc(high));
};
const quicksortProses = (req, res) => {
  let result = '';
  const checkObj = { str: Joi.string().required() };
  const checkInput = Joi.object(checkObj).validate(req.body);
  if (checkInput.error) {
    req.flash('error', 'Input kosong');
    return res.render('sort/shellsort', { result });
  }

  const { str } = req.body;
  let arrMentahInput = JSON.parse(str);
  let arrMentah = quicksortFunc(arrMentahInput);
  result = '[' + arrMentah.join(',') + ']';
  return res.render('sort/quicksort', { result });
};

const buildHeapFunc = (arr, i, t) => {
  let tmpVar = arr[i];
  let j = i * 2 + 1;
  while (j <= t) {
    if (j < t) {
      if (arr[j] < arr[j + 1]) {
        j = j + 1;
      }
    }
    if (tmpVar < arr[j]) {
      arr[i] = arr[j];
      i = j;
      j = 2 * i + 1;
    } else {
      j = t + 1;
    }
  }
  arr[i] = tmpVar;
};
const heapsortProses = (req, res) => {
  let result = '';
  const checkObj = { str: Joi.string().required() };
  const checkInput = Joi.object(checkObj).validate(req.body);
  if (checkInput.error) {
    req.flash('error', 'Input kosong');
    return res.render('sort/shellsort', { result });
  }

  const { str } = req.body;
  let arrMentahInput = JSON.parse(str);

  let initvar = parseInt(Math.floor((arrMentahInput.length - 1) / 2), 10);
  for (let i = initvar; i >= 0; i--) {
    let count = arrMentahInput.length - 1;
    buildHeapFunc(arrMentahInput, i, count);
  }

  for (let i = arrMentahInput.length - 1; i >= 1; i--) {
    let tmpVar = arrMentahInput[0];
    arrMentahInput[0] = arrMentahInput[i];
    arrMentahInput[i] = tmpVar;
    buildHeapFunc(arrMentahInput, 0, i - 1);
  }

  let arrMentah = arrMentahInput;
  result = '[' + arrMentah.join(',') + ']';
  return res.render('sort/heapsort', { result });
};

module.exports = {
  bubblesortPage,
  bubblesortProses,
  insertionsortPage,
  insertionsortProses,
  selectionsortPage,
  selectionsortProses,
  shellsortPage,
  shellsortProses,
  mergesortPage,
  mergesortProses,
  quicksortPage,
  quicksortProses,
  heapsortPage,
  heapsortProses,
};
