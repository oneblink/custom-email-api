// @flow
'use strict'

const config = require('../config.js')
const boom = require('@hapi/boom')

const authoriseSecret = function(secret /* : string */) /* : void */ {
  if (secret !== config.CALLBACK_SECRET) {
    throw boom.unauthorized(
      'Requester is not authorised to perform this action.'
    )
  }
}

module.exports = {
  authoriseSecret
}
