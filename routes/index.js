var express = require('express');
var router = express.Router();
var axios = require('axios');

const hospitalDataOptions = {
  serviceKey:
    "ALz2vPSUQfHRKrNWGh2biyEBTpej1%2BGRZmciw5kdIWv76bNE6vKaYQ%2FopssPisYiLR08EGu%2Bv6LERqMn3PffAw%3D%3D",
  pageNo: 1,
  numOfRows: 1000,
  spclAdmTyCd: "99",
};

const safehospitalDataOptions = {
  serviceKey:
    "ALz2vPSUQfHRKrNWGh2biyEBTpej1%2BGRZmciw5kdIWv76bNE6vKaYQ%2FopssPisYiLR08EGu%2Bv6LERqMn3PffAw%3D%3D",
  pageNo: 1,
  numOfRows: 1000,
  spclAdmTyCd: "A0",
};

const sortHospitals = (hospitals) => {  //시 또는 도 별 정렬
  if (!hospitals || !Array.isArray(hospitals)) {
    return;
  }
  const compare = (a, b) => {
    return a.sidoNm < b.sidoNm
      ? -1
      : a.sidoNm > b.sidoNm
      ? 1
      : a.sgguNm < b.sgguNm
      ? -1
      : a.sgguNm > b.sgguNm
      ? 1
      : 0;
  };
  return hospitals.sort(compare);
};


/* GET home page. */
router.get('/', function(req, res, next) {
  const hospitalDataUrl = `http://apis.data.go.kr/B551182/pubReliefHospService/getpubReliefHospList?serviceKey=${hospitalDataOptions.serviceKey}&pageNo=${hospitalDataOptions.pageNo}&numOfRows=${hospitalDataOptions.numOfRows}&spclAdmTyCd=${hospitalDataOptions.spclAdmTyCd}&`;
  axios.get(hospitalDataUrl)
  .then((response) => {
    const {
      data: {
        response: {
          body: {
            items: { item },
          },
        },
      },
    } = response;
    sortHospitals(item);
    res.send(item);
  })
  .catch((e) => console.log(e));
});

router.get('/safehospital', function(req, res, next) {
  const safehospitalDataUrl = `http://apis.data.go.kr/B551182/pubReliefHospService/getpubReliefHospList?serviceKey=${safehospitalDataOptions.serviceKey}&pageNo=${safehospitalDataOptions.pageNo}&numOfRows=${safehospitalDataOptions.numOfRows}&spclAdmTyCd=${safehospitalDataOptions.spclAdmTyCd}&`;
  axios.get(safehospitalDataUrl)
  .then((response) => {
    const {
      data: {
        response: {
          body: {
            items: { item },
          },
        },
      },
    } = response;
    sortHospitals(item);
    res.send(item);
  })
  .catch((e) => console.log(e));
});

router.get('/test', function(req, res, next) {
  res.send("내서버는 정상이야 공공데이터 시벌련들아");
});

module.exports = router;
