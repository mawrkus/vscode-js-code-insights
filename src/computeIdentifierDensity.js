const { parse } = require('@babel/parser');
const { default: traverse } = require('@babel/traverse');
const { languages } = require('./languages');

function sortFn([, dataA], [, dataB]) {
  if (dataA.count < dataB.count) {
    return +1;
  }

  if (dataA.count > dataB.count) {
    return -1;
  }

  return 0;
}

exports.computeIdentifierDensity = ({ code, languageId }) => {
  const options = languages[languageId].parseOptions;
  const parsed = parse(code, options);

  let totalCount = 0;
  const countMap = new Map();

  const visitor = {
    Identifier(path) {
      const { node, parentPath } = path;

      totalCount += 1;

      const identifierData = countMap.has(node.name)
        ? countMap.get(node.name)
        : { count: 0, context: new Set() };

      identifierData.count += 1;
      identifierData.context.add(parentPath.node.type);

      countMap.set(node.name, identifierData);
    },
  };

  traverse(parsed, visitor);

  const frequencies = Array.from(countMap)
    .sort(sortFn)
    .map(([name, data]) => [name, data.count, (data.count * 100) / totalCount, Array.from(data.context)]);

  return {
    totalCount,
    frequencies,
  }
}
