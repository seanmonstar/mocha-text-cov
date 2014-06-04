/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const path = require('path');
const util = require('util');

const cwd = process.cwd();
function p() {
  console.log('  ' + util.format.apply(null, arguments));
}

module.exports = CovSummary;

function CovSummary(runner) {
  runner.on('end', report);
}

function report() {
  var cov = global._$jscoverage || {};
  var stmts = 0;
  var miss = 0;
  p('Coverage Summary:');
  var keys = Object.keys(cov);
  var longest = Math.max.apply(null, keys.map(function(k) {
    return path.relative(cwd, k).length;
  }));
  var header = pad('Name', -longest) + '  Stmts   Miss   Cover   Missing';
  p(header);
  p(repeat('-', header.length));
  keys.sort();
  keys.forEach(function(filename) {
    var data = stats(cov[filename]);
    p('%s %s %s    %s%   %s', pad(path.relative(cwd, filename), -longest),
      pad(data.stmts, 6), pad(data.miss.length, 6), pad(data.cover, 3),
      data.miss);
    stmts += data.stmts;
    miss += data.miss.length;
  });
  p(repeat('=', header.length));
  p('%s %s %s    %s%', pad('TOTAL', -longest), pad(stmts, 6), pad(miss, 6),
    pad(percent(stmts - miss, stmts), 3));
  p('');
}

function stats(data) {
  var stmts = 0;
  var missed = [];
  data.source.forEach(function(line, num) {
    num++;
    if (data[num] !== undefined) {
      stmts++;
      if (data[num] === 0) {
        missed.push(num);
      }
    }
  });

  return {
    stmts: stmts,
    miss: missed,
    cover: percent(stmts - missed.length, stmts)
  };
}

function pad(_str, _size) {
  var padLeft = _size > 0;
  var size = Math.abs(_size);
  var str = String(_str);

  if (str.length < size) {
    var padding = repeat(' ', size - str.length);
    if (padLeft) {
      str = padding + str;
    } else {
      str += padding;
    }
  }
  return str;
}

function repeat(str, num) {
  return new Array(num + 1).join(str);
}
function percent(part, whole) {
  return whole ? Math.round(part / whole * 100) : 100;
}
