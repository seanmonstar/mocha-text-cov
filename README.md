# mocha-text-cov

Long lost cousin of html-cov and json-cov: this Mocha reporter outputs a textual summary right in the console. Like magic.

## Example

```
> mocha --ui exports --require blanket --reporter mocha-text-cov

  Coverage Summary:
  Name                       Stmts   Miss   Cover   Missing
  ---------------------------------------------------------
  lib\config.js                 89      0    100%
  lib\console.js               140      0    100%
  lib\filter.js                 23      0    100%
  lib\filterer.js               22      0    100%
  lib\formatter.js              57      9     84%   37,54,55,97,98,99,102,108,116
  lib\handlers\console.js       20      0    100%
  lib\handlers\file.js          19      0    100%
  lib\handlers\handler.js       46      0    100%
  lib\handlers\index.js          8      0    100%
  lib\handlers\null.js           9      0    100%
  lib\handlers\rotating.js      70      0    100%
  lib\handlers\stream.js        12      0    100%
  lib\index.js                  44      0    100%
  lib\levels.js                 16      0    100%
  lib\logger.js                155      0    100%
  lib\record.js                 67      9     87%   97,98,99,100,101,102,103,105,108
  lib\utils\json.js             16      9     44%   10,11,12,13,14,15,17,18,30
  lib\utils\klass.js            12      0    100%
  lib\utils\printf.js           62      0    100%
  =========================================================
  TOTAL                        887     27     97%
```

## License

[MPLv2.0](./LICENSE)
