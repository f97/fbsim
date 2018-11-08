const find = require('find-process');

find('name', 'node simi.js')
  .then(function (list) {
    console.log(list[0].pid);
  }, function (err) {
    console.log(err.stack || err);
  })