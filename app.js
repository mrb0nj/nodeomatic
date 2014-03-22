var nodeomatic = require('./lib/nodeomatic');

var connectionProperties = {
    host: "host",
    user: "user",
    password: "pass"
};

nodeomatic.connect(connectionProperties)
    .then(nodeomatic.list)
    .filter(nodeomatic.directories)
    .filter(nodeomatic.files)
    .map(nodeomatic.download)
    .done();