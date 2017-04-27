var async               = require('async');

var Queue               = async.queue(function (data, cb) {
    console.log('data', data);
    cb(null, data.url);
})


Queue.push({url: 'google.com'}, function (err, res) {
    console.log('err, res', err, res)
});

