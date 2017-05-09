var path = require('path')

// Export function to create new config (builder is passed in from outside)
module.exports = function (builder) {
  return builder.merge({
    handlebars: {
      templates: path.resolve(__dirname, 'templates')
    }
  })
}

// Add "package" to be used by bootprint-doc-generator
module.exports.package = require('../../package')
