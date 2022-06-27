const Joi = require('joi');
const moment = require('moment');

const eventproblemPage = (req, res) => {
  return res.render('second/main1', { result: '' });
};

const eventproblemProses = (req, res) => {
  let result = '';
  const checkObj = { str: Joi.string().required() };
  const checkInput = Joi.object(checkObj).validate(req.body);
  if (checkInput.error) {
    req.flash('error', 'Input kosong');
    return res.render('second/main1', { result });
  }

  // new Date(year, month, day, hours, minutes, seconds, milliseconds)
  const { str } = req.body;
  let arrMentah;
  try {
    arrMentah = str.split(',');
    if (!Array.isArray(arrMentah)) {
      req.flash('error', 'Input salah');
      return res.render('second/main1', { result });
    }
  } catch (error) {
    req.flash('error', 'Input format salah');
    return res.render('second/main1', { result });
  }

  let today = moment().format('DD-MM-YYYY');
  let tmpArr = [];
  // convert to date time
  for (let i = 0; i < arrMentah.length; i++) {
    const time2 = arrMentah[i];
    const arrtime = time2.split(' - ');
    let startTime = moment(today + ' ' + arrtime[0], 'DD-MM-YYYY hh:mmA');
    let endTime = moment(today + ' ' + arrtime[1], 'DD-MM-YYYY hh:mmA');
    tmpArr.push({
      start: startTime,
      end: endTime,
    });
  }

  // sorting (bubble sort)
  for (let i = 0; i < tmpArr.length; i++) {
    for (let j = tmpArr.length - 1; j > i; j--) {
      let startNow = tmpArr[j]['start'];
      let startAfter = tmpArr[j - 1]['start'];
      if (startNow.isBefore(startAfter)) {
        let tmpData = tmpArr[j];
        tmpArr[j] = tmpArr[j - 1];
        tmpArr[j - 1] = tmpData;
      }
    }
  }

  // debug purpose
  // for (let i = 0; i < tmpArr.length; i++) {
  //   const el = tmpArr[i];
  //   console.log(el.start.format('DD-MM-YYYY hh:mmA'));
  //   console.log(el.start.format('hh:mmA'));
  //   console.log(el.end.format('DD-MM-YYYY hh:mmA'));
  //   console.log(el.end.format('hh:mmA'));
  // }

  // new Date(diff * 1000).toISOString().slice(11, 16);
  // find jarak
  let maxTime = -999999;
  let getIndex = 0;
  let tmpJarak = [];
  for (let i = 0; i < tmpArr.length; i++) {
    const mainData = tmpArr[i];
    let indexing = i + 1;
    if (indexing < tmpArr.length) {
      const secondData = tmpArr[indexing];
      const selisih = secondData.start.diff(mainData.end, 'second');
      const formatSelisih = new Date(selisih * 1000).toISOString().slice(11, 16);
      tmpJarak.push({
        selisih,
        formatSelisih,
      });
      if (maxTime < selisih) {
        maxTime = selisih;
        getIndex = i;
      }
    }
  }

  result = tmpJarak[getIndex].formatSelisih;
  return res.render('second/main1', { result, maxTime, tmpJarak });
};

module.exports = {
  eventproblemPage,
  eventproblemProses,
};
