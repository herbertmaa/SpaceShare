// var algoliasearch = require('algoliasearch');
// var algoliasearch = require('algoliasearch/reactnative');
// var algoliasearch = require('algoliasearch/lite');
// import * as algoliasearch from 'algoliasearch'; // When using TypeScript

// or just use algoliasearch if you are using a <script> tag
// if you are using AMD module loader, algoliasearch will not be defined in window,
// but in the AMD modules of the page

var client = algoliasearch('N90CDEAJAI', 'a6929a6547618db64c8710b7358b4d2f');
var index = client.initIndex('listings');