var path = require('path');
var fs = require('fs');

var ftp = require('ftp');
var client = new ftp();

var Promise = require('bluebird');
Promise.promisifyAll(client);

exports.connect = function (connectionProperties) {
    client.connect(connectionProperties);
    return client.onAsync('ready');
};

exports.list = function () {
    return client.listAsync();
};


exports.getfiles = function (directoryItems) {
    var itemsToDownload = [];
    directoryItems.forEach(function (element, index, array) {
        //Ignore directories
        if (element.type === 'd') {
            console.log('ignoring directory ' + element.name);
            return;
        }
        //Ignore non zips
        if (path.extname(element.name) !== '.zip') {
            console.log('ignoring file ' + element.name);
            return;
        }
        //Store zip
        itemsToDownload.push({
            name: element.name,
            destination: element.name
        });
    });
    return itemsToDownload;
};

exports.download = function (file) {
    return new Promise(function (resolve, reject) {
        client.getAsync(file.name).then(function (stream) {
            console.log('downloading : ' + file.name);
            stream.pipe(fs.createWriteStream(file.name))
                .on('close', function () {
                    console.log('downloaded : ' + file.name)
                    resolve(file.name);
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    });
};

exports.signout = function () {
    client.end();
    console.log('connection closed')
}