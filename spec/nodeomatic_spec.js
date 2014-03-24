var nodeomatic = require('../lib/nodeomatic');
var should = require('should');
var Promise = require('bluebird');

var files = [
    {
        type: 'd',
        name: 'test'
    },
    {
        type: 'f',
        name: 'test.zip'
    },
    {
        type: 'f',
        name: 'test.txt'
    }
];

describe("nodeomatic", function () {
    it("filters directories and non zip files from the file list", function () {

        var result = nodeomatic.getfiles(files);

        result.length.should.equal(1);
        result[0].name.should.equal('test.zip');

    });
});