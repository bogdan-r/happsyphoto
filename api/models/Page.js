/**
* Pages.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    title: {
      type: 'string',
      required: true
    },
    slug: {
      type: 'string',
      required: true
    },
    body: {
      type: 'string'
    },
    state: {
      type: 'string',
      enum: ['active', 'deleted'],
      defaultsTo: 'active'
    },
    description: {
      type: 'string'
    }
  }
};

