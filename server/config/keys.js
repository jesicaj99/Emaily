// figure out what set of credentials to use
if (process.env.NODE_ENV === 'production'){
  // we are in production retunr the prod set of keys
  module.exports = require('./prod')
} else {
  // we are in enviroment - retunr dev keys
  module.exports = require('./dev');
}

