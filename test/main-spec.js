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
var tester = require('../')

describe('The bootprint-unit-testing module', function () {
  this.timeout(10000)

  describe('with an input file', function () {
    var bptest = tester(require('./fixtures/module.js'), __dirname, 'fixtures/test-input.json')

    before(bptest.run)

    it('should store a cheerio-elements as `.$`', function () {
      expect(bptest.$('p').html()).to.contain('Nils')
    })
  })

  describe('with an input json', function () {
    var bptest = tester(require('./fixtures/module.js'), __dirname, { name: 'Nils' })

    before(bptest.run)

    it('should store a cheerio-elements as `.$`', function () {
      expect(bptest.$('p').html()).to.contain('Nils')
    })
  })
})
