const Joi = require('joi');

const homePage = (req, res) => {
  return res.render('welcome');
};

const encodePage = (req, res) => {
  return res.render('first/main1', { result: '' });
};

const encodeProses = (req, res) => {
  let result = '';
  const checkObj = { str: Joi.string().required() };
  const checkInput = Joi.object(checkObj).validate(req.body);
  if (checkInput.error) {
    req.flash('error', 'Input kosong');
    return res.render('first/main1', { result });
  }

  const { str } = req.body;
  // logic
  // result = str.replace(/([ \w])\1+/g, (group, chr) => group.length + chr); // versi singkat

  let count = 0;
  for (let i = 0; i < str.length; i++) {
    count = 1;
    while (i + 1 < str.length && str.charAt(i) == str.charAt(i + 1)) {
      count++;
      i++;
    }
    result += str.charAt(i) + count;
  }
  return res.render('first/main1', { result });
};

const decodePage = (req, res) => {
  return res.render('first/main2', { result: '' });
};

const decodeProses = (req, res) => {
  let result = '';
  const checkObj = { str: Joi.string().required() };
  const checkInput = Joi.object(checkObj).validate(req.body);
  if (checkInput.error) {
    req.flash('error', 'Input kosong');
    return res.render('first/main1', { result });
  }

  const { str } = req.body;

  let tmpArr = [];
  for (let i = 0; i < str.length - 1; i = i + 2) {
    let char = str.charAt(i);
    let count = str.charAt(i + 1) - '0';
    for (let j = 0; j < count; j++) {
      tmpArr.push(char);
    }
  }
  result = tmpArr.join('');
  return res.render('first/main2', { result });
};

module.exports = {
  encodePage,
  encodeProses,
  decodePage,
  decodeProses,
  homePage,
};
