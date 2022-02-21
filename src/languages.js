const languages = {
  javascript: {
    name: 'JavaScript',
    parseOptions: {
      sourceType: 'unambiguous',
      plugins: [
        'jsx',
        'classProperties',
        'nullishCoalescingOperator',
        'optionalChaining',
      ],
    },
  },
  javascriptreact: {
    name: 'JavaScript React',
    parseOptions: {
      sourceType: 'unambiguous',
      presets: ["@babel/preset-react"],
      plugins: [
        'jsx',
        'classProperties',
        'nullishCoalescingOperator',
        'optionalChaining',
      ],
    },
  },
};

module.exports = {
  languages,
};
