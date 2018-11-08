var express = require('express');
var router = express.Router();
var cmd=require('node-cmd');
const find = require('find-process');

function start() {
  cmd.get(
    'node simi.js',
    function(err, data, stderr){
        console.log('the current working dir is : ',data)
    }
  );
}

router.route('/')
  .get(function(req, res, next){
    res.render('index',{ title: '...'})
  })
  .post(function(req, res, next){
    req.checkBody('status', 'Invalid status bot...').notEmpty();
    var errors = req.validationErrors();
    if(errors){
      res.render('index',{
        title: 'Sói Đẹp trai nhất quả đất',
        message: req.body.status,
        errorMessages: errors
      })
    } else {
      if(req.body.status == 'stop'){
        find('name', 'node simi.js')
        .then(function (list) {
          cmd.get(
            'kill ' + list[0].pid,
            function(err, data, stderr){
                console.log(data)
            }
          );
        }, function (err) {
          console.log(err.stack || err);
        })
        res.render('success',{ title: 'Success! STOPPED...'})
      }
      else {
        start();
        res.render('success',{ title: 'Success! STARTED...'})
      }
    }
  })

module.exports = router;
