var nodeomatic = require('../lib/nodeomatic');
var should = require('should');
var Promise = require('bluebird');

var files = [
    { type: 'd', name: 'test' },
    { type: 'f', name: 'test.zip' },
    { type: 'f', name: 'test.txt' }
];

describe("nodeomatic", function() {
   it("filters directories from the file list", function() {
       new Promise.resolve(files)
            .filter(nodeomatic.directories)
            .then(function(files) {
                files.length.should.equal(2);
                files[0].type.should.equal('f');
            });
   });
    
    it('filters files that do not have .zip extension', function() {
        new Promise.resolve(files)
            .filter(nodeomatic.directories)
            .filter(nodeomatic.files)
            .then(function(files) {
                files.length.should.equal(1);
                files[0].type.should.equal('f');
                files[0].name.should.equal('test.zip');
            });
    });
});