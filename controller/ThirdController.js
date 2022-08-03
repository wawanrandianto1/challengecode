const Joi = require('joi');

// PAGE
const stringsplitPage = (req, res) => {
  return res.render('second/stringsplit', { result: '' });
};

const bioskopcasePage = (req, res) => {
  return res.render('second/bioskopcase', { result: '' });
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

module.exports = {
  stringsplitPage,
  stringsplitProses,
  bioskopcasePage,
  bioskopcaseProses,
};
