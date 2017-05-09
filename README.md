# bootprint-unit-testing 

[![NPM version](https://badge.fury.io/js/bootprint-unit-testing.svg)](http://badge.fury.io/js/bootprint-unit-testing)
[![Travis Build Status](https://travis-ci.org/bootprint/bootprint-unit-testing.svg?branch=master)](https://travis-ci.org/bootprint/bootprint-unit-testing)
[![Coverage Status](https://img.shields.io/coveralls/bootprint/bootprint-unit-testing.svg)](https://coveralls.io/r/bootprint/bootprint-unit-testing)

> Unit-testing-tools for bootprint-projects


# Installation

```
npm install bootprint-unit-testing
```

## Usage

Consider a bootprint-module that uses the following Handlebarse-template as `index.html.hbs`

```hbs
<body>
<p>name: {{name}}</p>
</body>
```


and a file `test-input.json`:

```json
{ "name": "Nils" }
```


A test can be written like this: 

```js
/* eslint-env mocha */

var expect = require('chai').expect
var tester = require('bootprint-unit-testing')

describe('with an input file', function () {
  var bptest = tester(require('./module.js'), __dirname, 'test-input.json')

  // Run bootprint. The parsed "index.html"-file (cheerio) is then available
  // under "bptest.$"
  before(bptest.run)

  it('should store a cheerio-elements as `.$`', function () {
    expect(bptest.$('p').html()).to.contain('Nils')
  })
})
```

The test will run bootprint with the given module and verify the generated HTML 
using the [cheerio](https://npmjs.com/package/cheerio) library.

```
with an input file
    ✓ should store a cheerio-elements as `.$`


  1 passing (243ms)
```



# License

`bootprint-unit-testing` is published under the MIT-license.

See [LICENSE.md](LICENSE.md) for details.


# Release-Notes
 
For release notes, see [CHANGELOG.md](CHANGELOG.md)
 
# Contributing guidelines

See [CONTRIBUTING.md](CONTRIBUTING.md).