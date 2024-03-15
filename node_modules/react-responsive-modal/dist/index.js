
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-responsive-modal.cjs.production.min.js')
} else {
  module.exports = require('./react-responsive-modal.cjs.development.js')
}
