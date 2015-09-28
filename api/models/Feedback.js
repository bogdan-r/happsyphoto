module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    email: {
      type: 'email',
      required: true
    },
    subject: {
      type: 'string'
    },
    message: {
      type: 'string',
      required: true
    },
    isReading: {
      type: 'boolean',
      defaultsTo: false
    }
  }
};