module.exports = {
  settings: {
    'import/resolver': {
      webpack: {
        config: './config',
      },
    },
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    // 关闭eslint配置中与prettier冲突的格式化规则
    'prettier',
  ],
  parser: '@babel/eslint-parser',
  plugins: [
    'react',
    'import',
    'prettier'
  ],
  rules: {
    'import/order': 2, // import引入按照一定顺序
    'jsx-quotes': [2, 'prefer-double'], // JSX元素中的字符串必须使用双引号
    'quotes': [2, 'single'], // 字符串必须使用单引号
    'import/extensions': [1, 'never'],
    'react/jsx-filename-extension': [1, { 'extensions': ['.ts', '.tsx'] }],
    'no-undef': 0, // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到 （原因：全局变量较常用，定义在global.d.ts中即可）
  },
};
