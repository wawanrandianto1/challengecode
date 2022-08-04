const Joi = require('joi');

// PAGE
const stringsplitPage = (req, res) => {
  return res.render('second/stringsplit', { result: '' });
};

const bioskopcasePage = (req, res) => {
  return res.render('second/bioskopcase', { result: '' });
};

const polusiPage = (req, res) => {
  return res.render('second/polusi', { result: '' });
};

const suminarrayPage = (req, res) => {
  return res.render('second/suminarray', { result: '' });
};

// PROSES
const stringsplitProses = (req, res) => {
  let result = null;
  const checkObj = { str: Joi.string().required(), angka: Joi.number().required() };
  const checkInput = Joi.object(checkObj).validate(req.body);
  if (checkInput.error) {
    req.flash('error', 'Input kosong');
    return res.render('second/stringsplit', { result });
  }

  const { str, angka } = req.body;
  let tmpAngka = str.length;
  if (parseInt(angka, 10) <= tmpAngka) {
    tmpAngka = parseInt(angka, 10);
  }

  let strPisah = str.substr(0, tmpAngka);
  let arrStr = str.split(' ');
  let arrStrPisah = strPisah.split(' ');

  let tmpArr = [];
  for (let i = 0; i < arrStrPisah.length; i++) {
    const el = arrStrPisah[i];
    if (arrStr.indexOf(el) > -1) {
      tmpArr.push(el);
    }
  }

  result = '"' + tmpArr.join(' ') + '"';
  return res.render('second/stringsplit', { result });
};

const bioskopcaseProses = (req, res) => {
  let result = null;
  const checkObj = {
    orang: Joi.string().required(),
    kursi: Joi.string().required(),
  };
  const checkInput = Joi.object(checkObj).validate(req.body);
  if (checkInput.error) {
    req.flash('error', 'Input kosong');
    return res.render('second/bioskopcase', { result });
  }

  const { orang, kursi } = req.body;
  let arrMentahOrang, arrMentahKursi;
  try {
    arrMentahOrang = JSON.parse(orang);
    if (!Array.isArray(arrMentahOrang)) {
      req.flash('error', 'Input salah');
      return res.render('second/bioskopcase', { result });
    }
    arrMentahKursi = JSON.parse(kursi);
    if (!Array.isArray(arrMentahKursi)) {
      req.flash('error', 'Input salah');
      return res.render('second/bioskopcase', { result });
    }
  } catch (error) {
    req.flash('error', 'Input salah');
    // console.log(error);
    return res.render('second/bioskopcase', { result });
  }

  let count = 0;
  for (let i = 0; i < arrMentahKursi.length; i++) {
    let krs = arrMentahKursi[i];
    for (let k = 0; k < arrMentahOrang.length; k++) {
      let kurangi = krs - arrMentahOrang[k];
      if (kurangi > 0) {
        arrMentahOrang[k] = 0;
        krs = kurangi;
      } else if (kurangi <= 0) {
        arrMentahOrang[k] = kurangi * -1;
        krs = 0;
        break;
      }
    }
    if (krs == 0) {
      count += 1;
    }
  }
  result = count;
  return res.render('second/bioskopcase', { result });
};

const polusiProses = (req, res) => {
  let result = null;
  const checkObj = {
    str: Joi.string().required(),
  };
  const checkInput = Joi.object(checkObj).validate(req.body);
  if (checkInput.error) {
    req.flash('error', 'Input kosong');
    return res.render('second/polusi', { result });
  }

  const { str } = req.body;
  let arrMentah;
  try {
    arrMentah = JSON.parse(str);
    if (!Array.isArray(arrMentah)) {
      req.flash('error', 'In)put salah');
      return res.render('second/polusi', { result });
    }
  } catch (error) {
    req.flash('error', 'Input salah');
    // console.log(error);
    return res.render('second/polusi', { result });
  }

  let arr = arrMentah;
  arr.sort((a, b) => a - b);
  arr.reverse();
  let maxPolusi = arr.reduce((prev, current) => prev + current, 0);
  let jumlahFilter = 0,
    tmpPolusi = maxPolusi,
    separoPolusi = parseFloat(maxPolusi / 2);

  while (tmpPolusi > separoPolusi) {
    tmpSeparo = parseFloat(arr[0] / 2);
    arr[0] = tmpSeparo;
    if (arr.length > 1 && arr[1] > tmpSeparo) {
      arr.sort((a, b) => a - b);
      arr.reverse();
    }
    tmpPolusi = arr.reduce((prev, current) => prev + current, 0);
    jumlahFilter += 1;
  }

  result = jumlahFilter + '';
  return res.render('second/polusi', { result });
};

const suminarrayProses = (req, res) => {
  let result = null;
  const checkObj = {
    angka: Joi.number().required(),
  };
  const checkInput = Joi.object(checkObj).validate(req.body);
  if (checkInput.error) {
    req.flash('error', 'Input kosong');
    return res.render('second/suminarray', { result });
  }

  const { angka } = req.body;
  let tmpArr = [7, 3, 5, 2, -4, 8, 11];
  if (angka == '2') {
    tmpArr = [17, 4, 5, 6, 10, 11, 4, -3, -5, 3, 15, 2, 7];
  } else if (angka == '3') {
    tmpArr = [7, 6, 4, 1, 7, -2, 3, 12];
  }

  let tmpRes = [];
  let cariAngka = tmpArr.shift();
  for (let i = 0; i < tmpArr.length - 1; i++) {
    let firstAngka = tmpArr[i];
    for (let j = 0; j < tmpArr.length; j++) {
      let secondAngka = tmpArr[j];
      if (i != j) {
        if (firstAngka + secondAngka == cariAngka) {
          let insert = true;
          if (tmpRes.length > 0) {
            const filRes = tmpRes.filter((el) => el.indexing.indexOf(i) > -1 && el.indexing.indexOf(j) > -1);
            if (filRes.length) {
              insert = false;
            }
          }

          if (insert) {
            tmpRes.push({
              result: [firstAngka, secondAngka],
              indexing: [i, j],
            });
          }
        }
      }
    }
  }

  let tmpResStr = '';
  tmpRes.forEach((el) => {
    tmpResStr += el.result.join(',') + ' ';
  });
  result = tmpResStr.trim();
  return res.render('second/suminarray', { result });
};

module.exports = {
  stringsplitPage,
  stringsplitProses,
  bioskopcasePage,
  bioskopcaseProses,
  polusiPage,
  polusiProses,
  suminarrayPage,
  suminarrayProses,
};
