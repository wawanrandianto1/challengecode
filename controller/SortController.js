const Joi = require('joi');

const bubblesortPage = (req, res) => {
  return res.render('sort/bubblesort', { result: '' });
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

module.exports = {
  bubblesortPage,
  bubblesortProses,
};
