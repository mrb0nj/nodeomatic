var nodeomatic = require('./lib/nodeomatic');
var Promise = require('bluebird');

var connectionProperties = {
    host: "",
    user: "",
    password: ""
};

Promise.all(nodeomatic.connect(connectionProperties)
    .then(nodeomatic.list)
    .then(nodeomatic.getfiles)
    .map(nodeomatic.download))
    .then(nodeomatic.signout)
    .done();