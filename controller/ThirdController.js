const Joi = require('joi');

// PAGE
const stringsplitPage = (req, res) => {
    return res.render('second/stringsplit', { result: '' });
};

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
	let arrStr = str.split(" ");
	let arrStrPisah = strPisah.split(" ");

	let tmpArr = [];
	for (let i = 0; i < arrStrPisah.length; i++) {
		const el = arrStrPisah[i];
		if (arrStr.indexOf(el) > -1) {
			tmpArr.push(el);
		}
	}

	result = "\"" + tmpArr.join(" ") + "\"";
	return res.render('second/stringsplit', { result });
};


module.exports = {
    stringsplitPage,
    stringsplitProses,
}