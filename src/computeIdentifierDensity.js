const { parse } = require('@babel/parser');
const { default: traverse } = require('@babel/traverse');

const parseOptions = {
  sourceType: 'module',
  plugins: [
    'jsx',
    'classProperties',
    'nullishCoalescingOperator',
    'optionalChaining',
  ],
};

function sortFn([, countA], [, countB]) {
  if (countA < countB) {
    return +1;
  }

  if (countA > countB) {
    return -1;
  }

  return 0;
}

exports.computeIdentifierDensity = (code) => {
  const parsed = parse(code, parseOptions);

  let totalCount = 0;
  const countMap = new Map();

  const visitor = {
    Identifier({ node }) {
      totalCount += 1;
      countMap.set(node.name, countMap.has(node.name) ? countMap.get(node.name) + 1 : 1);
    },
  };

  traverse(parsed, visitor);

  const counts = Array.from(countMap).sort(sortFn);
  const frequencies = counts.map(([name, count]) => [name, (count * 100) / totalCount, count]);

  return {
    totalCount,
    frequencies,
  }
}
