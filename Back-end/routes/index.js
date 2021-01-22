var express = require('express');
var router = express.Router();
var BigDecimal = require('js-big-decimal');

var data = [
  {
    uuid: '0680a078-e784-4ba2-8720-fc812ffd9405',
    result: 0,
    min: '120748.64553907506',
    max: '235657.68011063640648',
    avg: '175028.821211982758432',
    lenght: 123,
    weight: 123
  }

];


/* GET data */
router.get('/', function(req, res) {
  res.send(data);
});

/* ADD data */
router.post('/', function(req, res) {
  var len = Number(req.body['defaultLenght']);
  var weight = Number(req.body['defaultWeight']);

  if (len && weight) {
    var result = testos(len, weight);
    var aux = computeFactors(len);
    var min = aux.min;
    var max = aux.max;
    var avg = aux.avg;
    var uuid = create_UUID();

    var turtle = {
      uuid: uuid,
      result: result,
      min: min,
      max: max,
      avg: avg,
      lenght: len,
      weight: weight
    };
    data.push(turtle);
    console.log(data);
    res.send(data);
  }

});

/* DELETE data */
router.delete('/', function(req, res) {
  var uuid = req.query['uuid'];
  console.log(uuid);
  if(uuid === 'all'){
    data = [];
    res.send(data);
  } else {
    data = data.filter( entry => entry.uuid !== uuid );
    res.send(data);
  }

});

/* CREATE ID */
function create_UUID(){
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt/16);
    return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });

  return uuid;
}

/* CALCULUS FUNCTIONS */
var factors = {
  min: {
    mult: '0.3625',
    exp: '2.6425'
  },
  max: {
    mult: '0.3354',
    exp: '2.7976'
  },
  avg: {
    mult: '0.3424',
    exp: '2.7315'
  }
};

function factorize(l, mult, exp) {
  return (
      new BigDecimal(mult)
          .multiply(new BigDecimal(
              Math.pow(
                  l,
                  exp
              )
          ))
  );
}

function computeFactors(length) {
  var l = parseFloat(length);
  var min = factorize(l, factors.min.mult, factors.min.exp).value;
  var max = factorize(l, factors.max.mult, factors.max.exp).value;
  var avg = factorize(l, factors.avg.mult, factors.avg.exp).value;
  console.log('called compute factors', typeof l, min.toString(), max, avg);

  return { min: min, max: max, avg: avg };
}

function testos(len, weight) {
  var x = computeFactors(len);
  var min = x.min, max = x.max, avg = x.avg;

  var w = parseFloat(weight);

  if (w < parseFloat(min)) {
    return 0;
  }

  if (w <= parseFloat(avg)) {
    return 1;
  }

  if (w <= parseFloat(max)) {
    return 2;
  }

  return 3;
}

module.exports = router;
