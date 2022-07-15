const Joi = require('joi');
const moment = require('moment');
const { quicksortFunc } = require('./SortController.js');

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

const smallestNumberPage = (req, res) => {
  return res.render('second/smallest_number', { result: '' });
};

const smallestNumberProses = (req, res) => {
  let result = null;
  const checkObj = { str: Joi.string().required() };
  const checkInput = Joi.object(checkObj).validate(req.body);
  if (checkInput.error) {
    req.flash('error', 'Input kosong');
    return res.render('second/smallest_number', { result });
  }

  const { str } = req.body;
  let arrMentah;
  try {
    arrMentah = JSON.parse(str);
    if (!Array.isArray(arrMentah)) {
      req.flash('error', 'Input salah');
      return res.render('second/smallest_number', { result });
    }
  } catch (error) {
    req.flash('error', 'Input salah');
    console.log(error)
    return res.render('second/smallest_number', { result });
  }

  
  const sorted = arrMentah.sort();
  const filtered = sorted.filter((v) => v > 0);
  const uniq = filtered.filter((v,i) => filtered.indexOf(v) === i);
  console.log("uniq", uniq);
  result = uniq.length > 0 ? uniq[0] : 1;
  if (uniq.length > 0 && result > 1)  {
    return res.render('second/smallest_number', { result: 1 });
  }
  
  for (let index = 0; index < uniq.length; index++) {
    const v = uniq[index];
    if (result != v) {
      break;
    }
    result++;
  }
  console.log("result", result);
  return res.render('second/smallest_number', { result });
}

const dec2bin = (dec) => {
  return (dec >>> 0).toString(2);
}

const regexBinaryGap = (inp) => {
  const reg = /0{1,}/gm
  let res = reg.exec(inp)
  let minues = 0
  while (res != null) {
    console.log(res[0])
    if(res[0].length > minues) minues = res[0].length
    res = reg.exec(inp)
  }
  return minues
}

const loopTestPerformance = () => {
  let arrTemp = [];
  for (let i = 0; i < 1000; i++) {
    arrTemp.push('a');
  }
  
  let count = 0;
  let startTime = performance.now();
  arrTemp.forEach(el => {
    count++;
  });
  
  console.log("forEach:", performance.now() - startTime)
  count = 0;
  startTime = performance.now();
  for (const arr of arrTemp) {
    count++;
  }
  
  console.log("for OF:", performance.now() - startTime)
  count = 0;
  startTime = performance.now();
  for (let i = 0; i < arrTemp.length; i++) {
    count++;
  }
  console.log("for biasa:", performance.now() - startTime)
};

const binaryGap = (arr) => {
  const tmp = [529,147,1,2, 1041]
  let min = 0; // longest gap
  let minRegex = 0;
  let startTime = performance.now();
  for (let index = 0; index < tmp.length; index++) {
    const element = tmp[index];
    let tmpBin = dec2bin(element);
    
    // imam
    let res = regexBinaryGap(tmpBin)
    if(res > minRegex) minRegex = res
  }
  console.log("imam speed:", performance.now() - startTime)
  startTime = performance.now()
  for (let index = 0; index < tmp.length; index++) {
    const element = tmp[index];
    let tmpBin = dec2bin(element);
    
    // wawan
    let tmpLong = 0;
    for (let idx = 0; idx < tmpBin.length; idx++) {
      let chara = tmpBin[idx];
      if (chara == '0') {
        tmpLong += 1;
      } else {
        if (tmpLong > min) {
          min = tmpLong;
        }
        tmpLong = 0;
      }
    }
  }
  console.log("wawan speed:", performance.now() - startTime)
  console.log("min", min)
  console.log("minRegex", minRegex)
  loopTestPerformance()
}

module.exports = {
  binaryGap,
  eventproblemPage,
  eventproblemProses,
  smallestNumberPage,
  smallestNumberProses,
};
