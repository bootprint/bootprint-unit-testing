/*!
 * bootprint-unit-testing <https://github.com/bootprint/bootprint-unit-testing>
 *
 * Copyright (c) 2017 Nils Knappmeier.
 * Released under the MIT license.
 */

/* global describe */
/* global it */
/* global before */
// /* global xit */

'use strict'

var expect = require('chai').expect
var core = require('../')(require('./module.js'), __dirname)

describe('The bootprint-unit-testing module', function () {
  this.timeout(10000)
  var context = {}
  before(function () {
    return core.run({ name: 'Nils' }, context)
  })

  it('The output should contain the name in a <p>-tag', function () {
    expect(context.$('p').html()).to.contain('Nils')
  })
})
