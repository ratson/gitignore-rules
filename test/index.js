import _ from 'lodash'
import test from 'ava'

import rules from '..'

test(t => {
  t.is(_.size(rules), 2272)
})

test('*.log rule', t => {
  const groups = rules['*.log']
  t.is(groups.length, 15)
  t.deepEqual(groups[0], {
    comment: 'Log Files',
    group: 'Android',
  })
})

test('.DS_Store rule', t => {
  const groups = rules['.DS_Store']
  t.is(groups.length, 1)
  t.deepEqual(groups[0], {
    comment: 'General',
    group: 'macOS',
  })
})

test('Magento Default Files', t => {
  const groups = rules['/app/etc/local.xml']
  t.deepEqual(groups, [
    {
      group: 'Magento',
      comment: 'Magento Default Files',
    },
  ])
})
