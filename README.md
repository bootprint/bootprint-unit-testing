# bootprint-unit-testing 

[![NPM version](https://badge.fury.io/js/bootprint-unit-testing.svg)](http://badge.fury.io/js/bootprint-unit-testing)
[![Travis Build Status](https://travis-ci.org/bootprint/bootprint-unit-testing.svg?branch=master)](https://travis-ci.org/bootprint/bootprint-unit-testing)


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

describe('bootprint', function () {
  var bptest = tester(require('./module.js'), __dirname, 'test-input.json')

  // Run bootprint before all tests in this section
  before(bptest.run)

  it('should write "Nils" to index.html', function () {
    // Access the parsed index.html as cheerio-object via "bptest.$"
    expect(bptest.$('p').html()).to.contain('Nils')
  })

  it('should write a black background to the main.css file', function () {
    // Load any file from the target directory via "bptest.read()"
    expect(bptest.read('main.css')).to.contain('background:black')
  })
})
```

The test will run bootprint with the given module and verify the generated HTML 
using the [cheerio](https://npmjs.com/package/cheerio) library.

```
bootprint
    ✓ should write "Nils" to index.html
    ✓ should write a black background to the main.css file


  2 passing (243ms)
```



# License

`bootprint-unit-testing` is published under the MIT-license.

See [LICENSE.md](LICENSE.md) for details.


# Release-Notes
 
For release notes, see [CHANGELOG.md](CHANGELOG.md)
 
# Contributing guidelines

See [CONTRIBUTING.md](CONTRIBUTING.md).