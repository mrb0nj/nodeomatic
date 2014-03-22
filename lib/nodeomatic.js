var path = require('path');
var fs = require('fs');

var ftp = require('ftp');
var client = new ftp();

var Promise = require('bluebird');
Promise.promisifyAll(client);

exports.connect = function(connectionProperties) {
    client.connect(connectionProperties);
    return client.onAsync('ready');
};

exports.list = function() {
    return client.listAsync();
};

exports.directories = function(element) {
    return element.type !== 'd'
};

exports.files = function(element) {
    return path.extname(element.name) === '.zip';
};

var current = Promise.resolve();
exports.download = function(file) {
    current = current.then(function() {
        return client.getAsync(file.name)
    }).then(function(stream) {
        stream.pipe(fs.createWriteStream(file.name));
        console.log(file.name + ' downloaded..');
    });
    return current;
};