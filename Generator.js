var _ = require('lodash');
'use strict';

const fs = require('fs');

let rawdata = fs.readFileSync('test.json');
let preprofiles = JSON.parse(rawdata);

var tasknumber = 50;

console.log(tasknumber);






