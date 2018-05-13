var express = require('express');
var router_alert = express.Router();

var PythonShell = require('python-shell');
var options = {
  mode: 'json',
  pythonPath: '/usr/bin/python',
  pythonOptions: ['-u'],
  scriptPath: '/home/ubuntu/www/rest_api/routes',
  //format ['carId','sensorId']
  // args: ['1','13','05']
  // args: ['1']
};

var pyshell = new PythonShell('sensor_status.py',options);
var data;
pyshell.on('message', function (message) {
  // received a message sent from the Python script (a simple "print" statement)
  data = message;
  router_alert.get('/', function(req, res, next) {
    console.log("alert start!!")
    var pyshell = new PythonShell('sensor_status.py',options);
    pyshell.on('message', function (message) {
      data = message;
      res.json(data)
    });
  });
});

// end the input stream and allow the process to exit
pyshell.end(function (err) {
});

module.exports = router_alert;
