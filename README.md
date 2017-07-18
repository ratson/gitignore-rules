# gitignore-rules

Rules of .gitignore from github/gitignore

## Installation

```
npm install gitignore-rules --save
```

## Usage

<!-- eslint-disable strict,no-console -->

```js
const rules = require('gitignore-rules')

console.log(rules['*.log'])
/*
[ { group: 'Android', comment: 'Log Files' },
  { group: 'ArchLinuxPackages' },
  { group: 'Java', comment: 'Log file' },
  { group: 'Lilypond' },
  { group: 'Node', comment: 'Logs' },
  { group: 'Opa' },
  { group: 'Python', comment: 'Django stuff:' },
  { group: 'Scala' },
  { group: 'Stata', comment: 'Stata dataset and output files' },
  { group: 'SugarCRM',
    comment: 'Logs files can safely be ignored.' },
  { group: 'SynopsysVCS',
    comment: 'used to write all messages from simulation:  -l <filename>' },
  { group: 'TeX',
    comment: 'Core latex/pdflatex auxiliary files:' },
  { group: 'VisualStudio', comment: '.NET Core' },
  { group: 'WordPress' },
  { group: 'Yeoman' } ]
*/
```
