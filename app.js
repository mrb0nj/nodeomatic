//var nodeomatic = require('./lib/nodeomatic');

var path = require('path');
var fs = require('fs');

var ftp = require('ftp');
var c = new ftp();

var Promise = require('bluebird');
Promise.promisifyAll(c);

var connectionProperties = {
    host: "",
    user: "",
    password: ""
};

var connect = function () {
    c.connect(connectionProperties);
    return c.onAsync('ready');
};

var getList = function () {
    return c.listAsync();
};

var zipFiles = function (directoryItems) {
    var itemsToDownload = [];
    directoryItems.forEach(function (element, index, array) {
        //Ignore directories
        if (element.type === 'd') {
            console.log('directory ' + element.name);
            return;
        }
        //Ignore non zips
        if (path.extname(element.name) !== '.zip') {
            console.log('ignoring ' + element.name);
            return;
        }
        //Download zip
        itemsToDownload.push({
            name: element.name,
            destination: element.name
        });
        //aftpSystem.downloadFile(element.name, element.name);
    });
    console.log('after foreach');
    return itemsToDownload;
};

var current = Promise.resolve();

var downloadFiles = function (file) {
    return new Promise(function (resolve, reject) {
        c.getAsync(file.name).then(function (stream) {
            console.log('downloading' + file.name);
            stream.pipe(fs.createWriteStream(file.name))
                .on('close', function () {
                    console.log('resolved : ' + file.name)
                    resolve(file.name);
                })
                .on('error', function (err) {
                    reject(err);
                });
            console.log(file.name + ' downloaded..');
        });
    });

};

var files = function () {
    console.log('sdf');
    return connect().then(getList).then(zipFiles);
};

var data = files();

Promise.all(data.map(function (item) {
    downloadFiles(item);
}));