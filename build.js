'use strict'

const path = require('path')

const _ = require('lodash')
const fs = require('mz/fs')
const globby = require('globby')
const parseGitignore = require('gitignore-to-ast')
const writeJsonFile = require('write-json-file')

function convertAstToRules(ast) {
  let comment
  const rules = []
  const handler = {
    comment({ value }) {
      const currentComment = _.trim(value, '# ')
      if (!['--------------------------'].includes(currentComment)) {
        comment = currentComment
      }
    },
    rule({ value }) {
      rules.push({
        rule: value,
        comment,
      })
    },
  }
  ast.body.forEach(({ type, value }) => {
    handler[type]({ value })
  })
  return rules
}

async function buildRules() {
  const paths = await globby(['gitignore/**/*.gitignore'])
  const allRules = _.flatten(
    await Promise.all(
      paths.map(async p => {
        const group = path.basename(p, '.gitignore')
        const ast = parseGitignore(await fs.readFile(p, 'utf8'))
        const rules = convertAstToRules(ast)
        return rules.map(o => Object.assign({ group }, o))
      }),
    ),
  )
  return _.mapValues(_.groupBy(allRules, 'rule'), l =>
    l.map(o => _.omit(o, ['rule'])),
  )
}

async function main() {
  const rules = await buildRules()
  rules['.DS_Store'] = [
    {
      group: 'macOS',
      comment: 'General',
    },
  ]
  const sortedRules = _.mapValues(rules, l => _.sortBy(l, ['group']))
  await writeJsonFile('rules.json', sortedRules, {
    indent: 2,
    sortKeys: true,
  })
}

main()
